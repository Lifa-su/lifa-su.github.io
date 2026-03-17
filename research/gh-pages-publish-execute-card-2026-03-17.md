# GitHub Pages Publish Execute Card (2026-03-17)

Use this only when you intend to publish the current local `main` state.

## Current facts
- `origin` is `https://github.com/Lifa-su/lifa-su.github.io.git`; default branch is `main`.
- [`.github/workflows/deploy.yml`](/Users/feifei/.openclaw/workspace/lifa-su.github.io/.github/workflows/deploy.yml) deploys Pages on `push` to `main` and on manual dispatch.
- `gh api repos/Lifa-su/lifa-su.github.io/pages` currently returns `build_type: workflow`, `source: main:/`, `html_url: https://lifa-su.github.io/`, `cname: null`.
- Local `main` is ahead of `origin/main` and the working tree is already dirty. Current `HEAD` is `9e9931f116b22ace532b333cd47c30b9a61c7d6b`.
- Repo HTML is authored for `https://lifa-su.com/`, but GitHub Pages is not currently attached to a custom domain.
- Latest successful Pages run is still for `ff916c47ce2b3fc337cb9a02737f774327a38dcb` on `2026-02-23`; `https://lifa-su.github.io/` and `https://lifa-su.com/` are not currently in proven parity.

## Execute
1. Confirm working tree caveats.
   - Run `git status --short --branch`.
   - Stop if you do not intend to publish every current local change on `main`. This repo is already ahead of `origin/main` and has extra modified/untracked files.
2. Decide the push target.
   - Run `git remote -v`, `gh repo view Lifa-su/lifa-su.github.io --json defaultBranchRef,url`, and `gh api repos/Lifa-su/lifa-su.github.io/pages`.
   - Push target is `origin main` only if GitHub Pages should publish from this repo's `main:/`.
   - Stop if production should come from another branch, another repo, or another host.
3. Push.
   - Run `git push origin main`.
   - Stop on any rejection, non-fast-forward, auth failure, or if the pushed SHA is not the intended publish SHA.
4. Check the latest Actions run.
   - Run `HEAD_SHA=$(git rev-parse HEAD)`.
   - Run `gh run list --workflow deploy.yml --limit 1 --json headSha,status,conclusion,url,createdAt`.
   - Pass only when the newest run is for `$HEAD_SHA` and finishes with `conclusion: success`.
   - Stop on `queued`, `in_progress`, missing `$HEAD_SHA`, or any failed run.
5. Verify `github.io`.
   - Run `curl -I -L https://lifa-su.github.io/`.
   - Run `curl -sL https://lifa-su.github.io/ | rg -n "<title>|<link rel=\"canonical\"" -m 2`.
   - Pass only when the live page reflects the just-published state.
   - Stop if `lifa-su.github.io` still looks stale; do not treat the deploy as complete yet.
6. Verify the custom domain.
   - Run `gh api repos/Lifa-su/lifa-su.github.io/pages --jq '.cname'`.
   - Run `curl -I -L https://lifa-su.com/`.
   - Current stop condition: Pages reports `cname: null`, so custom-domain parity is blocked until domain ownership/routing is clarified.
   - Only pass when the custom domain is intentionally served by the same release and matches the `github.io` publish closely enough for operator sign-off.

## Blocked until parity passes
- Do not mark the publish complete.
- Do not assume `lifa-su.com` updated just because the Actions run succeeded.
- Do not announce production parity until both `https://lifa-su.github.io/` and `https://lifa-su.com/` are verified for the intended release.
