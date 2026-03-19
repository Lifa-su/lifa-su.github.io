# Parity Fallback Operator Pack - 2026-03-19

If Vercel has no `lifa-su.com` row, keep one active slot on `GitHub Pages -> Cloudflare -> remote host`.

Two filenames named in the current notes are not present under `research/`: `cloudflare-first-open-card-2026-03-19.md` and `github-pages-first-open-card-2026-03-19.md`. Use the exact first-open target below for those lanes.

| Lane | Use when | Exact first page/file | Next card |
| --- | --- | --- | --- |
| GitHub Pages branch | Use first as the negative control, or if DNS/headers suggest Pages. | GitHub repo `Settings -> Pages` for `Lifa-su/lifa-su.github.io` | `research/custom-domain-parity-fix-card-2026-03-19.md` |
| Cloudflare branch | Use when `lifa-su.com` is Cloudflare-fronted, Pages still shows `cname: null`, or Vercel has no root-domain row. | Cloudflare zone `lifa-su.com` -> `DNS` | `research/apex-remote-host-verification-command-pack-2026-03-19.md` if records/rules point to `64.181.255.230`; otherwise `research/custom-domain-parity-fix-card-2026-03-19.md` |
| `research/root-domain-host-first-open-card-2026-03-19.md` | Use when the fallback path has already narrowed to the remote nginx host. | `/etc/nginx/conf.d/lifa-su.com.conf` on `opc@64.181.255.230` | `research/apex-remote-host-verification-command-pack-2026-03-19.md` |
| `research/apex-remote-host-verification-command-pack-2026-03-19.md` | Use when you need read-only proof of what the apex host is actually serving. | `/etc/nginx/conf.d/lifa-su.com.conf` first; then `job-toolkit.html` under the discovered `root` or `alias` if the vhost is static | `research/custom-domain-parity-fix-card-2026-03-19.md` |
