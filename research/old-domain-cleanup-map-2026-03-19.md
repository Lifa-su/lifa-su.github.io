# Old Domain Cleanup Map (2026-03-19)

Audit basis: `rg` pass at `ff48a68` for `lifa-sugithubio.vercel.app`, `LinkedIn Optimizer Pro`, and the exact March 7-8 stale markers already tied to the bad custom-domain route.

## What this pass confirmed

- No exact matches for the known March 7-8 blocker phrases remain in `job-toolkit.html`, `pricing.html`, or `job-search-system.html`.
- Post-parity cleanup risk is now mostly in reused source files, internal route links, and direct checkout CTAs.

## 1. Legacy default-domain references

- `_gen.py` hard-codes `https://lifa-sugithubio.vercel.app/ai-unit-test.html` in canonical, `og:url`, and JSON-LD `url` fields. Why it matters after parity is fixed: any reuse of this generator republishes old-domain metadata.
- `blog/ai-resume-builder-vs-traditional-templates.md`, `blog/developer-side-project-portfolio.md`, `blog/free-ai-tools-job-seekers.md`, `blog/free-ai-tools-small-business-2026.md`, and `blog/how-to-write-cover-letter-2026.md` link to `https://lifa-sugithubio.vercel.app` for toolkit / resume / cover-letter CTAs. Why it matters after parity is fixed: these drafts can reintroduce the old domain on the next publish or copy pass.
- `research/cloudflare-owner-clues-2026-03-19.md`, `research/history-owner-clues-2026-03-19.md`, and `research/parity-owner-hunt-2026-03-19.md` mention `lifa-sugithubio.vercel.app` as parity evidence. Why it matters after parity is fixed: safe as history, but the old domain should stay clearly labeled as investigation-only text.

## 2. `LinkedIn Optimizer Pro` still anchors the older branch

- `linkedin-optimizer-pro.html` is the canonical page and still uses `LinkedIn Optimizer Pro` in title, meta, body copy, canonical `https://lifa-su.com/linkedin-optimizer-pro.html`, and the direct Ko-fi SKU `https://ko-fi.com/s/40d65098db`. Why it matters after parity is fixed: parity alone will not change this page, and it remains the main source for that branch.
- `ai-id-photo/index.html`, `free-ai-tools-guide.html`, `freelancer-starter-kit.html`, `prompt-templates-pack.html`, `tools/linkedin-personality-quiz.html`, and `blog/ai-resume-tips.html` still link users to `/linkedin-optimizer-pro.html` or `https://lifa-su.com/linkedin-optimizer-pro.html`. Why it matters after parity is fixed: these internal routes can keep sending users into the older LinkedIn-only branch.
- `thank-you.html`, `free-ai-tools-guide.html`, `linkedin-optimizer-pro.html`, `blog/ai-resume-tips.html`, `blog/ai-tools-for-remote-workers-2026.html`, `blog/best-ai-prompts-for-linkedin.html`, `blog/best-ai-tools-for-cover-letters-2026.html`, `blog/best-ai-tools-for-job-seekers-2026.html`, `blog/best-ai-writing-tools-for-students.html`, `blog/career-change-guide-ai-tools.html`, `blog/how-to-build-a-portfolio-without-experience.html`, `blog/how-to-negotiate-salary-after-job-offer.html`, `blog/how-to-network-on-linkedin-2026.html`, `blog/how-to-optimize-linkedin-for-recruiters.html`, `blog/how-to-track-job-applications-effectively.html`, `blog/how-to-use-ai-for-job-search.html`, `blog/how-to-write-cover-letter-with-ai.html`, `blog/how-to-write-linkedin-summary-with-ai.html`, `blog/how-to-write-professional-emails.html`, `blog/linkedin-profile-optimization-guide-2026.html`, `blog/remote-job-search-strategy-2026.html`, `blog/salary-negotiation-scripts-that-work.html`, and `blog/top-mistakes-job-seekers-make-2026.html` still point at the direct Ko-fi SKU `https://ko-fi.com/s/40d65098db`. Why it matters after parity is fixed: direct checkout links bypass any revised on-site router and keep the old branch active from blog/CTA traffic.

## 3. Exact March 7-8 stale markers now live only in research notes

- `research/stale-string-commit-map-2026-03-19.md` records the exact stale strings `AI Job Toolkit — Get Interview-Ready Faster`, `Job Search Toolkit • One-Time Purchase`, `If this bundle fits your workflow, review the details here first. Ko-fi handles the final checkout when you're ready.`, `Start with the toolkit. Upgrade only when you need more.`, `Want the fastest human-review overview? Start on the services page.`, `Build a Smarter Job Search with AI + Human Feedback`, `One-time purchase · Optional 48-hour human review`, and `Works with ChatGPT & Claude`. Why it matters after parity is fixed: keep as incident history, but do not copy these strings back into source pages.
- `research/custom-domain-parity-fix-card-2026-03-19.md` repeats `AI Job Toolkit — Get Interview-Ready Faster` and `Job Search Toolkit • One-Time Purchase`, plus the live-check command that looks for them. Why it matters after parity is fixed: safe as investigation evidence, but still stale route wording.
- `research/parity-owner-hunt-2026-03-19.md` repeats `AI Job Toolkit — Get Interview-Ready Faster` and `Job Search Toolkit • One-Time Purchase` as historical proof. Why it matters after parity is fixed: evidence-only text that should not be mistaken for current copy.
- `research/kofi-live-gap-card-2026-03-17.md` preserves the summarized stale routing stack `AI Resume / AI Interview Prep / AI Networking Email / LinkedIn Optimizer Pro` and generic bundle copy `If this bundle fits your workflow...`. Why it matters after parity is fixed: it explains the old branch, but it is still stale route language.
