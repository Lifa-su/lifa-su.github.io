#!/usr/bin/env python3
"""Check a small set of live pages across multiple domains for parity signals."""

from __future__ import annotations

import argparse
import sys
import urllib.error
import urllib.request
from urllib.parse import urlsplit


DEFAULT_DOMAINS = [
    "https://lifa-su.github.io",
    "https://lifa-su.com",
]

DEFAULT_PAGES = [
    "/job-toolkit.html",
    "/pricing.html",
    "/job-search-system.html",
]

DEFAULT_HEADERS = [
    "server",
    "cf-cache-status",
    "x-vercel-cache",
    "x-vercel-id",
    "x-vercel-deployment-url",
    "x-cache",
    "via",
    "age",
    "last-modified",
    "etag",
    "cache-control",
]

DEFAULT_MARKERS = {
    "/job-toolkit.html": [
        "First paid step in the job-search path",
        "No subscription. Job Toolkit is the $29 first paid step. Human review comes later only if needed.",
        "Free tools first, pricing later",
    ],
    "/pricing.html": [
        "Pricing is the compare page, not the entry page",
        "ATS-safe, human-readable resume + cover letter + interview system",
        "Anti-robotic cover letters and anti-freeze interview prep",
    ],
    "/job-search-system.html": [
        "Competition is heavier, AI-assisted screening is rising",
        "The first paid step when you need one same-candidate system",
        "Free tools first, Job Toolkit as the first paid step, human review only if needed",
    ],
}

USER_AGENT = "live-parity-checker/1.0"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Fetch pages from multiple domains and compare parity markers."
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
    return parser.parse_args()


def normalize_domain(domain: str) -> str:
    return domain.rstrip("/")


def normalize_page(page: str) -> str:
    if not page.startswith("/"):
        return f"/{page}"
    return page


def parse_marker_arg(raw_marker: str) -> tuple[str, str]:
    page, separator, marker = raw_marker.partition("::")
    if not separator or not marker:
        raise ValueError(
            f"Invalid --marker value {raw_marker!r}. Expected PAGE::TEXT."
        )
    page = page.strip()
    marker = marker.strip()
    if page != "*":
        page = normalize_page(page)
    if not marker:
        raise ValueError("Marker text cannot be empty.")
    return page, marker


def build_marker_map(args: argparse.Namespace, pages: list[str]) -> dict[str, list[str]]:
    marker_map = {page: [] for page in pages}

    if not args.no_default_markers:
        for page in pages:
            marker_map[page].extend(DEFAULT_MARKERS.get(page, []))

    for raw_marker in args.marker:
        page_key, marker = parse_marker_arg(raw_marker)
        if page_key == "*":
            for page in pages:
                marker_map[page].append(marker)
            continue
        if page_key not in marker_map:
            marker_map[page_key] = []
        marker_map[page_key].append(marker)

    return marker_map


def decode_body(body_bytes: bytes, content_type: str | None) -> str:
    charset = "utf-8"
    if content_type:
        for part in content_type.split(";"):
            part = part.strip()
            if part.lower().startswith("charset="):
                charset = part.split("=", 1)[1].strip() or "utf-8"
                break
    try:
        return body_bytes.decode(charset, errors="replace")
    except LookupError:
        return body_bytes.decode("utf-8", errors="replace")


def fetch_url(url: str, timeout: float) -> dict[str, object]:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept-Encoding": "identity",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return response_to_result(response)
    except urllib.error.HTTPError as error:
        return response_to_result(error, error_message=f"HTTP {error.code}")
    except urllib.error.URLError as error:
        return {
            "ok": False,
            "status": None,
            "final_url": url,
            "headers": {},
            "body": "",
            "error": str(error.reason),
        }
    except Exception as error:  # pragma: no cover - last-resort safety for CLI use.
        return {
            "ok": False,
            "status": None,
            "final_url": url,
            "headers": {},
            "body": "",
            "error": str(error),
        }


def response_to_result(
    response: urllib.response.addinfourl, error_message: str | None = None
) -> dict[str, object]:
    body_bytes = response.read()
    headers = {header: response.headers.get(header) for header in DEFAULT_HEADERS}
    return {
        "ok": error_message is None,
        "status": response.getcode(),
        "final_url": response.geturl(),
        "headers": headers,
        "body": decode_body(body_bytes, response.headers.get("Content-Type")),
        "error": error_message,
    }


def parity_status(results: list[dict[str, object]], markers: list[str]) -> str:
    if len(results) < 2:
        return "n/a"
    if any(result["status"] is None for result in results):
        return "unknown"

    marker_vectors = []
    final_paths = []
    statuses = []

    for result in results:
        body = str(result["body"])
        marker_vectors.append(tuple(marker in body for marker in markers))
        final_paths.append(urlsplit(str(result["final_url"])).path)
        statuses.append(result["status"])

    same_markers = len(set(marker_vectors)) == 1
    same_final_path = len(set(final_paths)) == 1
    same_status = len(set(statuses)) == 1

    if same_markers and same_status and same_final_path:
        return "full-match"
    if same_markers and same_status:
        return "markers-match"
    return "drift"


def print_page_report(
    page: str, domains: list[str], marker_map: dict[str, list[str]], timeout: float
) -> int:
    print(f"=== {page} ===")
    page_results: list[dict[str, object]] = []

    for domain in domains:
        url = f"{domain}{page}"
        result = fetch_url(url, timeout)
        page_results.append(result)
        body = str(result["body"])

        print(f"domain: {domain}")
        print(f"status: {result['status'] if result['status'] is not None else 'error'}")
        print(f"final_url: {result['final_url']}")
        if result["error"]:
            print(f"error: {result['error']}")
        print("headers:")
        for header in DEFAULT_HEADERS:
            value = result["headers"].get(header)
            if value:
                print(f"  {header}: {value}")
        if not any(result["headers"].get(header) for header in DEFAULT_HEADERS):
            print("  (none of the tracked headers were present)")
        print("markers:")
        if marker_map.get(page):
            for marker in marker_map[page]:
                found = marker in body
                state = "yes" if found else "no"
                print(f"  [{state}] {marker}")
        else:
            print("  (no markers configured)")
        print()

    print(f"parity: {parity_status(page_results, marker_map.get(page, []))}")
    print()

    return 0 if all(result["status"] and result["ok"] for result in page_results) else 1


def main() -> int:
    args = parse_args()
    domains = [normalize_domain(domain) for domain in (args.domains or DEFAULT_DOMAINS)]
    pages = [normalize_page(page) for page in (args.pages or DEFAULT_PAGES)]
    marker_map = build_marker_map(args, pages)

    exit_code = 0
    for page in pages:
        exit_code |= print_page_report(page, domains, marker_map, args.timeout)
    return exit_code


if __name__ == "__main__":
    sys.exit(main())
