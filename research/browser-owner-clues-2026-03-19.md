# Browser Owner Clues (2026-03-19)

Scope: local browser/app-support/config state outside the repo. Read-only investigation only.

## Strongest findings

- Chrome profile state ties this machine to `feifeicch@gmail.com`.
  Source: `~/Library/Application Support/Google/Chrome/Default/Preferences` (`account_info[0].email`).
  Why it matters: this matches the repo’s same-owner identity cluster and gives a human-readable account key.

- Chrome history shows active Vercel dashboard use on 2026-02-22 through 2026-02-24 under team slug `feifeicch-9588s-projects`.
  High-signal URLs seen in `~/Library/Application Support/Google/Chrome/Default/History`:
  - `https://vercel.com/feifeicch-9588s-projects`
  - `https://vercel.com/feifeicch-9588s-projects/ai-tools-site`
  - `https://vercel.com/feifeicch-9588s-projects/ai-tools-site/settings/domains?source=prod-checklist`
  - `https://vercel.com/feifeicch-9588s-projects/ai-tools-site/deployments`
  - `https://vercel.com/feifeicch-9588s-projects/ai-tools-site/logs`
  - `https://vercel.com/feifeicch-9588s-projects/~/usage/networking-edge-requests`
  Why it matters: this is the clearest browser-local owner/team clue outside the repo, and it exposes a human-readable Vercel team slug.

- Chrome session files independently preserve the same Vercel dashboard routing state: `teamSlug = feifeicch-9588s-projects`, `project = ai-tools-site`, plus `settings/domains`, `deployments`, `logs`, and usage pages.
  Sources: `~/Library/Application Support/Google/Chrome/Default/Sessions/Tabs_13417262645005019` and `Tabs_13416635275141971`.
  Why it matters: this corroborates that the browser was actively inside that Vercel dashboard, not just hitting generic login pages.

- Chrome local storage for `https://vercel.com` includes `vercel:ldTeamFlags:v2` keyed by `feifeicch-9588s-projects`.
  Source: `~/Library/Application Support/Google/Chrome/Default/Local Storage/leveldb/000235.ldb`.
  Why it matters: local browser state again names the same human-readable Vercel team.

- Browser session state exists for Vercel but not for Cloudflare in this pass.
  Sources:
  - Chrome cookies: `.vercel.com|9`, `vercel.com|11`
  - No Chrome history hits for `cloudflare` or `dash.cloudflare.com`
  - No Chrome bookmark hits for `vercel`, `cloudflare`, or `lifa-su`
  - No Safari history hits for `lifa-su.com`, `cloudflare`, `dash.cloudflare.com`, `vercel.com`, the repo Vercel IDs, or `lifa-sugithubio.vercel.app`
  Why it matters: local browser evidence strongly favors Vercel as the active same-owner dashboard surface on this machine; it does not surface a corresponding Cloudflare dashboard owner clue.

## No direct hits for requested opaque IDs

- No browser/app-support hit surfaced the exact strings:
  - `team_euo5HAI3IKvNkNfIpiRbQh94`
  - `prj_6hAojoxpATA9oY9z7ZhDEQRmxgFB`
  - `lifa-sugithubio.vercel.app`
  - `lifa-su.com`
  - `dash.cloudflare.com`

## Bottom line

The highest-value browser-local clue is a human-readable Vercel ownership path: Chrome shows active use of Vercel team `feifeicch-9588s-projects` and project `ai-tools-site`, while the Chrome profile is signed into `feifeicch@gmail.com`. This is stronger for owner attribution than the opaque repo `team_...` ID, and this pass did not surface matching Cloudflare dashboard/account traces.
