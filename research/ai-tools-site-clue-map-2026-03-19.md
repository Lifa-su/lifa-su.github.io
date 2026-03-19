# AI Tools Site Clue Map (2026-03-19)

Scope: repo plus adjacent local workspace notes only. Read-only investigation; no live dashboard or network verification in this pass.

## Exact local references found

- `research/browser-owner-clues-2026-03-19.md:11-27`
  Exact refs: team slug `feifeicch-9588s-projects`; project `ai-tools-site`; dashboard paths for `settings/domains`, `deployments`, `logs`; local storage key `vercel:ldTeamFlags:v2`.
  Why it matters for the `lifa-su.com` parity blocker: this is the strongest human-readable owner path now on disk. If `lifa-su.com` is attached there, the blocker is on the Vercel custom-domain/deploy chain, not on repo copy drift alone.

- `research/vercel-dashboard-paths-2026-03-19.md:12-37`
  Exact refs: `https://vercel.com/feifeicch-9588s-projects/ai-tools-site/settings/domains?source=prod-checklist`, `/deployments`, `/logs`.
  Why it matters for the `lifa-su.com` parity blocker: this already narrows the operator path to a concrete dashboard drill for `lifa-su.com` and `www.lifa-su.com`.

- `.vercel/project.json:1`
  Exact refs: `projectId` `prj_6hAojoxpATA9oY9z7ZhDEQRmxgFB`, `orgId` `team_euo5HAI3IKvNkNfIpiRbQh94`, `projectName` `lifa-su.github.io`.
  Why it matters for the `lifa-su.com` parity blocker: this checkout is locally linked to Vercel, but to `lifa-su.github.io`, not `ai-tools-site`. That keeps a parallel or older Vercel project in play as the custom-domain owner.

- `research/live-parity-deploy-debug-2026-03-19.md:4-22`
  Exact refs: "deploy/custom-domain issue first"; no tracked `CNAME`; `lifa-su.github.io` ahead of `lifa-su.com`.
  Why it matters for the `lifa-su.com` parity blocker: it explains why repo-side fixes are blocked until the real live owner of the custom domain is confirmed.

- `research/parity-owner-hunt-2026-03-19.md:11-16,30-35`
  Exact refs: same local Vercel team linkage, legacy `lifa-sugithubio.vercel.app`, and the hypothesis that stale `lifa-su.com` traffic is coming from an older Vercel-origin path behind Cloudflare.
  Why it matters for the `lifa-su.com` parity blocker: it makes `ai-tools-site` a plausible live-origin candidate instead of treating GitHub Pages as the only path.

- `index.html:640`
  Exact ref: `['🌐','AI Tools Site','AI tools directory and showcase','ai-tools-site']`
  Why it matters for the `lifa-su.com` parity blocker: weak signal only, but it confirms `ai-tools-site` is part of this local project universe and not just a stray browser-history artifact.

- `/Users/feifei/.openclaw/workspace/memory/2026-03-10.md:56-62`
  Exact refs: `tools.lifa-su.com` -> `ai-tools-site`.
  Why it matters for the `lifa-su.com` parity blocker: nearby domain evidence that `ai-tools-site` was already treated as a `*.lifa-su.com` upstream by the same operator.

- `/Users/feifei/.openclaw/workspace/memory/2026-03-10.md:81-95`
  Exact refs: `tools.lifa-su.com` -> `ai-tools-site-pi.vercel.app`, plus the note that the public output still looked close to `ai-toolbox`.
  Why it matters for the `lifa-su.com` parity blocker: concrete proof that `ai-tools-site` had a live Vercel alias behind a `lifa-su.com` subdomain, which raises the odds that custom-domain drift is happening inside the same Vercel/domain stack.

- `/Users/feifei/.openclaw/workspace/research/vercel-deployment-results.md:7-20`
  Exact refs: `https://ai-tools-site-cjtupqn1k-feifeicch-9588s-projects.vercel.app` and `https://ai-tools-site-pi.vercel.app`.
  Why it matters for the `lifa-su.com` parity blocker: this confirms the project exists as a real deployed Vercel target under the same team slug, not just as a remembered dashboard route.

- `/Users/feifei/.openclaw/workspace/research/vercel-first-open-card-2026-03-19.md:3-15`
  Exact refs: first-open order `settings/domains` -> `deployments` -> `logs`.
  Why it matters for the `lifa-su.com` parity blocker: it matches the best current operator sequence and is the cleanest handoff path if domains confirms attachment.

## Strongest next dashboard page after domains

If `settings/domains` confirms `lifa-su.com` or `www.lifa-su.com` is attached to `feifeicch-9588s-projects/ai-tools-site`, open `https://vercel.com/feifeicch-9588s-projects/ai-tools-site/deployments` next.

Reason: the fastest remaining question is whether Production is stale, pointed at the wrong branch or repo, or simply needs a redeploy. `logs` is third, not second.
