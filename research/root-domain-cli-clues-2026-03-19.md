# Root-Domain CLI Clues - 2026-03-19

Scope: local shell/history/notes only. Kept only hits that narrow the apex nginx/static-root path or preserve the exact remote verification flow.

## High-signal hits

1. Raw shell history preserved the remote host, but not the nginx/curl details.
   - `~/.zsh_history:1628` -> `ssh opc@64.181.255.230`
   - No exact shell-history hits survived for `nginx -t`, `restorecon`, `httpd_can_network_connect`, or `curl -H 'Host: lifa-su.com'`; those only showed up in notes/memory.

2. Local memory ties apex ownership to one nginx host and one vhost file.
   - `/Users/feifei/.openclaw/workspace/MEMORY.md:217-231` says `opc@64.181.255.230` is the host, `lifa-su.com` stays on main static content, and the sibling subdomains proxy to Vercel upstreams.
   - `/Users/feifei/.openclaw/workspace/MEMORY.md:229-231` and `/Users/feifei/.openclaw/workspace/memory/2026-03-10.md:89-90` preserve the exact file and SELinux trap:
     - `/etc/nginx/conf.d/lifa-su.com.conf`
     - copied from `/tmp` -> wrong context `user_tmp_t`
     - fix with `restorecon` back to `httpd_config_t`
     - enable `setsebool -P httpd_can_network_connect 1`
     - otherwise `nginx -t` can pass while live traffic still fails with `502` / `Permission denied`
   - The same notes preserve the four sibling upstreams that should appear beside the apex block if this is the real owner:
     - `saas.lifa-su.com` -> `saas-starter-gray-sigma.vercel.app`
     - `seopilot.lifa-su.com` -> `seopilot-sepia.vercel.app`
     - `toolbox.lifa-su.com` -> `ai-toolbox-mu.vercel.app`
     - `tools.lifa-su.com` -> `ai-tools-site-pi.vercel.app`

3. The strongest local first-open rule is already explicit.
   - `research/root-domain-host-first-open-card-2026-03-19.md:22-35` says to open `/etc/nginx/conf.d/lifa-su.com.conf` first.
   - If the apex `server_name lifa-su.com` block uses a static `root`, inspect `$ROOT/job-toolkit.html` first because it is the most stable stale-public marker.
   - Treat `64.181.255.230/nginx` as the real apex owner only if that same config also carries the remembered four subdomain proxy mappings.

4. The exact read-only remote verification flow is preserved locally.
   - `research/apex-remote-host-verification-command-pack-2026-03-19.md:7-66` keeps the concrete operator sequence:
     - set `HOST='opc@64.181.255.230'` and `VHOST='/etc/nginx/conf.d/lifa-su.com.conf'`
     - read and grep the vhost for `server_name`, `root`, `alias`, `try_files`, `proxy_pass`, `return`, `rewrite`
     - if a static root appears, inspect `$ROOT/job-toolkit.html` with `ls`, `stat`, `sed`, and `sha256sum`
     - compare loopback vhost vs public apex with:
       - `curl -sSIk -H 'Host: lifa-su.com' http://127.0.0.1/job-toolkit.html`
       - `curl -sSIk https://lifa-su.com/job-toolkit.html`
     - finish by hashing disk `job-toolkit.html` against the loopback-served body to prove whether nginx is serving that exact file

## Bottom line

Best remaining fallback path is still:

`ssh opc@64.181.255.230` -> open `/etc/nginx/conf.d/lifa-su.com.conf` -> resolve apex `root` or `proxy_pass` -> inspect/hash `$ROOT/job-toolkit.html` if static -> compare loopback `Host: lifa-su.com` response against the public apex response.
