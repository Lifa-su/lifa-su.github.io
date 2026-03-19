#!/usr/bin/env python3
"""Inventory tracked site-source references to key landing routes."""

from __future__ import annotations

import argparse
import fnmatch
import subprocess
import sys
from collections import Counter, defaultdict
from pathlib import Path


DEFAULT_EXTENSIONS = {".html", ".js", ".json", ".xml"}
DEFAULT_ROUTES = (
    "/job-toolkit.html",
    "/pricing.html",
    "/job-search-system.html",
    "/ai-resume/",
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Scan tracked site-source files for references to the key landing routes "
            "used during cleanup review."
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


def normalize_routes(raw_routes: list[str]) -> tuple[str, ...]:
    if not raw_routes:
        return DEFAULT_ROUTES

    normalized = []
    seen = set()
    for route in raw_routes:
        route = route.strip()
        if not route:
            continue
        if route not in seen:
            normalized.append(route)
            seen.add(route)
    return tuple(normalized) or DEFAULT_ROUTES


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


def iter_matches(path: Path, repo_root: Path, routes: tuple[str, ...]) -> list[tuple[str, int, str]]:
    relative_path = path.relative_to(repo_root).as_posix()
    matches: list[tuple[str, int, str]] = []

    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError as error:
        print(f"warning: could not read {relative_path}: {error}", file=sys.stderr)
        return matches

    for line_number, line in enumerate(text.splitlines(), start=1):
        for route in routes:
            if route in line:
                matches.append((relative_path, line_number, route))

    return matches


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

    all_matches: list[tuple[str, int, str]] = []
    for path in candidates:
        all_matches.extend(iter_matches(path, repo_root, routes))

    all_matches.sort(key=lambda item: (item[0], item[1], item[2]))

    matched_files = {match[0] for match in all_matches}
    scanned_extensions = ", ".join(sorted(extensions))
    print(
        "# "
        f"repo_root={repo_root} scanned_files={len(candidates)} "
        f"matched_files={len(matched_files)} matches={len(all_matches)} "
        f"extensions={scanned_extensions}"
    )
    print("path\tline\troute")
    for relative_path, line_number, route in all_matches:
        print(f"{relative_path}\t{line_number}\t{route}")

    print("# summary")
    matches_by_route = Counter(match[2] for match in all_matches)
    files_by_route: dict[str, set[str]] = defaultdict(set)
    for relative_path, _, route in all_matches:
        files_by_route[route].add(relative_path)

    for route in routes:
        print(
            f"{route}\tfiles={len(files_by_route[route])}\t"
            f"matches={matches_by_route[route]}"
        )

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
