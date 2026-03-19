# Vercel Dashboard Paths (2026-03-19)

Scope: local browser/app-support evidence only. Read-only investigation.

## Exact high-signal URLs found

Source files:
- `~/Library/Application Support/Google/Chrome/Default/History`
- `~/Library/Application Support/Google/Chrome/Default/Sessions/Tabs_13416635275141971`
- `~/Library/Application Support/Google/Chrome/Default/Sessions/Tabs_13417262645005019`

Observed exact routes under team slug `feifeicch-9588s-projects` and project `ai-tools-site`:

- `https://vercel.com/feifeicch-9588s-projects`
  Why it matters: team root. This is the cleanest human-readable owner/team anchor before drilling into project-level checks.

- `https://vercel.com/feifeicch-9588s-projects/ai-tools-site`
  Why it matters: project root. This confirms the exact project slug tied to the team slug.

- `https://vercel.com/feifeicch-9588s-projects/ai-tools-site/settings/domains?source=prod-checklist`
  Why it matters: domains page. This is the first page to open for the parity blocker because the blocker is custom-domain ownership/routing for `lifa-su.com` and `www.lifa-su.com`.

- `https://vercel.com/feifeicch-9588s-projects/ai-tools-site/deployments`
  Why it matters: deployments list. Use this next to check whether the active deploy for the project is stale, which branch/commit was shipped, and whether a redeploy is needed.

- `https://vercel.com/feifeicch-9588s-projects/ai-tools-site/logs`
  Why it matters: project logs. Use this after deployments if the domain is attached but the served output is still wrong; it can expose routing or runtime errors behind the stale custom-domain surface.

- `https://vercel.com/feifeicch-9588s-projects/~/usage/networking-edge-requests`
- `https://vercel.com/feifeicch-9588s-projects/~/usage/networking-edge-requests?view=Count`
  Why they matter: team usage pages. These are useful lower-priority corroboration that this team dashboard was actively used, and can help confirm whether traffic is still hitting Vercel's edge after the domain/project attachment is known.

## Recommended first page

Open `https://vercel.com/feifeicch-9588s-projects/ai-tools-site/settings/domains?source=prod-checklist` first.

Reason: the current parity blocker is not repo copy drift on `github.io`; it is whether `lifa-su.com` is attached and routed through the expected Vercel project. The domains page answers that faster than deployments, logs, or usage.

## Corroboration

- Chrome history shows direct visits to these routes on 2026-02-23 and 2026-02-24.
- Chrome session files preserve the same route family and embed `teamSlug = feifeicch-9588s-projects` plus project slug `ai-tools-site`, which reduces the chance that the history rows were generic redirects or login noise.
