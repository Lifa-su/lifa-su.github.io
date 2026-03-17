# Ko-fi Live Gap Card (2026-03-17)

Scope: current P0 order from `RUNNING-TASKS.md`. Checks run on `2026-03-17` against local repo pages, `https://lifa-su.com/`, `https://lifa-su.github.io/`, and the exact Ko-fi SKU links. Ko-fi product pages returned Cloudflare challenge `403` to automated checks, so checkout title / delivery copy still needs one manual browser pass.

## Highest-value gaps

### 1. Job Toolkit
- Biggest remaining live gap.
- `https://lifa-su.com/job-toolkit.html` is stale versus both local `job-toolkit.html` and `https://lifa-su.github.io/job-toolkit.html`.
- Custom domain still shows generic bundle copy (`If this bundle fits your workflow...`) and weaker routing (`AI Resume / AI Interview Prep / AI Networking Email / LinkedIn Optimizer Pro`).
- Current intended version positions Job Toolkit as the first paid step, routes to `AI Cover Letter`, free `AI LinkedIn Optimizer`, `AI Social Bio`, `Pricing`, and keeps human review later.
- Operator read: verify and sign off on `lifa-su.com`, not `github.io`.

### 2. Freelancer Starter Kit
- Main offer page looks in parity on both public domains.
- Price and exact SKU link look stable: `https://ko-fi.com/s/47bbc53346`.
- No blocking live-copy gap found.
- Minor only: shared surfaces still have some naming drift (`Job Toolkit Bundle` style labels elsewhere on site), but this is not the P0 blocker here.

### 3. Content Creator Toolkit
- Main offer page looks live and in parity on both public domains.
- Remaining trust mismatch: `content-creator-toolkit.html` says `5 AI tools` / `all 5 tools + bonus`, while canonical `content-creator-bundle/index.html` still says `4 AI writing tools` for the same `$19` offer family.
- Operator read: if any traffic still lands on `/content-creator-bundle/`, title/count mismatch can create hesitation before checkout.
- Exact SKU link on page looks stable: `https://ko-fi.com/s/8bcefe3cd3`.

### 4. LinkedIn Optimizer Pro
- Still matters before execution because it is part of the job-line routing stack.
- `https://lifa-su.com/linkedin-optimizer-pro.html` is stale versus local `linkedin-optimizer-pro.html` and `https://lifa-su.github.io/linkedin-optimizer-pro.html`.
- Custom domain still leads with generic recruiter-visibility copy and omits the current helper routes to `AI Social Bio`, `Job Toolkit`, `Job Search System`, and `Pricing`.
- Risk: LinkedIn-only visitors do not get the current `free first / Job Toolkit if the whole story is broken` path.
- Exact SKU link on page looks stable: `https://ko-fi.com/s/40d65098db`.

## Operator notes
- The parity split is real: for at least `job-toolkit.html`, `linkedin-optimizer-pro.html`, `pricing.html`, and `job-search-system.html`, `lifa-su.github.io` is ahead of `lifa-su.com`.
- Treat `https://lifa-su.com/` as the real live check until domain routing is clarified.
- Keep using the exact Job Toolkit SKU link: `https://ko-fi.com/s/41d7ec67e7`.
- Final QA still needs one manual browser pass on Ko-fi for product title, price, delivery wording, and thumbnail because automated checks hit Cloudflare challenge pages on `2026-03-17`.
