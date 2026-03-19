#!/usr/bin/env python3
"""Print a compact ranked cleanup summary from route-entry and checkout inventories."""

from __future__ import annotations

import argparse
import subprocess
import sys
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from pathlib import Path

from find_direct_checkout_exits import iter_matches as iter_checkout_matches
from find_route_entries import (
    iter_matches as iter_route_matches,
    normalize_extensions,
    normalize_routes,
    should_scan,
    tracked_files,
)


CHECKOUT_KIND_WEIGHTS = {
    "gumroad": 4,
    "kofi_sku": 3,
    "kofi_shop": 1,
}
EXACT_CHECKOUT_KINDS = ("gumroad", "kofi_sku")
OVERLAP_BONUS = 4
TOP_SOURCE_LIMIT = 3
DEFAULT_TOP = 5


@dataclass
class FileSummary:
    path: str
    route_counts: Counter[str] = field(default_factory=Counter)
    checkout_kind_counts: Counter[str] = field(default_factory=Counter)
    checkout_url_counts: Counter[str] = field(default_factory=Counter)
    checkout_url_kinds: dict[str, str] = field(default_factory=dict)

    @property
    def route_matches(self) -> int:
        return sum(self.route_counts.values())

    @property
    def distinct_routes(self) -> int:
        return len(self.route_counts)

    @property
    def checkout_matches(self) -> int:
        return sum(self.checkout_kind_counts.values())

    @property
    def exact_checkout_matches(self) -> int:
        return sum(self.checkout_kind_counts[kind] for kind in EXACT_CHECKOUT_KINDS)

    @property
    def generic_checkout_matches(self) -> int:
        return self.checkout_kind_counts["kofi_shop"]

    @property
    def score(self) -> int:
        score = self.route_matches + (2 * self.distinct_routes)
        score += sum(
            CHECKOUT_KIND_WEIGHTS[kind] * count
            for kind, count in self.checkout_kind_counts.items()
        )
        if self.route_matches and self.exact_checkout_matches:
            score += OVERLAP_BONUS
        return score


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Combine the current route-entry and direct-checkout inventories into "
            "a compact ranked operator summary."
        )
    )
    parser.add_argument(
        "--root",
        default=str(Path(__file__).resolve().parents[1]),
        help="Repo root to scan. Defaults to this script's parent repo.",
    )
    parser.add_argument(
        "--path",
        action="append",
        default=[],
        help=(
            "Optional relative path prefix or shell glob to limit scanning. "
            "Can be repeated."
        ),
    )
    parser.add_argument(
        "--ext",
        action="append",
        dest="extensions",
        default=[],
        help=(
            "File extension to scan, for example .html or .md. "
            "Can be repeated. Defaults to .html, .js, .json, .xml."
        ),
    )
    parser.add_argument(
        "--route",
        action="append",
        default=[],
        help=(
            "Route substring to inventory. Can be repeated. Defaults to "
            "/job-toolkit.html, /pricing.html, /job-search-system.html, /ai-resume/."
        ),
    )
    parser.add_argument(
        "--top",
        type=int,
        default=DEFAULT_TOP,
        help=(
            "Maximum number of ranked rows to print for route feeders, exact "
            "checkout hotspots, overlap targets, and generic shop hubs. "
            f"Default: {DEFAULT_TOP}."
        ),
    )
    return parser.parse_args()


def get_file_summary(
    summaries: dict[str, FileSummary], relative_path: str
) -> FileSummary:
    summary = summaries.get(relative_path)
    if summary is None:
        summary = FileSummary(path=relative_path)
        summaries[relative_path] = summary
    return summary


def top_counter_items(counter: Counter[str], limit: int = TOP_SOURCE_LIMIT) -> str:
    if not counter:
        return "-"
    items = sorted(counter.items(), key=lambda item: (-item[1], item[0]))[:limit]
    return ", ".join(f"{label}({count})" for label, count in items)


def route_mix(summary: FileSummary) -> str:
    return top_counter_items(summary.route_counts)


def exact_checkout_mix(summary: FileSummary) -> str:
    exact_urls = Counter(
        {
            url: count
            for url, count in summary.checkout_url_counts.items()
            if summary.checkout_url_kinds.get(url) in EXACT_CHECKOUT_KINDS
        }
    )
    if not exact_urls:
        return "-"
    return top_counter_items(exact_urls)


def print_section(title: str) -> None:
    print()
    print(title)


def main() -> int:
    args = parse_args()
    repo_root = Path(args.root).resolve()
    extensions = normalize_extensions(args.extensions)
    routes = normalize_routes(args.route)

    try:
        candidates = [
            path
            for path in tracked_files(repo_root)
            if should_scan(path, repo_root, extensions, args.path)
        ]
    except subprocess.CalledProcessError as error:
        print(f"error: could not list tracked files under {repo_root}: {error}", file=sys.stderr)
        return 2

    file_summaries: dict[str, FileSummary] = {}
    route_totals = Counter()
    route_sources: dict[str, Counter[str]] = defaultdict(Counter)
    route_files: dict[str, set[str]] = defaultdict(set)
    checkout_kind_totals = Counter()
    checkout_url_totals = Counter()
    checkout_url_sources: dict[str, Counter[str]] = defaultdict(Counter)
    checkout_url_files: dict[str, set[str]] = defaultdict(set)
    checkout_url_kind: dict[str, str] = {}

    for path in candidates:
        route_matches = iter_route_matches(path, repo_root, routes)
        for relative_path, _, route in route_matches:
            summary = get_file_summary(file_summaries, relative_path)
            summary.route_counts[route] += 1
            route_totals[route] += 1
            route_sources[route][relative_path] += 1
            route_files[route].add(relative_path)

        checkout_matches = iter_checkout_matches(path, repo_root)
        for match_kind, relative_path, _, url in checkout_matches:
            summary = get_file_summary(file_summaries, relative_path)
            summary.checkout_kind_counts[match_kind] += 1
            summary.checkout_url_counts[url] += 1
            summary.checkout_url_kinds[url] = match_kind
            checkout_kind_totals[match_kind] += 1
            checkout_url_totals[url] += 1
            checkout_url_sources[url][relative_path] += 1
            checkout_url_files[url].add(relative_path)
            checkout_url_kind[url] = match_kind

    exact_checkout_total = sum(
        checkout_kind_totals[kind] for kind in EXACT_CHECKOUT_KINDS
    )
    route_file_total = sum(1 for summary in file_summaries.values() if summary.route_matches)
    checkout_file_total = sum(
        1 for summary in file_summaries.values() if summary.checkout_matches
    )
    exact_checkout_file_total = sum(
        1 for summary in file_summaries.values() if summary.exact_checkout_matches
    )
    overlap_file_total = sum(
        1
        for summary in file_summaries.values()
        if summary.route_matches and summary.exact_checkout_matches
    )

    print("cleanup-priority")
    print(
        f"repo_root={repo_root} scanned_files={len(candidates)} "
        f"route_matches={sum(route_totals.values())} "
        f"checkout_matches={sum(checkout_kind_totals.values())} "
        f"exact_checkout_matches={exact_checkout_total} "
        f"generic_checkout_matches={checkout_kind_totals['kofi_shop']}"
    )
    print(
        f"files route={route_file_total} checkout={checkout_file_total} "
        f"exact_checkout={exact_checkout_file_total} exact_overlap={overlap_file_total} "
        "score=route_matches+2*distinct_routes+4*gumroad+3*kofi_sku+kofi_shop+4(exact_overlap)"
    )

    print_section("route-hotspots")
    ranked_routes = sorted(routes, key=lambda route: (-route_totals[route], route))
    for index, route in enumerate(ranked_routes, start=1):
        print(
            f"{index}. {route} files={len(route_files[route])} matches={route_totals[route]} "
            f"top_sources={top_counter_items(route_sources[route])}"
        )

    print_section("route-feeders")
    route_feeders = [
        summary for summary in file_summaries.values() if summary.route_matches
    ]
    route_feeders.sort(
        key=lambda summary: (
            -summary.route_matches,
            -summary.distinct_routes,
            summary.path,
        )
    )
    for index, summary in enumerate(route_feeders[: max(0, args.top)], start=1):
        print(
            f"{index}. {summary.path} score={summary.score} "
            f"route_matches={summary.route_matches} routes={summary.distinct_routes} "
            f"route_mix={route_mix(summary)}"
        )

    print_section("exact-checkout-hotspots")
    exact_checkout_urls = [
        url
        for url, kind in checkout_url_kind.items()
        if kind in EXACT_CHECKOUT_KINDS
    ]
    exact_checkout_urls.sort(
        key=lambda url: (
            -checkout_url_totals[url],
            -len(checkout_url_files[url]),
            checkout_url_kind[url],
            url,
        )
    )
    for index, url in enumerate(exact_checkout_urls[: max(0, args.top)], start=1):
        print(
            f"{index}. {url} kind={checkout_url_kind[url]} "
            f"files={len(checkout_url_files[url])} matches={checkout_url_totals[url]} "
            f"top_sources={top_counter_items(checkout_url_sources[url])}"
        )

    print_section("overlap-targets")
    overlap_targets = [
        summary
        for summary in file_summaries.values()
        if summary.route_matches and summary.exact_checkout_matches
    ]
    overlap_targets.sort(
        key=lambda summary: (
            -summary.score,
            -summary.exact_checkout_matches,
            -summary.route_matches,
            summary.path,
        )
    )
    for index, summary in enumerate(overlap_targets[: max(0, args.top)], start=1):
        print(
            f"{index}. {summary.path} score={summary.score} "
            f"route_matches={summary.route_matches} routes={summary.distinct_routes} "
            f"exact_checkout={summary.exact_checkout_matches} "
            f"generic_checkout={summary.generic_checkout_matches} "
            f"route_mix={route_mix(summary)} exact_mix={exact_checkout_mix(summary)}"
        )

    print_section("generic-shop-hubs")
    generic_shop_urls = [
        url
        for url, kind in checkout_url_kind.items()
        if kind == "kofi_shop"
        and (checkout_url_totals[url] > 1 or len(checkout_url_files[url]) > 1)
    ]
    generic_shop_urls.sort(
        key=lambda url: (
            -checkout_url_totals[url],
            -len(checkout_url_files[url]),
            url,
        )
    )
    for index, url in enumerate(generic_shop_urls[: max(0, args.top)], start=1):
        print(
            f"{index}. {url} files={len(checkout_url_files[url])} "
            f"matches={checkout_url_totals[url]} "
            f"top_sources={top_counter_items(checkout_url_sources[url])}"
        )

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
