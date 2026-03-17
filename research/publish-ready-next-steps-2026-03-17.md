# Publish-Ready Next Steps (2026-03-17)

Current repo facts:
- Tracked working tree is clean.
- `main` is ahead of `origin/main` by 268 commits.
- GitHub Pages deploys from [`.github/workflows/deploy.yml`](/Users/feifei/.openclaw/workspace/lifa-su.github.io/.github/workflows/deploy.yml) on `push` to `main`.
- Remaining local-only files are `blog/ai-tools-for-hr-teams.html`, `blog/job-search-mistakes-2026.html`, `job-line-micro-qa-and-deploy-checklist-2026-03-13.md`, and `job-line-ship-gate-2026-03-13.md`.

What is already clean:
1. No tracked file cleanup is left before push.
2. Earlier dirty-file blockers such as `ai-legal-docs-generator.html` and `blog/career-change-2026.html` are not blocking the current tree anymore.

What still blocks push:
1. Operator sign-off only: `git push origin main` will publish the full 268-commit local lead on `main`.

What can be ignored:
1. Leave the four untracked local files unstaged if they are not part of this publish.

Final publish / QA order once sign-off is clear:
1. Run `git status --short --branch` and confirm only those four untracked files remain.
2. Run `git push origin main`.
3. Confirm the newest `deploy.yml` run is for `git rev-parse HEAD` and finishes `success`.
4. Verify `https://lifa-su.github.io/` reflects the pushed state.
5. Verify or explicitly defer `https://lifa-su.com/`; Pages still has no `CNAME`, so custom-domain parity is a separate operator check.
