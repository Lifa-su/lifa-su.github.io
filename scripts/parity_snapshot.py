#!/usr/bin/env python3
"""Print a compact, read-only parity snapshot for operator handoff."""

from __future__ import annotations

import argparse
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from urllib.parse import urlsplit

from check_live_parity import (
    DEFAULT_BLOCKER_PAGES,
    DEFAULT_DOMAINS,
    DEFAULT_RESUMEFORGE_ROUTE_PAGE,
    build_marker_map,
    build_page_summary,
    fetch_url,
    format_freshness,
    normalize_domain,
    normalize_page,
    overall_gate_status,
)


SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent


@dataclass
class GitSnapshot:
    head: str
    short_head: str
    committed_at: str
    subject: str
    branch: str
    staged: int
    unstaged: int
    untracked: int
    lines: list[str]

    @property
    def tree_state(self) -> str:
        if self.staged or self.unstaged or self.untracked:
            return "dirty"
        return "clean"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Print a compact parity handoff snapshot using git state and the "
            "existing live-parity checks."
        )
    )
    parser.add_argument(
        "--domain",
        action="append",
        dest="domains",
        help="Base domain to check, for example https://lifa-su.com. Can be repeated.",
    )
    parser.add_argument(
        "--page",
        action="append",
        dest="pages",
        help="Page path to check, for example /pricing.html. Can be repeated.",
    )
    parser.add_argument(
        "--resume-route-page",
        default=DEFAULT_RESUMEFORGE_ROUTE_PAGE,
        help=(
            "ResumeForge downstream page included in the default snapshot preset. "
            "Default: /resume-review-fast-track.html."
        ),
    )
    parser.add_argument(
        "--marker",
        action="append",
        default=[],
        metavar="PAGE::TEXT",
        help="Extra marker to check. PAGE can be /path or * for all pages.",
    )
    parser.add_argument(
        "--no-default-markers",
        action="store_true",
        help="Disable built-in page markers and use only custom --marker values.",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=15.0,
        help="Per-request timeout in seconds. Default: 15.",
    )
    parser.add_argument(
        "--status-limit",
        type=int,
        default=5,
        help="Maximum number of git status lines to print. Default: 5.",
    )
    parser.add_argument(
        "--strict-exit",
        action="store_true",
        help="Return a non-zero exit code if the live parity portion is red or watch.",
    )
    return parser.parse_args()


def run_git(*git_args: str) -> str:
    completed = subprocess.run(
        ["git", *git_args],
        cwd=REPO_ROOT,
        capture_output=True,
        text=True,
        check=True,
    )
    return completed.stdout.rstrip("\n")


def collect_git_snapshot() -> GitSnapshot:
    head_block = run_git("show", "-s", "--format=%H%n%h%n%cI%n%s", "HEAD")
    head, short_head, committed_at, subject = head_block.split("\n", 3)

    status_output = run_git("status", "--short", "--branch")
    status_lines = status_output.splitlines()
    branch_line = "unknown"
    entries = status_lines
    if status_lines and status_lines[0].startswith("## "):
        branch_line = status_lines[0][3:]
        entries = status_lines[1:]

    staged = 0
    unstaged = 0
    untracked = 0
    for line in entries:
        if line.startswith("??"):
            untracked += 1
            continue
        if not line:
            continue
        if line[0] != " ":
            staged += 1
        if len(line) > 1 and line[1] != " ":
            unstaged += 1

    return GitSnapshot(
        head=head,
        short_head=short_head,
        committed_at=committed_at,
        subject=subject,
        branch=branch_line,
        staged=staged,
        unstaged=unstaged,
        untracked=untracked,
        lines=entries,
    )


def snapshot_pages(args: argparse.Namespace) -> list[str]:
    if args.pages:
        return [normalize_page(page) for page in args.pages]
    route_page = normalize_page(args.resume_route_page)
    pages = list(DEFAULT_BLOCKER_PAGES)
    if route_page not in pages:
        pages.append(route_page)
    return pages


def marker_namespace(args: argparse.Namespace) -> argparse.Namespace:
    return argparse.Namespace(
        no_default_markers=args.no_default_markers,
        marker=args.marker,
    )


def fetch_page_results(
    domains: list[str], pages: list[str], timeout: float
) -> dict[str, list[dict[str, object]]]:
    results = {page: [None] * len(domains) for page in pages}
    future_map = {}

    with ThreadPoolExecutor(max_workers=max(1, len(domains) * len(pages))) as executor:
        for page in pages:
            for index, domain in enumerate(domains):
                url = f"{domain}{page}"
                future = executor.submit(fetch_url, url, timeout)
                future_map[future] = (page, index)

        for future in as_completed(future_map):
            page, index = future_map[future]
            results[page][index] = future.result()

    return {
        page: [result for result in page_results if result is not None]
        for page, page_results in results.items()
    }


def compact_host(domain: str) -> str:
    parts = urlsplit(domain)
    return parts.netloc or domain


def compact_error(message: object) -> str:
    text = " ".join(str(message).split())
    if len(text) <= 60:
        return text
    return f"{text[:57]}..."


def marker_hits(result: dict[str, object], markers: list[str]) -> str:
    if not markers:
        return "0/0"
    body = str(result["body"])
    matched = sum(1 for marker in markers if marker in body)
    return f"{matched}/{len(markers)}"


def page_snapshot_line(
    page: str,
    domains: list[str],
    results: list[dict[str, object]],
    summary: dict[str, object],
    markers: list[str],
) -> str:
    status_codes = ",".join(
        "err" if result["status"] is None else str(result["status"]) for result in results
    )
    parts = [
        f"[{summary['gate']}]",
        str(summary["role"]),
        page,
        f"codes={status_codes}",
        f"parity={summary['parity']}",
        f"last-modified={summary['last_modified']}",
        f"freshness={format_freshness(summary)}",
    ]

    header_watch = summary["header_watch"]
    parts.append(
        "watch=" + (",".join(header_watch) if header_watch else "none")
    )

    final_paths = [urlsplit(str(result["final_url"])).path or "/" for result in results]
    if len(set(final_paths)) > 1:
        parts.append("paths=" + ",".join(final_paths))

    if not summary["requests_ok"] or summary["parity"] != "full-match":
        parts.append(
            "markers="
            + ",".join(marker_hits(result, markers) for result in results)
        )

    errors = []
    for domain, result in zip(domains, results):
        if result["error"]:
            errors.append(f"{compact_host(domain)}:{compact_error(result['error'])}")
    if errors:
        parts.append("errors=" + "; ".join(errors))

    return " ".join(parts)


def print_git_section(snapshot: GitSnapshot, status_limit: int) -> None:
    print("git:")
    print(f"  repo={REPO_ROOT}")
    print(f"  branch={snapshot.branch}")
    print(
        f"  head={snapshot.short_head} full-head={snapshot.head} "
        f"committed_at={snapshot.committed_at} "
        f"subject={snapshot.subject}"
    )
    print(
        f"  tree={snapshot.tree_state} staged={snapshot.staged} "
        f"unstaged={snapshot.unstaged} untracked={snapshot.untracked}"
    )
    if status_limit <= 0:
        return
    shown = snapshot.lines[:status_limit]
    if shown:
        print("  status:")
        for line in shown:
            print(f"    {line}")
        remaining = len(snapshot.lines) - len(shown)
        if remaining > 0:
            print(f"    ... +{remaining} more")


def print_live_section(
    args: argparse.Namespace,
    domains: list[str],
    pages: list[str],
) -> int:
    marker_map = build_marker_map(marker_namespace(args), pages)
    page_results = fetch_page_results(domains, pages, args.timeout)
    resume_route_page = normalize_page(args.resume_route_page)

    summaries = []
    print("live:")
    print(
        "  domains="
        + ", ".join(compact_host(domain) for domain in domains)
    )
    print(f"  preset={'custom-pages' if args.pages else 'green-gate'}")
    for page in pages:
        results = page_results[page]
        summary = build_page_summary(
            page,
            results,
            marker_map.get(page, []),
            resume_route_page,
        )
        summaries.append(summary)
        print(
            "  "
            + page_snapshot_line(
                page,
                domains,
                results,
                summary,
                marker_map.get(page, []),
            )
        )

    overall = overall_gate_status(summaries)
    print(f"  overall={overall}")
    if overall == "green":
        return 0
    if overall in {"watch", "single-domain"}:
        return 1
    return 2


def main() -> int:
    args = parse_args()
    generated_at = datetime.now().astimezone().isoformat(timespec="seconds")
    domains = [normalize_domain(domain) for domain in (args.domains or DEFAULT_DOMAINS)]
    pages = snapshot_pages(args)

    print("parity-snapshot")
    print(f"generated={generated_at}")
    print("mode=read-only")

    git_snapshot = collect_git_snapshot()
    print_git_section(git_snapshot, args.status_limit)

    live_exit = print_live_section(args, domains, pages)
    print(f"strict-exit={live_exit}")

    if args.strict_exit:
        return live_exit
    return 0


if __name__ == "__main__":
    sys.exit(main())
