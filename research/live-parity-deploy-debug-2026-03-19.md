# Live Parity Deploy Debug (2026-03-19)

## Call
- Treat this as a deploy/custom-domain issue first, not a repo-content issue.
- No repo-side routing change was applied in this pass because the live owner of `lifa-su.com` is still unconfirmed.

## Repo facts
- Current local target SHA is `191e374` (`2026-03-19 04:31:58 +0800`), which updates exactly:
  - `job-search-system.html`
  - `pricing.html`
  - `job-toolkit.html`
- Local `main` is `ahead 1` of tracked `origin/main`, so `191e374` is not yet proven live anywhere from this workspace state.
- [`.github/workflows/deploy.yml`](/Users/feifei/.openclaw/workspace/lifa-su.github.io/.github/workflows/deploy.yml) publishes the repo root to GitHub Pages on `push` to `main` and on manual dispatch.
- There is no tracked `CNAME` file in this repo, and there is no repo history showing a tracked `CNAME`.
- Existing repo notes from `2026-03-17` say GitHub Pages reported `cname: null` and that `lifa-su.github.io` was ahead of `lifa-su.com` for these job-line pages.

## Current signal
- The strongest current repo-side evidence still points away from content drift:
  - the three target files are present locally at the intended newer copy
  - the Pages workflow would publish a root `CNAME` if one existed, but none is tracked
  - many pages include Vercel analytics script tags (`/_vercel/insights/...` and `/_vercel/speed-insights/...`)
- Inference: `lifa-su.com` is likely being served by something other than the currently documented GitHub Pages custom-domain path, or by a proxy/CDN layer in front of it.
- Existing live-gap notes already recorded `lifa-su.com` as stale for:
  - `job-toolkit.html`
  - `pricing.html`
  - `job-search-system.html`
- `job-toolkit.html` is still the best confirmed example of the split and should stay the first live check.

## Why no repo-side fix was applied
- Adding a root `CNAME` now would be speculative.
- If GitHub Pages is not the real owner of `lifa-su.com`, a `CNAME` commit does not fix the stale custom domain and may send the operator down the wrong path.
- The safe move is to confirm the live serving path first, then make the smallest host-specific fix.

## Exact next checks
1. Confirm the intended publish SHA.
   - `git rev-parse HEAD`
   - Target should be `191e374eb2fb4f49f91f616f59e0bb3768fd3d48` unless you intentionally want to hold it back.
2. If `191e374` should publish, push it to GitHub.
   - `git push origin main`
3. Verify GitHub Pages for that exact SHA.
   - `gh run list --workflow deploy.yml --limit 3 --json headSha,status,conclusion,createdAt,url`
   - `gh api repos/Lifa-su/lifa-su.github.io/pages`
   - Check whether the newest successful Pages run is for `191e374`.
4. Re-check the GitHub Pages surface directly.
   - `curl -I -L https://lifa-su.github.io/job-toolkit.html`
   - `curl -sL https://lifa-su.github.io/job-toolkit.html | rg -n "<title>|hero-badge|Start with the Job Toolkit|first paid step" -m 6`
   - Repeat for `pricing.html` and `job-search-system.html`.
5. Identify what actually serves `lifa-su.com`.
   - `dig +short lifa-su.com`
   - `dig +short www.lifa-su.com`
   - `dig CNAME www.lifa-su.com`
   - `curl -I -L https://lifa-su.com/job-toolkit.html`
   - `curl -I -L https://lifa-su.com/pricing.html`
   - `curl -I -L https://lifa-su.com/job-search-system.html`
   - Read headers for clues such as `server`, `x-vercel-*`, `cf-cache-status`, `age`, `via`, `x-cache`, and `last-modified`.
6. If the custom domain is on Vercel or another external host, fix that host instead of the repo first.
   - Check which project owns `lifa-su.com`
   - Check which repo/branch/SHA it last deployed
   - Trigger a redeploy of the correct commit
   - Purge cache if a CDN layer is holding older HTML
7. Only if GitHub Pages is confirmed as the intended custom-domain owner:
   - add a root `CNAME` with `lifa-su.com`
   - set the Pages custom domain in GitHub
   - re-verify both `https://lifa-su.github.io/` and `https://lifa-su.com/`

## Recommended ship order
1. Publish the intended repo SHA to `origin/main` if `191e374` is meant to be live now.
2. Verify `lifa-su.github.io` for the three target pages on that SHA.
3. Identify the real `lifa-su.com` serving path from DNS and response headers.
4. Fix the real owner of `lifa-su.com`:
   - external host/CDN redeploy or purge if it is not GitHub Pages
   - `CNAME` + Pages custom-domain setup only if GitHub Pages is confirmed to own it
5. Re-check `job-toolkit.html` first, then `pricing.html`, then `job-search-system.html`.
6. Only mark parity complete after both domains show the same intended copy.
