# Stale String Commit Map (2026-03-19)

Scope: map the stale `lifa-su.com` custom-domain copy for `job-toolkit.html`, `pricing.html`, and `job-search-system.html` back to exact repo history.

- `job-toolkit.html` stale markers below were already confirmed from prior live reads and notes on 2026-03-17 and 2026-03-19.
- `pricing.html` and `job-search-system.html` were already recorded as stale on `lifa-su.com` versus `lifa-su.github.io`, but direct live fetch for those two routes was blocked in this pass. Their markers below are the exact March 8 copy windows most likely backing the stale public routes.

## job-toolkit.html

- Page: `job-toolkit.html`
- Stale marker strings:
  - `AI Job Toolkit — Get Interview-Ready Faster`
  - `Job Search Toolkit • One-Time Purchase`
  - `If this bundle fits your workflow, review the details here first. Ko-fi handles the final checkout when you're ready.`
  - `AI Resume Builder`, `AI Interview Prep`, `AI Networking Email`, `LinkedIn Optimizer Pro`
- Matching commit(s):
  - `90dd6104681b5978b4466957247fe204d8927517` — 2026-03-07 20:53:15 +0800 — `feat: neutralize channel-specific copy on Job Toolkit page`
  - `fd07322b0a443edd9dfa6d5e1334764473c186dc` — 2026-03-08 10:24:43 +0800 — `docs: align job line offer stack copy`
  - `cd1dd435c5785defedbf36a8bcfaaf020e5cb3ad` — 2026-03-08 22:45:36 +0800 — `docs: add job toolkit hub links`
- Why this helps parity debugging:
  - The stale custom-domain HTML matches the pre-2026-03-09 copy window, not current HEAD or current GitHub Pages output.
  - That points to an older deploy or cache/origin split, not a local-content mismatch.

## pricing.html

- Page: `pricing.html`
- Stale marker strings:
  - `Start with the toolkit. Upgrade only when you need more.`
  - `LinkedIn Optimizer Pro`
  - `Want the fastest human-review overview? Start on the services page.`
- Matching commit(s):
  - `093afd07a61839a8860aa24425a49ac8fc3996d2` — 2026-03-07 16:54:20 +0800 — `feat: align pricing page with current offer stack`
  - `b335127e893cdb261a78d723117dd6947830dbb6` — 2026-03-08 11:16:08 +0800 — `docs: tighten job line service entry points`
  - `341b46202ad04d13825344b9f49e781401e8e508` — 2026-03-08 22:46:21 +0800 — `docs: align pricing CTA with job toolkit offer stack`
- Why this helps parity debugging:
  - If live `pricing.html` still mentions `LinkedIn Optimizer Pro` and the `services page`, the stale route is pinned to the March 7-8 offer-stack version, before the March 10-12 job-funnel rewrite.
  - That narrows the stale origin to the same older deployment family as `job-toolkit.html`.

## job-search-system.html

- Page: `job-search-system.html`
- Stale marker strings:
  - `Build a Smarter Job Search with AI + Human Feedback`
  - `One-time purchase · Optional 48-hour human review`
  - `Works with ChatGPT & Claude`
- Matching commit(s):
  - `6a659810ac52d4c5b9137abad31a6a48ff9cb533` — 2026-03-07 16:54:36 +0800 — `feat: align job search system page with current offer stack`
  - `fd07322b0a443edd9dfa6d5e1334764473c186dc` — 2026-03-08 10:24:43 +0800 — `docs: align job line offer stack copy`
  - `b335127e893cdb261a78d723117dd6947830dbb6` — 2026-03-08 11:16:08 +0800 — `docs: tighten job line service entry points`
- Why this helps parity debugging:
  - Those markers place the stale route in the March 7-8 `AI + Human Feedback` router state, before the later `start free / same-candidate system` rewrite.
  - That gives one shared historical window across all three stale routes, which is useful when checking an older deploy, stale CDN cache, or alternate origin.
