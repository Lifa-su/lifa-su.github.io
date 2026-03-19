# Direct Checkout Cleanup Map (2026-03-19)

Scope: source pages only. I left `research/`, deploy notes, and other investigation-only files out of the priority list. I also did not flag the current canonical checkout sink `job-toolkit.html`; this map is for direct checkout or generic shop exits that can keep older offer branches alive after parity is fixed.

## High priority

- `index.html`
  - Target URL / SKU: `https://feifeicch.gumroad.com/`
  - Why it matters: root `MONETIZE_CONFIG` still points the shared monetization layer at the legacy Gumroad shop, so home traffic can reopen the old provider path if that component is surfaced again.
  - Rough priority: high

- `free-ai-tools-guide.html`
  - Target URL / SKU: `https://ko-fi.com/s/41d7ec67e7`, `https://ko-fi.com/s/8bcefe3cd3`, `https://ko-fi.com/s/47bbc53346`, `https://ko-fi.com/s/40d65098db`, `https://ko-fi.com/feidev`
  - Why it matters: broad hub page with direct product cards plus a generic Ko-fi shop CTA; it can bypass any router-first cleanup from one of the highest-leverage entry pages in the repo.
  - Rough priority: high

- `thank-you.html`
  - Target URL / SKU: `https://ko-fi.com/s/41d7ec67e7`, `https://ko-fi.com/s/8bcefe3cd3`, `https://ko-fi.com/s/47bbc53346`, `https://ko-fi.com/s/40d65098db`, `https://ko-fi.com/feidev`
  - Why it matters: post-conversion cross-sell surface that can recirculate users straight into direct checkout and keep the older multi-offer branch alive after parity work elsewhere.
  - Rough priority: high

- `linkedin-optimizer-pro.html`
  - Target URL / SKU: `https://ko-fi.com/s/40d65098db`, `https://ko-fi.com/feidev`
  - Why it matters: this is still the main standalone LinkedIn-only sales page already tied to the older branch; parity fixes on router pages do not retire it because it sells direct on-page.
  - Rough priority: high

- `linkedin-optimizer-pro/index.html`
  - Target URL / SKU: `https://ko-fi.com/feidev`
  - Why it matters: duplicate route for the same offer family, but it exits to the generic Ko-fi shop instead of the exact SKU. That keeps a second standalone LinkedIn branch alive.
  - Rough priority: high

- `ai-resume-pro/index.html`
  - Target URL / SKU: `https://ko-fi.com/feidev`
  - Why it matters: dedicated paid resume landing page with only direct shop exits; it keeps the standalone resume branch alive outside the current job-line routing.
  - Rough priority: high

- `ai-cover-letter-pro/index.html`
  - Target URL / SKU: `https://ko-fi.com/feidev`
  - Why it matters: dedicated paid cover-letter landing page with only direct shop exits; same branch-keeping risk as the resume page.
  - Rough priority: high

- `content-creator-bundle/index.html`
  - Target URL / SKU: `https://ko-fi.com/feidev`
  - Why it matters: older bundle route still sells on the generic Ko-fi shop, while sibling `content-creator-toolkit.html` uses the exact SKU `https://ko-fi.com/s/8bcefe3cd3`. Two checkout patterns keep both versions live.
  - Rough priority: high

- `freelancer-starter-kit/index.html`
  - Target URL / SKU: `https://ko-fi.com/feidev`
  - Why it matters: older directory route still sells on the generic Ko-fi shop, while sibling `freelancer-starter-kit.html` uses the exact SKU `https://ko-fi.com/s/47bbc53346`.
  - Rough priority: high

- Direct LinkedIn SKU feeder cluster
  - Target URL / SKU: `https://ko-fi.com/s/40d65098db`
  - Why it matters: this is the densest exact-SKU source cluster for the older LinkedIn-only branch, so blog, guide, and thank-you traffic can keep that branch alive even after parity cleanup.
  - Rough priority: high
  - Exact file paths:
    ```text
    blog/ai-resume-tips.html
    blog/ai-tools-for-remote-workers-2026.html
    blog/best-ai-prompts-for-linkedin.html
    blog/best-ai-tools-for-cover-letters-2026.html
    blog/best-ai-tools-for-job-seekers-2026.html
    blog/best-ai-writing-tools-for-students.html
    blog/career-change-guide-ai-tools.html
    blog/how-to-build-a-portfolio-without-experience.html
    blog/how-to-negotiate-salary-after-job-offer.html
    blog/how-to-network-on-linkedin-2026.html
    blog/how-to-optimize-linkedin-for-recruiters.html
    blog/how-to-track-job-applications-effectively.html
    blog/how-to-use-ai-for-job-search.html
    blog/how-to-write-cover-letter-with-ai.html
    blog/how-to-write-linkedin-summary-with-ai.html
    blog/how-to-write-professional-emails.html
    blog/linkedin-profile-optimization-guide-2026.html
    blog/remote-job-search-strategy-2026.html
    blog/salary-negotiation-scripts-that-work.html
    blog/top-mistakes-job-seekers-make-2026.html
    free-ai-tools-guide.html
    linkedin-optimizer-pro.html
    thank-you.html
    ```

## Medium priority

- Direct Job Toolkit SKU feeder cluster
  - Target URL / SKU: `https://ko-fi.com/s/41d7ec67e7`
  - Why it matters: the checkout itself is current, but these pages bypass `job-toolkit.html` and the intended toolkit-first route by sending users straight to checkout from blogs, cross-sells, or unrelated tools.
  - Rough priority: medium
  - Exact file paths:
    ```text
    ai-startup-idea-generator.html
    blog/ai-cover-letter-generator-free.html
    blog/ai-resume-tips-ats-friendly.html
    blog/ai-resume-tips.html
    blog/ai-tools-for-remote-workers-2026.html
    blog/best-ai-tools-for-cover-letters-2026.html
    blog/best-ai-tools-for-job-seekers-2026.html
    blog/best-ai-writing-tools-for-students.html
    blog/best-free-ai-tools-2025.html
    blog/best-resume-formats-2026.html
    blog/career-change-guide-ai-tools.html
    blog/chatgpt-prompts-for-career-growth.html
    blog/free-ai-image-generator-no-login.html
    blog/free-resume-builder-no-sign-up.html
    blog/freelancer-client-acquisition-guide.html
    blog/how-to-ace-behavioral-interviews-2026.html
    blog/how-to-build-a-portfolio-without-experience.html
    blog/how-to-follow-up-after-interview.html
    blog/how-to-negotiate-salary-after-job-offer.html
    blog/how-to-network-on-linkedin-2026.html
    blog/how-to-optimize-linkedin-for-recruiters.html
    blog/how-to-track-job-applications-effectively.html
    blog/how-to-use-ai-for-job-search.html
    blog/how-to-write-cover-letter-with-ai.html
    blog/how-to-write-linkedin-summary-with-ai.html
    blog/how-to-write-professional-emails.html
    blog/job-interview-preparation-ai-tools.html
    blog/linkedin-profile-optimization-guide-2026.html
    blog/remote-job-interview-tips-2026.html
    blog/remote-job-search-strategy-2026.html
    blog/salary-negotiation-scripts-that-work.html
    blog/salary-negotiation-tips-ai.html
    blog/top-mistakes-job-seekers-make-2026.html
    content-creator-toolkit/index.html
    free-ai-tools-guide.html
    linkedin-optimizer/index.html
    thank-you.html
    ```

- Direct Content Creator SKU feeder cluster
  - Target URL / SKU: `https://ko-fi.com/s/8bcefe3cd3`
  - Why it matters: these are still direct SKU exits that skip the public offer page and preserve older direct-checkout behavior across guides and blogs.
  - Rough priority: medium
  - Exact file paths:
    ```text
    blog/ai-color-palette-generator.html
    blog/ai-tools-for-small-business.html
    blog/best-ai-tools-for-freelancers.html
    blog/best-ai-writing-tools-for-students.html
    blog/free-ai-image-generator-no-login.html
    blog/how-to-use-ai-for-seo.html
    blog/how-to-write-linkedin-summary-with-ai.html
    free-ai-tools-guide.html
    thank-you.html
    ```

- Direct Freelancer Starter Kit SKU feeder cluster
  - Target URL / SKU: `https://ko-fi.com/s/47bbc53346`
  - Why it matters: same bypass pattern as above, but for the freelancer offer family.
  - Rough priority: medium
  - Exact file paths:
    ```text
    blog/ai-tools-for-small-business.html
    blog/ai-tools-vs-chatgpt.html
    blog/best-ai-tools-for-freelancers.html
    blog/free-ai-image-generator-no-login.html
    blog/free-invoice-generator-online.html
    blog/freelancer-productivity-tools-2026.html
    free-ai-tools-guide.html
    thank-you.html
    ```

- `resume-template-pack.html`
  - Target URL / SKU: `https://ko-fi.com/feidev`
  - Why it matters: standalone paid template page with direct generic shop exits; not as central as the main hub pages, but still a direct legacy monetization path.
  - Rough priority: medium

- `notion-template-bundle.html`
  - Target URL / SKU: `https://ko-fi.com/feidev`
  - Why it matters: same direct generic shop pattern on a standalone paid template page.
  - Rough priority: medium

- `linkedin-optimizer/index.html`
  - Target URL / SKU: `https://ko-fi.com/s/41d7ec67e7`
  - Why it matters: free LinkedIn tool modal exits straight to the Job Toolkit SKU while the CTA label still reads like a `$7` pro upsell; this looks like a stale direct-checkout path worth direct cleanup.
  - Rough priority: medium

- `content-creator-toolkit/index.html`
  - Target URL / SKU: `https://ko-fi.com/s/41d7ec67e7`
  - Why it matters: this page currently exposes a Job Toolkit SKU from the content-creator tool family, which looks like a mismatched direct checkout path rather than an intentional offer route.
  - Rough priority: medium
