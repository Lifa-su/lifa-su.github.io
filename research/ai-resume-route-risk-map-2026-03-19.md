# AI Resume Route Risk Map — 2026-03-19

Scope: inventory of `/ai-resume/` (ResumeForge) and the next-step pages it pushes traffic into. No content changes.

## Key entry / exit paths

- Entry point: external or brand traffic lands on `/ai-resume/`, which is explicitly branded as ResumeForge in the title, schema, header, and watermark.
- Direct monetization exits from `/ai-resume/`:
  - Header CTA: `/pricing.html` (`Unlock Pro`)
  - Upgrade modal: `/pricing.html` (`Unlock Pro on Pricing`)
  - Main paid CTA block: `/job-toolkit.html` and `/pricing.html`
  - Footer: `/job-toolkit.html`, `/pricing.html`, `/ai-cover-letter/`, `/ai-job-tracker.html`, `/ai-linkedin-optimizer.html`, `/ai-interview-prep/`
  - FAQ / next-steps copy: direct mentions of `/resume-review-fast-track.html` and `/linkedin-audit.html`
- Direct free-tool exits from `/ai-resume/`:
  - `/ai-cover-letter/`
  - `/ai-social-bio/`
  - `/ai-linkedin-optimizer.html`
  - `/ai-interview-prep/`
  - `/ai-job-tracker.html`
  - `/ai-skill-assessment.html`
  - `/job-search-system.html`
- Script-level off-page monetization edge from `/ai-resume/`:
  - `monetize.js` injects a floating Ko-fi support CTA plus cross-promo/share UI, so ResumeForge traffic can also leak to generic support/off-path monetization.

## Main downstream flows

1. `/ai-resume/` -> `/job-toolkit.html` -> Ko-fi checkout
2. `/ai-resume/` -> `/pricing.html` -> `/job-toolkit.html`
3. `/ai-resume/` -> `/pricing.html` -> `/resume-review-fast-track.html` -> `/contact.html`
4. `/ai-resume/` -> `/pricing.html` -> `/linkedin-audit.html` -> `/contact.html`
5. `/ai-resume/` -> `/job-search-system.html` -> `/job-toolkit.html` or `/pricing.html`
6. `/ai-resume/` -> free adjacent tools -> later loop back into `/job-toolkit.html` or `/pricing.html`

## Where the red parity pages appear in the flow

Assumption for this map: the red parity set is the compare / human-review branch closest to monetization, namely `/pricing.html`, `/resume-review-fast-track.html`, and `/linkedin-audit.html`. `/contact.html` is the booking sink behind that branch.

- On `/ai-resume/` itself:
  - `/pricing.html` is exposed in the header, body workflow copy, CTA panel, FAQ, related-tools grid, next-steps block, and upgrade modal.
  - `/resume-review-fast-track.html` and `/linkedin-audit.html` are exposed in the FAQ and next-steps copy.
- On `/job-search-system.html`:
  - the service bridge links directly to `/resume-review-fast-track.html` and `/linkedin-audit.html`
  - the pricing/support section links to `/pricing.html`
  - the footer repeats both fast-track pages
- On `/job-toolkit.html`:
  - hero copy, linked-tools hub, optional fast-track block, FAQ, and footer all keep `/pricing.html` and both fast-track pages in circulation
- On `/pricing.html`:
  - the page explicitly exposes both fast-track detail pages and frames them as optional add-ons after free/toolkit passes
- On `/resume-review-fast-track.html` and `/linkedin-audit.html`:
  - both pages route into `/contact.html`
  - both pages loop back into the other monetized service or back to `/job-toolkit.html` / `/pricing.html`

## Why ResumeForge stays `monitor`, not `safe`

- ResumeForge is not an isolated free tool. It is tightly wired into the paid compare layer and the human-review layer within 1 to 2 clicks.
- The page itself bypasses a clean toolkit-first gate in multiple places by linking straight to `/pricing.html`, and it also name-checks the two fast-track service pages directly.
- The router pages (`/job-search-system.html`, `/job-toolkit.html`, `/pricing.html`) repeatedly recirculate ResumeForge-origin users back into the same monetized compare/review branch, so any parity drift there changes the effective ResumeForge funnel.
- `monetize.js` adds a separate Ko-fi support exit that sits outside the tighter job-line path.
- Net: ResumeForge traffic is parity-adjacent to the red compare/review surfaces, so it should be watched as a feeder route, not treated as safely isolated.
