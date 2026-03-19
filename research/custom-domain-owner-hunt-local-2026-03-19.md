# Custom Domain Owner Hunt Local (2026-03-19)

Scope: read-only search of local browser/app-support/cache/session artifacts.

## Result

No concrete local evidence was found that any Vercel project had `lifa-su.com` or `www.lifa-su.com` attached.

## Closest Vercel clue

- Chrome cache does show a second Vercel project under the same human-readable team slug:
  - `https://vercel.com/feifeicch-9588s-projects/lifa-su.github.io?_rsc=...`
  - Sources:
    - `~/Library/Caches/Google/Chrome/Default/Cache/Cache_Data/94795c9fcbfdeb93_0`
    - `~/Library/Caches/Google/Chrome/Default/Cache/Cache_Data/e7ee2309d196fac7_0`

- Chrome cache also preserves multiple Vercel deployment favicon requests for that project:
  - `https://vercel.com/api/v0/deployments/.../favicon?project=lifa-su.github.io&readyState=READY&teamId=team_euo5HAI3IKvNkNfIpiRbQh94&dpl=...`
  - Example sources:
    - `~/Library/Caches/Google/Chrome/Default/Cache/Cache_Data/38f4ad6bac5b9987_0`
    - `~/Library/Caches/Google/Chrome/Default/Cache/Cache_Data/c7559a9be5d0ec1d_0`

This proves local evidence of another Vercel project, `lifa-su.github.io`, under the same operator cluster, but not a custom-domain attachment.

## Strongest negative evidence

- Exact-string sweeps over `~/Library/Application Support`, `~/Library/Caches`, `~/Library/Safari`, and `~/Library/Containers/com.apple.Safari` returned no hits for `lifa-su.com` or `www.lifa-su.com`.

- Read-only Chrome History queries show exactly one Vercel domains-page visit, and it is:
  - `https://vercel.com/feifeicch-9588s-projects/ai-tools-site/settings/domains?source=prod-checklist`
  - No Chrome History rows matched `https://vercel.com/%/lifa-su.github.io%`.

- Distinct recovered Vercel `settings/domains` cache/session URLs all point to `ai-tools-site/settings/domains`; no cached `lifa-su.github.io/settings/domains` route was recovered.

- Distinct recovered Vercel `/api/v9/projects/.../domains` responses all point to `ai-tools-site` / `prj_LvsqOZ7Zz7EUSmtGOFeIe7NYoWZT`, and each recovered response contains exactly one domain row:
  - `name`: `ai-tools-site-pi.vercel.app`
  - `apexName`: `vercel.app`
  - `pagination.count`: `1`

Bottom line: local artifacts show `lifa-su.github.io` existed as another Vercel project under the same team, but this pass did not recover any exact `lifa-su.com` or `www.lifa-su.com` string, any cached domains-page visit for that project, or any Vercel domains API response attaching either custom domain to any project.
