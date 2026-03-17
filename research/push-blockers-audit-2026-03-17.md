# Push Blockers Audit (2026-03-17)

Current dirty items from `git status --short`:
`.DS_Store`, `ai-legal-docs-generator.html`, `ai-resume/index.html`, `blog/ai-tools-for-hr-teams.html`, `blog/career-change-2026.html`, `blog/job-search-mistakes-2026.html`, `job-line-micro-qa-and-deploy-checklist-2026-03-13.md`, `job-line-ship-gate-2026-03-13.md`, `research/gh-pages-publish-execute-card-2026-03-17.md`

## Safe To Ignore For Publish
- `blog/ai-tools-for-hr-teams.html` and `blog/job-search-mistakes-2026.html`: untracked local drafts; no tracked references found.
- `job-line-micro-qa-and-deploy-checklist-2026-03-13.md` and `job-line-ship-gate-2026-03-13.md`: untracked operator notes; no publish impact.
- `research/gh-pages-publish-execute-card-2026-03-17.md`: untracked operator note; no publish impact.

## Needs Cleanup Before Push
- `.DS_Store`: tracked binary noise at repo root; unrelated to site publish and should not ride along.
- `ai-legal-docs-generator.html`: tracked product page is dirty; diff is 28 lines of new CSS selectors, and those selectors are only defined, not used elsewhere in the file. Treat as unfinished/dead local work until cleaned up or finished.

## Unknown / Manual Check
- `ai-resume/index.html`: tracked live-page changes alter header CTA, footer links, and upgrade modal copy. Push only if this funnel change is intentional and reviewed.
- `blog/career-change-2026.html`: untracked locally, but tracked files already point at `/blog/career-change-2026.html` in `blog/index.html` and `sitemap.xml`. Decide whether this page should be committed now or whether the existing references need follow-up in a separate fix.

## Operator Call
- Not a clean push/publish decision yet. Safe path: exclude the local draft files, clean `.DS_Store` and `ai-legal-docs-generator.html`, then make an explicit yes/no decision on the `ai-resume` and `career-change-2026` publish intent.
