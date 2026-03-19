# Apex Remote Host Verification Command Pack - 2026-03-19

Read-only operator commands for the fallback apex-host path at `opc@64.181.255.230`, centered on `/etc/nginx/conf.d/lifa-su.com.conf`.

## Set local variables once

```bash
HOST='opc@64.181.255.230'
VHOST='/etc/nginx/conf.d/lifa-su.com.conf'
```

## 1. Inspect the nginx vhost file

```bash
ssh "$HOST" "sudo -n sed -n '1,260p' '$VHOST' || sed -n '1,260p' '$VHOST'"
ssh "$HOST" "sudo -n grep -nE 'server_name|listen|root |alias |index |try_files|proxy_pass|proxy_set_header|return |rewrite ' '$VHOST' || grep -nE 'server_name|listen|root |alias |index |try_files|proxy_pass|proxy_set_header|return |rewrite ' '$VHOST'"
ssh "$HOST" "sudo -n grep -nA25 -B5 -E 'server_name[[:space:]].*lifa-su\\.com' '$VHOST' || grep -nA25 -B5 -E 'server_name[[:space:]].*lifa-su\\.com' '$VHOST'"
```

## 2. Find the apex static root or proxy target

Run both. The first exposes the apex block context. The second resolves named upstreams or proxy targets elsewhere under `/etc/nginx`.

```bash
ssh "$HOST" "sudo -n grep -nE 'server_name[[:space:]].*lifa-su\\.com|root |alias |try_files|proxy_pass|return |rewrite ' '$VHOST' || grep -nE 'server_name[[:space:]].*lifa-su\\.com|root |alias |try_files|proxy_pass|return |rewrite ' '$VHOST'"
ssh "$HOST" "sudo -n grep -RInE 'upstream[[:space:]]|proxy_pass[[:space:]]|server_name[[:space:]].*lifa-su\\.com' /etc/nginx || grep -RInE 'upstream[[:space:]]|proxy_pass[[:space:]]|server_name[[:space:]].*lifa-su\\.com' /etc/nginx"
```

Interpretation:

- If you see `root /path;` or `alias /path;`, treat that as the on-disk apex content path.
- If you see `proxy_pass http://...;` or `proxy_pass https://...;`, that is the immediate apex upstream target.
- If `proxy_pass` points at an upstream name, use the recursive `/etc/nginx` search above to resolve the backing server lines.

## 3. Inspect on-disk `job-toolkit.html` if a static root is found

Set `ROOT` from the `root` or `alias` directive you found above.

```bash
ROOT='/path/from/root-or-alias'
ssh "$HOST" "sudo -n ls -ld '$ROOT' '$ROOT/job-toolkit.html' || ls -ld '$ROOT' '$ROOT/job-toolkit.html'"
ssh "$HOST" "sudo -n stat -c '%n | size=%s | mtime=%y' '$ROOT/job-toolkit.html' || stat '$ROOT/job-toolkit.html'"
ssh "$HOST" "sudo -n sed -n '1,160p' '$ROOT/job-toolkit.html' || sed -n '1,160p' '$ROOT/job-toolkit.html'"
ssh "$HOST" "sudo -n sh -lc 'sha256sum \"$ROOT/job-toolkit.html\"' || sh -lc 'sha256sum \"$ROOT/job-toolkit.html\"'"
```

## 4. Print response and header facts for comparison

These compare the remote host's local nginx response with the public apex response without mutating anything.

```bash
ssh "$HOST" "curl -sSIk -H 'Host: lifa-su.com' http://127.0.0.1/job-toolkit.html | sed -n '1,30p'"
ssh "$HOST" "curl -sSIk https://lifa-su.com/job-toolkit.html | sed -n '1,30p'"
ssh "$HOST" "curl -sS -o /dev/null -w 'loopback_vhost status=%{http_code} type=%{content_type} bytes=%{size_download} ip=%{remote_ip} url=%{url_effective}\n' -H 'Host: lifa-su.com' http://127.0.0.1/job-toolkit.html"
ssh "$HOST" "curl -sS -o /dev/null -w 'public_apex status=%{http_code} type=%{content_type} bytes=%{size_download} ip=%{remote_ip} url=%{url_effective}\n' https://lifa-su.com/job-toolkit.html"
ssh "$HOST" "curl -sS -H 'Host: lifa-su.com' http://127.0.0.1/job-toolkit.html | grep -nE 'AI Job Toolkit|Start with the Job Toolkit|Job Search Toolkit|First paid step|ko-fi|gumroad|canonical' | head -n 20"
```

## 5. Strongest static-root comparison

Run this only after `ROOT` is set. It compares the on-disk file hash with the loopback nginx response hash.

```bash
ROOT='/path/from/root-or-alias'
ssh "$HOST" "sudo -n sh -lc 'printf \"disk  \"; sha256sum \"$ROOT/job-toolkit.html\"; printf \"serve \"; curl -sS -H \"Host: lifa-su.com\" http://127.0.0.1/job-toolkit.html | sha256sum' || sh -lc 'printf \"disk  \"; sha256sum \"$ROOT/job-toolkit.html\"; printf \"serve \"; curl -sS -H \"Host: lifa-su.com\" http://127.0.0.1/job-toolkit.html | sha256sum'"
```

Matching hashes confirm the apex loopback response is serving that exact on-disk `job-toolkit.html`. If the hashes differ, the vhost may be rewriting, proxying, or serving a different root than expected.
