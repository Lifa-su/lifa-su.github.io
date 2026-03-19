#!/usr/bin/env python3
"""Inventory direct Gumroad and Ko-fi checkout/shop exits in tracked site files."""

from __future__ import annotations

import argparse
import fnmatch
import subprocess
import sys
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlsplit
import re


DEFAULT_EXTENSIONS = {".html", ".js", ".json", ".xml"}
URL_RE = re.compile(r"https?://[^\s\"'<>`]+")
TRAILING_URL_PUNCTUATION = ".,;:!?)]}\r\n"
RESERVED_KOFI_SEGMENTS = {
    "account",
    "commissions",
    "explore",
    "home",
    "i",
    "manage",
    "membership",
    "post",
    "s",
    "search",
    "shop",
    "stream",
    "video",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Scan tracked site-source files for direct Gumroad links, "
            "Ko-fi SKU links, and generic Ko-fi shop/profile links."
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
    return parser.parse_args()


def normalize_extensions(raw_extensions: list[str]) -> set[str]:
    if not raw_extensions:
        return set(DEFAULT_EXTENSIONS)

    normalized = set()
    for extension in raw_extensions:
        extension = extension.strip()
        if not extension:
            continue
        if extension == "*":
            normalized.add(extension)
            continue
        if not extension.startswith("."):
            extension = f".{extension}"
        normalized.add(extension.lower())
    return normalized or set(DEFAULT_EXTENSIONS)


def tracked_files(repo_root: Path) -> list[Path]:
    result = subprocess.run(
        ["git", "-C", str(repo_root), "ls-files", "-z"],
        check=True,
        capture_output=True,
    )
    raw_paths = result.stdout.decode("utf-8", errors="replace").split("\0")
    return [repo_root / raw_path for raw_path in raw_paths if raw_path]


def matches_path_filter(relative_path: str, filters: list[str]) -> bool:
    if not filters:
        return True

    for raw_filter in filters:
        path_filter = raw_filter.strip().lstrip("./")
        if not path_filter:
            continue
        if any(token in path_filter for token in "*?[]"):
            if fnmatch.fnmatch(relative_path, path_filter):
                return True
            continue
        normalized = path_filter.rstrip("/")
        if relative_path == normalized or relative_path.startswith(f"{normalized}/"):
            return True
    return False


def should_scan(path: Path, repo_root: Path, extensions: set[str], filters: list[str]) -> bool:
    relative_path = path.relative_to(repo_root).as_posix()

    if "/node_modules/" in f"/{relative_path}/":
        return False

    if not matches_path_filter(relative_path, filters):
        return False

    if "*" in extensions:
        return True

    return path.suffix.lower() in extensions


def clean_url(raw_url: str) -> str:
    url = raw_url
    while url and url[-1] in TRAILING_URL_PUNCTUATION:
        url = url[:-1]
    return url


def classify_url(url: str) -> str | None:
    parsed = urlsplit(url)
    host = parsed.netloc.lower()
    if host.startswith("www."):
        host = host[4:]

    if host.endswith("gumroad.com"):
        return "gumroad"

    if host != "ko-fi.com":
        return None

    segments = [segment for segment in parsed.path.split("/") if segment]
    if len(segments) >= 2 and segments[0].lower() == "s":
        return "kofi_sku"

    if not segments:
        return None

    first_segment = segments[0].lower()
    if first_segment in RESERVED_KOFI_SEGMENTS:
        return None

    if len(segments) == 1:
        return "kofi_shop"

    if len(segments) == 2 and segments[1].lower() == "shop":
        return "kofi_shop"

    return None


def iter_matches(path: Path, repo_root: Path) -> list[tuple[str, str, int, str]]:
    relative_path = path.relative_to(repo_root).as_posix()
    matches: list[tuple[str, str, int, str]] = []

    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError as error:
        print(f"warning: could not read {relative_path}: {error}", file=sys.stderr)
        return matches

    for line_number, line in enumerate(text.splitlines(), start=1):
        seen_on_line = set()
        for raw_url in URL_RE.findall(line):
            url = clean_url(raw_url)
            if not url or url in seen_on_line:
                continue
            seen_on_line.add(url)

            match_kind = classify_url(url)
            if match_kind:
                matches.append((match_kind, relative_path, line_number, url))

    return matches


def main() -> int:
    args = parse_args()
    repo_root = Path(args.root).resolve()
    extensions = normalize_extensions(args.extensions)

    try:
        candidates = [
            path
            for path in tracked_files(repo_root)
            if should_scan(path, repo_root, extensions, args.path)
        ]
    except subprocess.CalledProcessError as error:
        print(f"error: could not list tracked files under {repo_root}: {error}", file=sys.stderr)
        return 2

    all_matches: list[tuple[str, str, int, str]] = []
    for path in candidates:
        all_matches.extend(iter_matches(path, repo_root))

    all_matches.sort(key=lambda item: (item[1], item[2], item[0], item[3]))

    matched_files = {match[1] for match in all_matches}
    scanned_extensions = ", ".join(sorted(extensions))
    print(
        "# "
        f"repo_root={repo_root} scanned_files={len(candidates)} "
        f"matched_files={len(matched_files)} matches={len(all_matches)} "
        f"extensions={scanned_extensions}"
    )
    print("kind\tpath\tline\turl")
    for match_kind, relative_path, line_number, url in all_matches:
        print(f"{match_kind}\t{relative_path}\t{line_number}\t{url}")

    print("# summary")
    matches_by_kind = Counter(match[0] for match in all_matches)
    files_by_kind: dict[str, set[str]] = defaultdict(set)
    for match_kind, relative_path, _, _ in all_matches:
        files_by_kind[match_kind].add(relative_path)

    for match_kind in ("gumroad", "kofi_sku", "kofi_shop"):
        print(
            f"{match_kind}\tfiles={len(files_by_kind[match_kind])}\t"
            f"matches={matches_by_kind[match_kind]}"
        )

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
