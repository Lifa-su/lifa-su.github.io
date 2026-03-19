# Root-Domain Host First-Open Card — 2026-03-19

## Exact host/path clues

- Local shell history preserves the SSH target: `opc@64.181.255.230`. (`~/.zsh_history:1628`)
- Local memory repeatedly says apex `lifa-su.com` stayed on main static content while subdomains were moved back to project-specific Vercel upstreams on that same remote nginx host. (`../MEMORY.md:216-231`, `../memory/2026-03-10.md:81-95`)
- The exact nginx vhost file named in multiple local notes is `/etc/nginx/conf.d/lifa-su.com.conf`. (`../MEMORY.md:229`, `../memory/2026-03-10.md:89`, `research/root-domain-infra-clue-map-2026-03-19.md:36-41`)
- The recorded subdomain upstreams on that host are:
  - `saas.lifa-su.com` -> `saas-starter-gray-sigma.vercel.app`
  - `seopilot.lifa-su.com` -> `seopilot-sepia.vercel.app`
  - `toolbox.lifa-su.com` -> `ai-toolbox-mu.vercel.app`
  - `tools.lifa-su.com` -> `ai-tools-site-pi.vercel.app`
- The SELinux-specific trap is also tied to this exact nginx file:
  - copied from `/tmp` -> wrong context `user_tmp_t`
  - must restore to `httpd_config_t`
  - must enable `setsebool -P httpd_can_network_connect 1`
  - otherwise nginx can pass `nginx -t` but still fail live with `502` / `Permission denied while connecting to upstream` (`../MEMORY.md:228-231`, `../memory/2026-03-10.md:88-90`)
- Current local fallback ranking still treats `64.181.255.230 / nginx` as the strongest non-Vercel lane if the current Vercel project has no `lifa-su.com` domain row. (`../memory/2026-03-19.md:288-297`)

## First remote open

Open `/etc/nginx/conf.d/lifa-su.com.conf` first.

Reason: local artifacts preserve the host and exact vhost filename, but they do not preserve the apex document-root path. This file is the fastest place to recover whether apex `lifa-su.com` is served by a static `root`, a `try_files` layout, or some proxy/redirect chain separate from the subdomains.

If that apex block uses a static `root`, the first content page to inspect under that root should be `job-toolkit.html`, because local parity notes already show `https://lifa-su.com/job-toolkit.html` as a stale live marker while `https://lifa-su.github.io/job-toolkit.html` is newer. (`../research/custom-domain-manual-checks-2026-03-18.md:3-15`)

## Fact That Confirms Real Ownership

This path is the real live owner/origin if `/etc/nginx/conf.d/lifa-su.com.conf` contains the `server_name lifa-su.com` apex block and either:

- points that apex block at a static root whose on-disk blocker page such as `job-toolkit.html` matches the stale copy still served at `lifa-su.com`, or
- sits alongside the same four recorded subdomain proxy mappings to the known Vercel upstreams above.

The strongest confirmation is both at once: one vhost file on `64.181.255.230` owns apex `lifa-su.com` static content and the sibling subdomains proxy to those exact Vercel targets.
