# Custom Domain Parity Fix Card (2026-03-19)

## Current confirmed facts
- `git rev-parse HEAD` is `c7a0ed4e33544a75062a8d04509393e14b0b1a4d`, and local `main` matches `origin/main`.
- User-confirmed live state for `2026-03-19`:
  - GitHub Pages workflow is green for `c7a0ed4`.
  - Pages API reports `status: built`, `source: main:/`, `cname: null`.
  - `https://lifa-su.github.io/` serves the newer job-line copy.
  - `https://lifa-su.com/` is still the custom-domain surface of concern and has been seen serving older Cloudflare-fronted content.
- [`.github/workflows/deploy.yml`](/Users/feifei/.openclaw/workspace/lifa-su.github.io/.github/workflows/deploy.yml) publishes the repo root to GitHub Pages on `push` to `main` and on manual dispatch.
- There is no tracked `CNAME` file in this repo, and `git log --all -- CNAME` is empty.
- This checkout has an ignored local [`.vercel/project.json`](/Users/feifei/.openclaw/workspace/lifa-su.github.io/.vercel/project.json) linked to Vercel project `lifa-su.github.io`. A second ignored Vercel link exists at [ai-cover-letter/.vercel/project.json](/Users/feifei/.openclaw/workspace/lifa-su.github.io/ai-cover-letter/.vercel/project.json).
- Many published pages include `/_vercel/insights/...` and `/_vercel/speed-insights/...` script tags. That is evidence of Vercel integration, not proof that Vercel currently owns `lifa-su.com`.
- Existing repo notes already recorded a real split on `job-toolkit.html`, `pricing.html`, and `job-search-system.html`; one prior `lifa-su.com/job-toolkit.html` header read showed `last-modified: Sun, 08 Mar 2026 14:44:25 GMT`.
- Safe local live checks from this sandbox are blocked by DNS resolution failure, so the remote commands below must be run from a network-enabled operator shell.
- Lightweight remote fetch in this pass confirmed `https://lifa-su.com/job-toolkit.html` still returns older copy (`AI Job Toolkit — Get Interview-Ready Faster`, `Job Search Toolkit • One-Time Purchase`) rather than the current repo markers in [job-toolkit.html](/Users/feifei/.openclaw/workspace/lifa-su.github.io/job-toolkit.html).

## Most likely root-cause candidates
1. `lifa-su.com` is routed through Cloudflare to a non-Pages origin, most likely a Vercel deployment that is older than current GitHub Pages.
   - Strongest evidence: Pages still has `cname: null`, this repo is locally linked to a Vercel project named `lifa-su.github.io`, and the stale/fresh split is on the custom domain rather than on `github.io`.
2. Cloudflare is caching stale HTML for specific legacy routes even if some other routes now look newer.
   - Strongest evidence: the stale signal is route-specific, and a prior header read already pointed at a March 8 artifact date for `job-toolkit.html`.
3. Cloudflare is sending different paths to different origins.
   - Strongest evidence: the repo and `github.io` are aligned while the custom domain still shows older page-level artifacts.
4. GitHub Pages custom-domain misconfiguration is possible but less likely.
   - Evidence against it: no tracked `CNAME`, Pages API still says `cname: null`, and GitHub Pages itself is already green/current.
5. A repo-content or Pages-build problem is least likely.
   - Evidence against it: the current markers exist locally in [job-toolkit.html](/Users/feifei/.openclaw/workspace/lifa-su.github.io/job-toolkit.html), [pricing.html](/Users/feifei/.openclaw/workspace/lifa-su.github.io/pricing.html), and [job-search-system.html](/Users/feifei/.openclaw/workspace/lifa-su.github.io/job-search-system.html), and the user has already confirmed fresh `github.io` output.

## Exact next checks
1. Freeze the current repo and Pages identity.
   - `git rev-parse HEAD`
   - `git status --short --branch`
   - `gh api repos/Lifa-su/lifa-su.github.io/pages`
   - `gh run list --workflow deploy.yml --limit 5 --json headSha,status,conclusion,createdAt,url`
2. Re-confirm the fresh GitHub Pages copy on the three blocker pages, not just `/`.
   - `curl -sL https://lifa-su.github.io/job-toolkit.html | rg -n "First paid step in the job-search path|No subscription\\. Job Toolkit is the \\$29 first paid step|Free tools first, pricing later" -m 6`
   - `curl -sL https://lifa-su.github.io/pricing.html | rg -n "Pricing is the compare page, not the entry page|ATS-safe, human-readable resume \\+ cover letter \\+ interview system|Anti-robotic cover letters and anti-freeze interview prep" -m 6`
   - `curl -sL https://lifa-su.github.io/job-search-system.html | rg -n "Competition is heavier, AI-assisted screening is rising|The first paid step when you need one same-candidate system|Free tools first, Job Toolkit as the first paid step, human review only if needed" -m 6`
3. Fingerprint the custom domain route by route.
   - `curl -I -L https://lifa-su.com/job-toolkit.html`
   - `curl -I -L https://lifa-su.com/pricing.html`
   - `curl -I -L https://lifa-su.com/job-search-system.html`
   - `curl -sL https://lifa-su.com/job-toolkit.html | rg -n "AI Job Toolkit|Get Interview-Ready Faster|Job Search Toolkit • One-Time Purchase|First paid step in the job-search path" -m 8`
   - Read `server`, `cf-cache-status`, `age`, `last-modified`, `etag`, `x-vercel-*`, `via`, and `x-cache`.
4. Confirm what DNS says the custom domain actually points at.
   - `dig +short lifa-su.com`
   - `dig +short www.lifa-su.com`
   - `dig CNAME www.lifa-su.com`
   - `dig +trace lifa-su.com`
5. If DNS or headers point to Vercel, inspect the likely owner without changing anything.
   - `cat .vercel/project.json`
   - `vercel project ls`
   - `vercel domains inspect lifa-su.com`
   - `vercel ls lifa-su.github.io`
6. If DNS or headers instead point to GitHub Pages, verify the custom-domain gap before any fix.
   - `gh api repos/Lifa-su/lifa-su.github.io/pages --jq '{status,source,cname,html_url}'`
   - Compare the returned `cname` and DNS target before changing anything.
7. Pick the fix path only after step 5 or 6 proves ownership.
   - Vercel/external host path: redeploy the correct project/commit, then purge Cloudflare only if stale HTML remains.
   - GitHub Pages path: add root `CNAME`, set the Pages custom domain, let Pages rebuild, then re-check the same three pages.

## What not to do yet
- Do not add or commit a root `CNAME` yet.
- Do not purge Cloudflare yet.
- Do not redeploy Vercel yet unless DNS/headers prove Vercel is the serving origin for `lifa-su.com`.
- Do not use `https://lifa-su.com/` alone as the parity check; use `job-toolkit.html`, `pricing.html`, and `job-search-system.html`.
- Do not commit [`.vercel/project.json`](/Users/feifei/.openclaw/workspace/lifa-su.github.io/.vercel/project.json) or other ignored `.vercel` files.
- Do not touch unrelated untracked files in this worktree for this investigation pass.
