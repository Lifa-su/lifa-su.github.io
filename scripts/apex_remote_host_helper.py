#!/usr/bin/env python3
"""Print or run the read-only apex remote-host verification flow."""

from __future__ import annotations

import argparse
import shlex
import subprocess
import sys
from dataclasses import dataclass
from typing import Callable


HOST = "opc@64.181.255.230"
VHOST = "/etc/nginx/conf.d/lifa-su.com.conf"
PUBLIC_DOMAIN = "https://lifa-su.com"
TARGET_ROUTE = "/job-toolkit.html"
RESEARCH_NOTE = "research/apex-remote-host-verification-command-pack-2026-03-19.md"


@dataclass(frozen=True)
class Section:
    name: str
    title: str
    needs_root: bool
    build_commands: Callable[[str | None], list[str]]


def quote(value: str) -> str:
    return shlex.quote(value)


def remote_file(root: str) -> str:
    return f"{root.rstrip('/')}/job-toolkit.html"


def build_vhost_commands(root: str | None) -> list[str]:
    del root
    quoted_vhost = quote(VHOST)
    return [
        f"sudo -n sed -n '1,260p' {quoted_vhost} || sed -n '1,260p' {quoted_vhost}",
        (
            "sudo -n grep -nE "
            "'server_name|listen|root |alias |index |try_files|proxy_pass|"
            f"proxy_set_header|return |rewrite ' {quoted_vhost} || "
            "grep -nE "
            "'server_name|listen|root |alias |index |try_files|proxy_pass|"
            f"proxy_set_header|return |rewrite ' {quoted_vhost}"
        ),
        (
            "sudo -n grep -nA25 -B5 -E "
            "'server_name[[:space:]].*lifa-su\\.com' "
            f"{quoted_vhost} || "
            "grep -nA25 -B5 -E "
            "'server_name[[:space:]].*lifa-su\\.com' "
            f"{quoted_vhost}"
        ),
    ]


def build_routing_commands(root: str | None) -> list[str]:
    del root
    quoted_vhost = quote(VHOST)
    return [
        (
            "sudo -n grep -nE "
            "'server_name[[:space:]].*lifa-su\\.com|root |alias |try_files|"
            f"proxy_pass|return |rewrite ' {quoted_vhost} || "
            "grep -nE "
            "'server_name[[:space:]].*lifa-su\\.com|root |alias |try_files|"
            f"proxy_pass|return |rewrite ' {quoted_vhost}"
        ),
        (
            "sudo -n grep -RInE "
            "'upstream[[:space:]]|proxy_pass[[:space:]]|server_name[[:space:]].*"
            "lifa-su\\.com' /etc/nginx || "
            "grep -RInE "
            "'upstream[[:space:]]|proxy_pass[[:space:]]|server_name[[:space:]].*"
            "lifa-su\\.com' /etc/nginx"
        ),
    ]


def build_disk_commands(root: str | None) -> list[str]:
    if root is None:
        raise ValueError("The disk section requires --root.")

    quoted_root = quote(root)
    quoted_file = quote(remote_file(root))
    return [
        f"sudo -n ls -ld {quoted_root} {quoted_file} || ls -ld {quoted_root} {quoted_file}",
        (
            "sudo -n stat -c '%n | size=%s | mtime=%y' "
            f"{quoted_file} || stat {quoted_file}"
        ),
        f"sudo -n sed -n '1,160p' {quoted_file} || sed -n '1,160p' {quoted_file}",
        f"sudo -n sh -lc {quote(f'sha256sum {quoted_file}')} || sh -lc {quote(f'sha256sum {quoted_file}')}",
    ]


def build_headers_commands(root: str | None) -> list[str]:
    del root
    route = TARGET_ROUTE
    public_url = f"{PUBLIC_DOMAIN}{route}"
    return [
        (
            "curl -sSIk -H 'Host: lifa-su.com' "
            f"http://127.0.0.1{route} | sed -n '1,30p'"
        ),
        f"curl -sSIk {quote(public_url)} | sed -n '1,30p'",
        (
            "curl -sS -o /dev/null -w "
            "'loopback_vhost status=%{http_code} type=%{content_type} "
            "bytes=%{size_download} ip=%{remote_ip} url=%{url_effective}\\n' "
            "-H 'Host: lifa-su.com' "
            f"http://127.0.0.1{route}"
        ),
        (
            "curl -sS -o /dev/null -w "
            "'public_apex status=%{http_code} type=%{content_type} "
            "bytes=%{size_download} ip=%{remote_ip} url=%{url_effective}\\n' "
            f"{quote(public_url)}"
        ),
        (
            "curl -sS -H 'Host: lifa-su.com' "
            f"http://127.0.0.1{route} | "
            "grep -nE 'AI Job Toolkit|Start with the Job Toolkit|Job Search Toolkit|"
            "First paid step|ko-fi|gumroad|canonical' | head -n 20"
        ),
    ]


def build_hash_commands(root: str | None) -> list[str]:
    if root is None:
        raise ValueError("The hash section requires --root.")

    file_path = remote_file(root)
    inner = (
        f'printf "disk  "; sha256sum {quote(file_path)}; '
        'printf "serve "; '
        "curl -sS -H \"Host: lifa-su.com\" "
        f"http://127.0.0.1{TARGET_ROUTE} | sha256sum"
    )
    quoted_inner = quote(inner)
    return [f"sudo -n sh -lc {quoted_inner} || sh -lc {quoted_inner}"]


SECTIONS = [
    Section("vhost", "Inspect the nginx vhost file", False, build_vhost_commands),
    Section("routing", "Find the apex static root or proxy target", False, build_routing_commands),
    Section("headers", "Print response and header facts for comparison", False, build_headers_commands),
    Section("disk", "Inspect on-disk job-toolkit.html if a static root is known", True, build_disk_commands),
    Section("hash", "Strongest static-root comparison", True, build_hash_commands),
]
SECTION_MAP = {section.name: section for section in SECTIONS}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Read-only helper for the remote apex-host verification flow. "
            "Defaults to printing commands; --run executes only the same "
            "non-mutating sections."
        )
    )
    parser.add_argument(
        "--section",
        action="append",
        choices=list(SECTION_MAP),
        help="Section to print or run. Repeat to select multiple sections.",
    )
    parser.add_argument(
        "--root",
        help="Static root or alias path found in nginx, for example /usr/share/nginx/html.",
    )
    parser.add_argument(
        "--run",
        action="store_true",
        help="Execute the selected read-only commands instead of printing them.",
    )
    parser.add_argument(
        "--list-sections",
        action="store_true",
        help="List available section names and exit.",
    )
    parser.add_argument(
        "--ssh-bin",
        default="ssh",
        help="SSH binary to use when --run is set. Default: ssh.",
    )
    return parser.parse_args()


def selected_sections(args: argparse.Namespace) -> list[Section]:
    if args.section:
        sections = [SECTION_MAP[name] for name in args.section]
    else:
        sections = [section for section in SECTIONS if not section.needs_root]
        if args.root:
            sections.extend(
                section for section in SECTIONS if section.needs_root
            )

    for section in sections:
        if section.needs_root and not args.root:
            raise ValueError(f"The {section.name} section requires --root.")
    return sections


def print_section(section: Section, commands: list[str]) -> None:
    print(f"## {section.title} [{section.name}]")
    for command in commands:
        print(f"{shlex.join(['ssh', HOST, command])}")
    print()


def run_section(section: Section, commands: list[str], ssh_bin: str) -> int:
    print(f"== {section.title} [{section.name}] ==", flush=True)
    exit_code = 0
    for command in commands:
        argv = [ssh_bin, HOST, command]
        print(f"+ {shlex.join(argv)}", flush=True)
        completed = subprocess.run(argv, check=False)
        if completed.returncode != 0 and exit_code == 0:
            exit_code = completed.returncode
    print()
    return exit_code


def print_preamble(root: str | None) -> None:
    print("# Read-only apex remote-host helper")
    print(f"# Host: {HOST}")
    print(f"# Vhost: {VHOST}")
    print(f"# Target route: {TARGET_ROUTE}")
    if root:
        print(f"# Static root: {root}")
    print(f"# Manual command pack: {RESEARCH_NOTE}")
    print("# Default mode prints commands. Use --run to execute the same read-only checks.")
    print()


def main() -> int:
    args = parse_args()

    if args.list_sections:
        for section in SECTIONS:
            suffix = " (requires --root)" if section.needs_root else ""
            print(f"{section.name}: {section.title}{suffix}")
        return 0

    try:
        sections = selected_sections(args)
    except ValueError as error:
        print(f"error: {error}", file=sys.stderr)
        return 2

    rendered_sections: list[tuple[Section, list[str]]] = []
    for section in sections:
        try:
            commands = section.build_commands(args.root)
        except ValueError as error:
            print(f"error: {error}", file=sys.stderr)
            return 2
        rendered_sections.append((section, commands))

    if not args.run:
        print_preamble(args.root)
        for section, commands in rendered_sections:
            print_section(section, commands)
        return 0

    exit_code = 0
    for section, commands in rendered_sections:
        section_exit_code = run_section(section, commands, args.ssh_bin)
        if section_exit_code != 0 and exit_code == 0:
            exit_code = section_exit_code
    return exit_code


if __name__ == "__main__":
    raise SystemExit(main())
