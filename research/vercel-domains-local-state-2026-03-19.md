# Vercel Domains Local State (2026-03-19)

Scope: local browser/app-support/cache only. Read-only investigation.

## Exact findings

- Chrome history shows a direct visit to the Vercel domains page on 2026-02-23 15:57:32 local time:
  `https://vercel.com/feifeicch-9588s-projects/ai-tools-site/settings/domains?source=prod-checklist`
  Source: `~/Library/Application Support/Google/Chrome/Default/History`

- Chrome session state preserves the same route family and page tree for team slug `feifeicch-9588s-projects`, project `ai-tools-site`, and `settings/domains`, including `__PAGE__?{"source":"prod-checklist"}` and `catchAll = settings/domains`.
  Sources:
  `~/Library/Application Support/Google/Chrome/Default/Sessions/Tabs_13417262645005019`
  `~/Library/Application Support/Google/Chrome/Default/Sessions/Tabs_13416635275141971`

- Chrome disk cache contains the `settings/domains` RSC page response. A decompressed cache slice shows:
  - `x-matched-path:/[teamSlug]/[project]/settings/domains.rsc`
  - `NewProjectDomainsPage`
  - `domainsTemporaryVariant:true`
  - route tree entries for `feifeicch-9588s-projects` and `ai-tools-site`
  Source: `~/Library/Caches/Google/Chrome/Default/Cache/Cache_Data/3684198326b6e10a_0`

- Strongest direct domain-list clue: multiple cached Vercel API responses for the project domains endpoint all return exactly one domain row:
  - `name`: `ai-tools-site-pi.vercel.app`
  - `apexName`: `vercel.app`
  - `redirect`: `null`
  - `verified`: `true`
  - `pagination.count`: `1`

- Example cached API hits with the same single-row result:
  - `~/Library/Caches/Google/Chrome/Default/Cache/Cache_Data/e3886e555b7c94c1_0`
    Date: `Mon, 23 Feb 2026 07:57:44 GMT`
    URL: `https://vercel.com/api/v9/projects/ai-tools-site/domains?limit=100&redirects=false&teamId=feifeicch-9588s-projects`
  - `~/Library/Caches/Google/Chrome/Default/Cache/Cache_Data/bdaa1fdc078f6eb6_0`
    Date: `Mon, 23 Feb 2026 07:58:51 GMT`
    URL: `https://vercel.com/api/v9/projects/ai-tools-site/domains?limit=25&order=ASC&production=true&redirects=false&teamId=feifeicch-9588s-projects&verified=true`
  - `~/Library/Caches/Google/Chrome/Default/Cache/Cache_Data/6de9ce5313a1d39e_0`
    Date: `Mon, 23 Feb 2026 07:58:51 GMT`
    URL: `https://vercel.com/api/v9/projects/prj_LvsqOZ7Zz7EUSmtGOFeIe7NYoWZT/domains?limit=13&order=ASC&production=true&redirects=false&teamId=team_euo5HAI3IKvNkNfIpiRbQh94&verified=true`

- No cached exact hits were found for:
  - `lifa-su.com`
  - `www.lifa-su.com`
  - `Domain is assigned`
  - `Invalid Configuration`
  - `Redirects to`

- `Production` does appear locally, but only as query params such as `production=true` and unrelated cached config/flag text, not as a recovered domains-table status badge.

## Bottom line

Inference: the local Chrome cache shows that when Vercel domains data for `ai-tools-site` was cached on 2026-02-22 through 2026-02-23, the recovered project-domains API responses contained only the default domain `ai-tools-site-pi.vercel.app`. This pass did not recover any cached custom-domain row for `lifa-su.com` or `www.lifa-su.com`.
