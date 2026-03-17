# GitHub Pages Trigger Diagnosis (2026-03-17)

## Current publishing mode
- GitHub Pages is deployed by GitHub Actions from `main` on `push` via [`.github/workflows/deploy.yml`](/Users/feifei/.openclaw/workspace/lifa-su.github.io/.github/workflows/deploy.yml).
- The workflow uploads the repo root (`path: .`) and Pages config reports `build_type: workflow`, `source: main:/`, `status: built`.
- No Pages custom domain is configured right now: no tracked `CNAME` file in the repo, and `gh api repos/Lifa-su/lifa-su.github.io/pages` returns `cname: null`.

## Most likely stale-site cause
- `lifa-su.github.io` is stale because GitHub Pages only publishes what reaches `origin/main`, and local `main` is currently hundreds of commits ahead of `origin/main` with additional uncommitted page changes.
- GitHub's latest successful Pages deploy is for commit `ff916c4` on `2026-02-23 10:13:33 +0800`; local `HEAD` is `ebf807a` on `2026-03-17 08:08:32 +0800`.
- If a custom domain looks newer than `lifa-su.github.io`, it is probably being served somewhere other than this GitHub Pages config, because Pages currently has no custom domain attached.

## Minimum repair order
1. Confirm the intended publish source: `main` on GitHub, or some other host/branch for the custom domain.
2. Push the intended publish commit(s) to `origin/main` so `.github/workflows/deploy.yml` can run for the latest SHA.
3. If GitHub Pages should own the custom domain, add/restore a root `CNAME`, set the Pages custom domain, then verify the newest Actions run and live `github.io` output match.

## Human confirmation points
- Are the unpublished local commits intentionally being held back, or should they be pushed now?
- Should the custom domain be served by GitHub Pages? Current Pages config says no.
- Is `main` definitely the branch that should trigger production publishing?
