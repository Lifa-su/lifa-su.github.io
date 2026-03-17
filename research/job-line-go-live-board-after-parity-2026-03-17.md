# Job Line Go-Live Board After Parity (2026-03-17)

Use this as a short operator card only. Treat parity as usable, not fully hardened.

## Practical order
1. Lock Ko-fi live copy.
   - Use `https://lifa-su.com/job-toolkit.html` as the public page and `https://ko-fi.com/s/41d7ec67e7` as the only checkout.
   - Keep the public message consistent: free tools first, Job Toolkit as the first paid step, human review later only if needed.
2. Submit to AINave.
   - Use directory-style copy: `AI Job Toolkit`, `$29 one-time`, ATS-safe resume + cover letter + interview prep, exact Ko-fi checkout.
   - Stop if the submission flow is not reachable without extra account/setup friction.
3. Submit to The Rundown.
   - Use the public `Recommend a Tool` path first.
   - Treat newsletter placement as a separate editorial/paid path, not part of same-day parity validation.
4. Run safe Reddit wave1 last.
   - Only after one more custom-domain spot check and subreddit-rule check.
   - Keep wave1 small, value-first, one tool/problem angle per post, light linking, no hard-sell bundle language.

## Unblocked now
- Repo copy, `https://lifa-su.github.io/job-toolkit.html`, and the exact Ko-fi checkout are aligned on the current Job Toolkit framing.
- Current public support pages keep the same route: free tools -> Job Toolkit -> optional human review later.
- AINave is live and current as a public products surface.
- The Rundown submit page is live and publicly reachable.

## Still risky / gated
- `https://lifa-su.com/job-toolkit.html` still returned older copy on repeat fetches, so treat custom-domain parity as a manual recheck item, not a solved fact.
- `gh api repos/Lifa-su/lifa-su.github.io/pages` still reports `status: built` and `cname: null`; custom-domain routing is still outside current Pages config.
- AINave did not expose an obvious public `/submit` or `/login` path from quick surface checks; assume manual account friction until proven otherwise.
- The Rundown is an editorial gate even when the form is live.
- Reddit is still the highest moderation-risk channel; keep self-promo minimal and community-fit explicit.

## Stop conditions
- Pause external traffic if the custom-domain spot check still shows the older Job Toolkit hero copy.
- Do not widen beyond wave1 if a channel needs claims about parity or offer order that the live page does not support.
- Do not post Reddit wave1 if the post needs more than one commercial link or violates subreddit self-promo rules.

## Evidence snapshot
- `https://lifa-su.github.io/job-toolkit.html` matched the repo Job Toolkit copy and exact Ko-fi CTA on 2026-03-17.
- `https://lifa-su.com/job-toolkit.html` repeated fetches returned older pre-neutral copy; one header read showed `last-modified: Sun, 08 Mar 2026 14:44:25 GMT`.
- `https://www.rundown.ai/submit` currently exposes `Recommend a Tool` and a separate `Newsletter Feature` path.
- `https://ainave.com/sitemap/sitemap.xml` is current on 2026-03-17 and lists active `/products` surfaces.
