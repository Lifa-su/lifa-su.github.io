#!/usr/bin/env python3
"""Fingerprint domain-layer state for the parity blocker domains/pages."""

from __future__ import annotations

import argparse
import shutil
import socket
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from typing import Iterable
from urllib.parse import urlsplit

from check_live_parity import (
    DEFAULT_BLOCKER_PAGES,
    DEFAULT_DOMAINS,
    fetch_url,
    normalize_domain,
    normalize_page,
)


KEY_HEADERS = [
    "server",
    "cf-cache-status",
    "x-vercel-cache",
    "x-vercel-id",
    "x-vercel-deployment-url",
    "x-cache",
    "via",
    "age",
    "cache-control",
    "etag",
    "last-modified",
]

DNS_RECORD_TYPES = ("CNAME", "A", "AAAA")
ROOT_PATH = "/"


@dataclass
class DnsReport:
    source: str
    records: dict[str, list[str]]
    error: str | None = None


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Print a read-only DNS and header fingerprint for the default parity "
            "domains and blocker pages."
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
        help=(
            "Blocker page path to fingerprint, for example /pricing.html. "
            "Can be repeated."
        ),
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=10.0,
        help="Per-request timeout in seconds. Default: 10.",
    )
    parser.add_argument(
        "--skip-dns",
        action="store_true",
        help="Skip DNS resolution and only collect HTTP response fingerprints.",
    )
    return parser.parse_args()


def dns_command_timeout(request_timeout: float) -> float:
    return max(1.0, min(5.0, request_timeout))


def compact_error(message: object) -> str:
    text = " ".join(str(message).split())
    if len(text) <= 80:
        return text
    return f"{text[:77]}..."


def compact_host(domain: str) -> str:
    parts = urlsplit(domain)
    return parts.netloc or domain


def unique(values: Iterable[str]) -> list[str]:
    seen: set[str] = set()
    ordered: list[str] = []
    for value in values:
        if value in seen:
            continue
        seen.add(value)
        ordered.append(value)
    return ordered


def normalize_dns_answer(answer: str) -> str:
    return answer.strip().rstrip(".")


def resolve_with_dig(host: str, timeout: float) -> tuple[dict[str, list[str]], list[str]]:
    if shutil.which("dig") is None:
        return {}, []

    records: dict[str, list[str]] = {}
    errors: list[str] = []
    for record_type in DNS_RECORD_TYPES:
        try:
            completed = subprocess.run(
                ["dig", "+short", host, record_type],
                capture_output=True,
                text=True,
                timeout=timeout,
                check=False,
            )
        except subprocess.TimeoutExpired:
            errors.append(f"{record_type}:dig timeout")
            continue
        except OSError as error:
            errors.append(f"{record_type}:dig failed ({compact_error(error)})")
            continue

        if completed.returncode != 0:
            errors.append(f"{record_type}:dig exit {completed.returncode}")
            continue

        answers = [
            normalize_dns_answer(line)
            for line in completed.stdout.splitlines()
            if line.strip()
        ]
        if answers:
            records[record_type] = unique(answers)

    return records, errors


def resolve_with_socket(host: str) -> tuple[dict[str, list[str]], str | None]:
    try:
        addr_info = socket.getaddrinfo(host, 443, type=socket.SOCK_STREAM)
    except socket.gaierror as error:
        return {}, compact_error(error)

    records = {"A": [], "AAAA": []}
    for family, _, _, _, sockaddr in addr_info:
        if family == socket.AF_INET:
            records["A"].append(sockaddr[0])
        elif family == socket.AF_INET6:
            records["AAAA"].append(sockaddr[0])

    filtered = {
        record_type: unique(values)
        for record_type, values in records.items()
        if values
    }
    return filtered, None


def resolve_dns(host: str, timeout: float) -> DnsReport:
    dig_records, dig_errors = resolve_with_dig(host, timeout)

    records = {
        record_type: list(values) for record_type, values in dig_records.items()
    }
    source_parts: list[str] = []
    if shutil.which("dig") is not None:
        source_parts.append("dig")

    socket_needed = not records.get("A") and not records.get("AAAA")
    socket_records: dict[str, list[str]] = {}
    socket_error: str | None = None
    if socket_needed:
        socket_records, socket_error = resolve_with_socket(host)
        if socket_records:
            source_parts.append("socket")
            for record_type, values in socket_records.items():
                existing = records.setdefault(record_type, [])
                records[record_type] = unique([*existing, *values])

    if records:
        return DnsReport(source="+".join(source_parts) or "socket", records=records)

    errors = [error for error in [*dig_errors, socket_error] if error]
    return DnsReport(
        source="+".join(source_parts) or "unavailable",
        records={},
        error="; ".join(errors) if errors else "no DNS answers",
    )


def tracked_paths(args: argparse.Namespace) -> list[str]:
    pages = args.pages or DEFAULT_BLOCKER_PAGES
    normalized = [normalize_page(page) for page in pages]
    return unique([ROOT_PATH, *normalized])


def fetch_all(
    domains: list[str], paths: list[str], timeout: float
) -> dict[str, dict[str, dict[str, object]]]:
    results = {domain: {} for domain in domains}
    future_map = {}

    with ThreadPoolExecutor(max_workers=max(1, len(domains) * len(paths))) as executor:
        for domain in domains:
            for path in paths:
                url = f"{domain}{path}"
                future = executor.submit(fetch_url, url, timeout)
                future_map[future] = (domain, path)

        for future in as_completed(future_map):
            domain, path = future_map[future]
            results[domain][path] = future.result()

    return results


def header_value(result: dict[str, object], header: str) -> str | None:
    value = result["headers"].get(header)
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def format_header_pairs(result: dict[str, object]) -> list[str]:
    pairs = []
    for header in KEY_HEADERS:
        value = header_value(result, header)
        if value is None:
            continue
        pairs.append(f"{header}={value}")
    return pairs


def value_alignment(values: list[str | None]) -> str:
    present = [value for value in values if value is not None]
    if not present:
        return "missing"
    if len(set(present)) == 1 and len(present) == len(values):
        return "match"
    if len(set(present)) == 1:
        return "partial"
    return "drift"


def status_alignment(results: list[dict[str, object]]) -> str:
    statuses = [result["status"] for result in results]
    if all(status is None for status in statuses):
        return "all-error"
    if any(status is None for status in statuses):
        return "partial-error"
    return value_alignment([str(status) for status in statuses])


def final_path_alignment(results: list[dict[str, object]]) -> str:
    if any(result["status"] is None for result in results):
        return "unknown"
    final_paths = [urlsplit(str(result["final_url"])).path or "/" for result in results]
    return value_alignment(final_paths)


def redirect_summary(
    domains: list[str], path: str, results: list[dict[str, object]]
) -> str:
    redirects = []
    for domain, result in zip(domains, results):
        expected = f"{domain}{path}"
        final_url = str(result["final_url"])
        if final_url == expected:
            continue
        redirects.append(f"{compact_host(domain)}->{final_url}")
    return "; ".join(redirects) if redirects else "none"


def print_dns_section(report: DnsReport) -> None:
    print("  dns:")
    print(f"    source={report.source}")
    for record_type in DNS_RECORD_TYPES:
        values = report.records.get(record_type, [])
        print(f"    {record_type}={', '.join(values) if values else '-'}")
    if report.error:
        print(f"    error={report.error}")


def print_fetch_section(label: str, url: str, result: dict[str, object]) -> None:
    print(f"  {label}:")
    print(f"    url={url}")
    print(
        "    status="
        + (str(result["status"]) if result["status"] is not None else "error")
    )
    print(f"    final_url={result['final_url']}")
    if result["error"]:
        print(f"    error={compact_error(result['error'])}")
    headers = format_header_pairs(result)
    print(f"    headers={'; '.join(headers) if headers else 'none of the tracked headers'}")


def compare_paths(
    domains: list[str], paths: list[str], results: dict[str, dict[str, dict[str, object]]]
) -> None:
    if len(domains) < 2:
        return

    print("compare:")
    for path in paths:
        page_results = [results[domain][path] for domain in domains]
        drift_headers = []
        header_state = "unavailable"
        if not all(result["status"] is None for result in page_results):
            for header in KEY_HEADERS:
                alignment = value_alignment(
                    [header_value(result, header) for result in page_results]
                )
                if alignment not in {"match", "missing"}:
                    drift_headers.append(f"{header}={alignment}")
            header_state = ",".join(drift_headers) if drift_headers else "all-match-or-missing"

        print(
            "  "
            + path
            + " status="
            + status_alignment(page_results)
            + " final-path="
            + final_path_alignment(page_results)
            + " redirects="
            + redirect_summary(domains, path, page_results)
            + " headers="
            + header_state
        )


def main() -> int:
    args = parse_args()
    domains = [normalize_domain(domain) for domain in (args.domains or DEFAULT_DOMAINS)]
    paths = tracked_paths(args)
    results = fetch_all(domains, paths, args.timeout)

    print("domain-layer-fingerprint")
    print("mode=read-only")
    print("focus=dns+headers+blocker-urls")
    print("domains=" + ", ".join(compact_host(domain) for domain in domains))
    print("blocker-pages=" + ", ".join(path for path in paths if path != ROOT_PATH))

    exit_code = 0
    dns_timeout = dns_command_timeout(args.timeout)
    for domain in domains:
        print()
        print(f"=== {domain} ===")
        host = compact_host(domain)
        print(f"  host={host}")
        if args.skip_dns:
            print("  dns:")
            print("    skipped=true")
        else:
            print_dns_section(resolve_dns(host, dns_timeout))

        print_fetch_section("origin", f"{domain}{ROOT_PATH}", results[domain][ROOT_PATH])
        for path in paths:
            if path == ROOT_PATH:
                continue
            result = results[domain][path]
            print_fetch_section(f"blocker {path}", f"{domain}{path}", result)
            if result["status"] is None or not result["ok"]:
                exit_code = 1

    print()
    compare_paths(domains, paths, results)
    return exit_code


if __name__ == "__main__":
    sys.exit(main())
