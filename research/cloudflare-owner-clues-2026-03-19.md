# Cloudflare Owner Clues (2026-03-19)

Scope: local config, shell history, and repo filesystem clues only. Read-only investigation; no infra changes.

## Strongest findings

- No repo-local Cloudflare/Wrangler deployment config surfaced: no `wrangler.toml`, `wrangler.json`, `wrangler.jsonc`, `.wrangler`, `.cloudflared`, or tracked `CNAME` was found under this checkout.
  Why it matters: nothing in the repo directly names a Cloudflare account, Pages/Workers project, or GitHub Pages custom-domain binding for `lifa-su.com`.

- No local Wrangler ownership state surfaced from common machine paths, and `wrangler` is not on `PATH`.
  Why it matters: this machine did not expose a Cloudflare account email, account name, or zone through Wrangler config/auth state.

- `~/.zsh_history:1297-1299` shows `cloudflared tunnel list` plus `brew install nginx cloudflared`, but the surrounding flow is unrelated tunnel work and contains no `lifa-su.com`, zone name, or account/email identifier.
  Why it matters: Cloudflare tooling has been used on this machine, but not in a way that attributes `lifa-su.com`.

- Root `.vercel/project.json` links this checkout to Vercel project `lifa-su.github.io`, project ID `prj_6hAojoxpATA9oY9z7ZhDEQRmxgFB`, org/team ID `team_euo5HAI3IKvNkNfIpiRbQh94`. `ai-cover-letter/.vercel/project.json` points to the same Vercel org/team.
  Why it matters: if Cloudflare is proxying stale HTML for `lifa-su.com`, this is the strongest local origin-owner clue.

- `_gen.py` still carries author `Lifa Su` and legacy Vercel default-domain URLs under `https://lifa-sugithubio.vercel.app/...`, and the repo has widespread `/_vercel/insights` and `/_vercel/speed-insights` script tags.
  Why it matters: the codebase still has direct Vercel-hosting fingerprints tied to the same site/owner cluster.

- Same-owner identity cluster is consistent across repo and git state:
  - GitHub owner: `Lifa-su`
  - git identity: `LiFa <feifeicch@gmail.com>`
  - repo/site identities: `Lifa Su`, `FeiDev`
  - site emails: `feifeicch@gmail.com`, `nicefei@outlook.com`
  - commerce handles: `feidev`, `feifeicch`
  Why it matters: these are the strongest lookup keys to search inside Cloudflare dashboards for the owning account or zone.

## Best lookup keys

- zone/domain: `lifa-su.com`
- GitHub owner: `Lifa-su`
- emails: `feifeicch@gmail.com`, `nicefei@outlook.com`
- handles: `feidev`, `feifeicch`
- Vercel project: `lifa-su.github.io`
- Vercel IDs: `team_euo5HAI3IKvNkNfIpiRbQh94`, `prj_6hAojoxpATA9oY9z7ZhDEQRmxgFB`

## Bottom line

No local Cloudflare/Wrangler account name, email, or zone identifier for `lifa-su.com` surfaced in this pass. The strongest local clue remains a same-owner identity cluster plus explicit Vercel linkage, which keeps "Cloudflare in front of an older Vercel origin owned by the same operator" as the best local hypothesis.
