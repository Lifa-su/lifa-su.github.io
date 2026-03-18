# Parity Owner Hunt (2026-03-19)

## Strongest clues found
- Git ownership is unusually clean: this repo has one visible author across all history checked, `LiFa <feifeicch@gmail.com>`, with `341` commits and an initial commit on `2026-02-23`.
- The public site metadata points back to the same identity cluster:
  - `contact.html`, `privacy.html`, `terms.html`, and `showcase/index.html` use `feifeicch@gmail.com`
  - `about.html` and `privacy-policy.html` also expose `nicefei@outlook.com`
  - many pages link to `https://github.com/Lifa-su`
  - many pages link to `https://ko-fi.com/feidev`
  - `index.html` still contains legacy Gumroad config for `https://feifeicch.gumroad.com/`
- Local Vercel linkage exists and looks intentional, not random:
  - root [`.vercel/project.json`](/Users/feifei/.openclaw/workspace/lifa-su.github.io/.vercel/project.json) links this checkout to Vercel project `lifa-su.github.io` with `projectId` `prj_6hAojoxpATA9oY9z7ZhDEQRmxgFB`
  - [ai-cover-letter/.vercel/project.json](/Users/feifei/.openclaw/workspace/lifa-su.github.io/ai-cover-letter/.vercel/project.json) links a second project, `ai-cover-letter`
  - both use the same Vercel `orgId`: `team_euo5HAI3IKvNkNfIpiRbQh94`
  - both local `.vercel` links were written on `2026-02-23`, the same day this repo started
- The repo still contains a legacy Vercel default-domain clue: [`_gen.py`](/Users/feifei/.openclaw/workspace/lifa-su.github.io/_gen.py) references `https://lifa-sugithubio.vercel.app/...`
- Existing repo research already shows GitHub Pages is current while the custom domain is not:
  - GitHub Pages notes say `cname: null`
  - `lifa-su.github.io` is current
  - `lifa-su.com` is stale and Cloudflare-fronted
- The stale live `job-toolkit.html` strings match old repo content authored by the same repo owner:
  - exact stale markers `AI Job Toolkit — Get Interview-Ready Faster` and `Job Search Toolkit • One-Time Purchase` appear in historical `job-toolkit.html` states such as commits `fd07322` (`2026-03-08`) and `cd1dd43` (`2026-03-08`)
  - that makes a same-owner stale deployment much more likely than an unrelated third-party site
- Read-only Vercel CLI checks could not identify the currently logged-in account:
  - `vercel whoami` failed with `SecItemCopyMatching failed -50`
  - `vercel teams ls` failed with the same keychain error
  - so I could confirm local project linkage, but not map `team_euo5HAI3IKvNkNfIpiRbQh94` to a visible team name from this shell

## Most likely owner/origin hypotheses
1. Same operator as the GitHub repo and site brand controls `lifa-su.com`, and the stale custom domain is coming from an older Vercel-origin deployment behind Cloudflare.
   - Strongest support: same-author repo history, same contact emails, same GitHub handle, same Ko-fi handle, same Vercel team ID across local links, legacy `lifa-sugithubio.vercel.app`, and stale live strings matching old repo commits.
2. Same operator controls the domain, but the active origin is in a different Vercel team/account than the one the user recently checked.
   - Strongest support: local `.vercel` uses a team-scoped `orgId` (`team_...`), the current visible Vercel account reportedly did not show the domain/project, and the CLI on this machine could not resolve account/team identity because local auth is broken.
3. Same operator controls the domain, but Cloudflare is still routing some paths to an old non-Pages origin or serving frozen HTML from an old deploy.
   - Strongest support: GitHub Pages has no custom domain configured (`cname: null`), `github.io` is current, and the stale domain appears route-specific in prior notes.
4. Unrelated third-party ownership is possible but currently least likely.
   - Evidence against: the stale content still looks like this repo's own earlier copy and branding, not foreign content.

## Exact next human checks
1. In Cloudflare dashboards you control, search for zone `lifa-su.com`.
   - Confirm which account owns the zone.
   - Open `DNS` and record the exact `A`, `AAAA`, and `CNAME` targets for `@` and `www`.
   - Check whether records are proxied.
   - Check `Rules`, `Workers`, `Pages`, `Origin Rules`, and redirects for `job-toolkit.html`, `pricing.html`, and `job-search-system.html`.
   - Check cache/purge history around `2026-03-08` through `2026-03-19`.
2. In Vercel, switch through every personal account and every team you can access.
   - Look specifically for team ID `team_euo5HAI3IKvNkNfIpiRbQh94`.
   - Look for projects `lifa-su.github.io` and `ai-cover-letter`.
   - Look for project ID `prj_6hAojoxpATA9oY9z7ZhDEQRmxgFB`.
   - Check domain assignments for `lifa-su.com` and `www.lifa-su.com`.
   - Check whether any project has default/alias domains related to `lifa-sugithubio.vercel.app`.
   - Inspect deploy history for deploys around `2026-03-08`.
3. In GitHub, keep the Pages check as a negative control.
   - Confirm Pages still reports `cname: null`.
   - Confirm there is still no tracked root `CNAME`.
   - Do not treat GitHub Pages as the custom-domain owner unless that changes.
4. In account inventory, search by the identity aliases already present in the repo.
   - `feifeicch@gmail.com`
   - `nicefei@outlook.com`
   - GitHub `Lifa-su`
   - Ko-fi `feidev`
   - Gumroad `feifeicch`
5. If Vercel is confirmed as the old origin, inspect ownership before changing anything.
   - Which team/account owns the project
   - Which repo/branch/commit last deployed the stale pages
   - Whether `lifa-su.com` is attached directly in Vercel or only through Cloudflare
6. If Cloudflare points somewhere other than Vercel, inspect that origin next.
   - The current evidence says “same operator, wrong origin or stale deploy,” not “GitHub Pages drift.”

## Bottom line
The most likely real-world answer is not “someone else owns `lifa-su.com`.” The strongest local evidence points to the same Feifei / LiFa / FeiDev identity cluster owning the brand, repo, and at least one historical Vercel setup, with `lifa-su.com` most likely still routed through an older Cloudflare-to-Vercel path or a parallel account/team that the currently checked Vercel login does not expose.
