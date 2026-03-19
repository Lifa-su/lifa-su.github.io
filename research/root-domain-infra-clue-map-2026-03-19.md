# Root-Domain Infra Clue Map — 2026-03-19

Scope: local repo plus repo-adjacent notes only. Use this specifically when Vercel `settings/domains` shows no `lifa-su.com` row for the current project.

## Best current read

If `ai-tools-site` has no `lifa-su.com` row, the strongest local fallback path is not "redeploy this Vercel project". The strongest local fallback path is:

`GitHub Pages negative control -> Cloudflare zone/rules -> remote host 64.181.255.230 / nginx`

with "other same-owner Vercel project/team/account" still a secondary branch.

## Exact clues

- `research/vercel-domains-local-state-2026-03-19.md:23-52`
  - Cached Vercel project-domains API results for `ai-tools-site` show exactly one row: `ai-tools-site-pi.vercel.app`, `pagination.count: 1`, and no recovered `lifa-su.com` / `www.lifa-su.com`.
  - Why it matters if Vercel has no `lifa-su.com` row: treat the current project as `default-domain only`, not as a proven owner of the root domain.

- `../research/no-domain-row-next-step-card-2026-03-19.md:5-12`
  - Existing operator guidance already says: if `ai-tools-site/settings/domains` has no `lifa-su.com` / `www.lifa-su.com`, search other Vercel projects/teams first, then exit Vercel deep-dive and return to `GitHub Pages -> Cloudflare`.
  - Why it matters: this is the exact local decision rule for the no-row case.

- `.github/workflows/deploy.yml:3-30`
- `research/gh-pages-trigger-diagnosis-2026-03-17.md:4-11`
- `research/custom-domain-parity-fix-card-2026-03-19.md:7-12`
  - Repo root publishes to GitHub Pages from `main`, but local notes say Pages reports `cname: null` and there is no tracked root `CNAME`.
  - Why it matters: `lifa-su.github.io` is a fresh control surface, but GitHub Pages is not locally proven to be the current `lifa-su.com` owner.

- `../research/custom-domain-manual-checks-2026-03-18.md:3-12`
- `../memory/2026-03-19.md:41-44`
- `../memory/2026-03-19.md:67-73`
- `../memory/2026-03-19.md:171-176`
  - Local checks recorded `lifa-su.com` returning `server: cloudflare`, `cf-cache-status: DYNAMIC`, and stale `last-modified: 2026-03-08`, while `lifa-su.github.io` was newer.
  - Why it matters: if the current Vercel project has no domain row, Cloudflare is the next live routing layer to inspect, not repo content.

- `../MEMORY.md:216-231`
- `../memory/2026-03-10.md:81-90`
- `../memory/2026-02-24.md:6-11`
- `../memory/2026-02-24.md:44-51`
  - Adjacent memory logs name a concrete non-Vercel host: `opc@64.181.255.230`, with remote `nginx`, `/etc/nginx/conf.d/lifa-su.com.conf`, SELinux fixes for nginx proxying, and the note that apex `lifa-su.com` continues serving main static content while subdomains proxy to Vercel projects.
  - Why it matters: this is the strongest exact clue that root-domain routing may terminate on a VPS/nginx path outside the current Vercel project.

- `.vercel/project.json:1`
- `ai-cover-letter/.vercel/project.json:1`
- `.gitignore:1`
- `_gen.py:17-26`
- `../research/kofi-redirect-check.md:7-18`
- `job-toolkit.html:15,17,478-479`
- `job-search-system.html:15,19,691-692`
  - The repo still carries real Vercel fingerprints: ignored local `.vercel` links, shared Vercel team ID, legacy default domain `lifa-sugithubio.vercel.app`, Ko-fi redirects that used to target that domain, and widespread `/_vercel/insights` scripts.
  - Why it matters: if Cloudflare is not pointing at the current Vercel project, it may still be pointing at another same-owner Vercel project/account or an older Vercel-origin chain.

- `research/browser-owner-clues-2026-03-19.md:11-27`
- `research/vercel-dashboard-paths-2026-03-19.md:12-37`
- `research/parity-owner-hunt-2026-03-19.md:29-67`
- `../research/account-identifier-shortlist-2026-03-19.md:3-23`
- `../research/non-vercel-fallback-card-2026-03-19.md:3-15`
  - Human-readable owner/search keys already on disk: `feifeicch-9588s-projects`, `team_euo5HAI3IKvNkNfIpiRbQh94`, `prj_6hAojoxpATA9oY9z7ZhDEQRmxgFB`, `lifa-su.github.io`, `ai-cover-letter`, `lifa-sugithubio.vercel.app`, `feifeicch@gmail.com`, `nicefei@outlook.com`, `feidev`.
  - Why it matters: if one Vercel view misses the root domain, these are the exact keys for "other Vercel team/account" or for confirming the fallback shift to Cloudflare plus remote-host fingerprinting.

## Practical hold line

If Vercel shows no `lifa-su.com` row, keep one active slot on:

1. GitHub Pages `Custom domain` as negative control
2. Cloudflare `DNS -> Rules/Redirects -> Workers/Origin Rules -> Cache`
3. The `64.181.255.230` / `nginx` path as the most concrete non-Vercel fallback

Do not spend that slot on redeploying the current Vercel project first.
