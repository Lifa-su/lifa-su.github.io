# History Owner Clues (2026-03-19)

Scope: local shell history, local CLI/config files, and existing local research notes. Read-only investigation; no infra changes.

## Strongest clues

- `~/.zsh_history:1061-1062` shows `ALL_PROXY=socks5://127.0.0.1:1086 vercel login` twice.
  Why it matters: this machine was used to authenticate the Vercel CLI intentionally, so Vercel is not just a stray repo artifact.

- [`.vercel/project.json`](/Users/feifei/.openclaw/workspace/lifa-su.github.io/.vercel/project.json) links this checkout to Vercel project `lifa-su.github.io` with `projectId` `prj_6hAojoxpATA9oY9z7ZhDEQRmxgFB` and `orgId` `team_euo5HAI3IKvNkNfIpiRbQh94`.
  Why it matters: this is the strongest direct local ownership clue for the likely stale origin path.

- [ai-cover-letter/.vercel/project.json](/Users/feifei/.openclaw/workspace/lifa-su.github.io/ai-cover-letter/.vercel/project.json) links a second project, `ai-cover-letter`, to the same `orgId` `team_euo5HAI3IKvNkNfIpiRbQh94`.
  Why it matters: the shared team-scoped `orgId` makes the Vercel linkage look deliberate and multi-project, not accidental.

- [`_gen.py`](/Users/feifei/.openclaw/workspace/lifa-su.github.io/_gen.py#L17) still references `https://lifa-sugithubio.vercel.app/ai-unit-test.html`, and its metadata author is `Lifa Su`.
  Why it matters: this is a direct legacy default-domain clue tying this codebase to a Vercel-hosted surface related to this site.

- Local Vercel CLI state exists at `/Users/feifei/Library/Application Support/com.vercel.cli/auth.json`; the file has a token, but `currentTeam`, `user`, and `teams` are all `null`.
  Why it matters: the machine has Vercel auth state, but the local file does not expose a human-readable dashboard account/team name. The `orgId` above is stronger than the auth file for attribution.

- `git remote -v` points to `https://github.com/Lifa-su/lifa-su.github.io.git`, and local/global git identity is `LiFa <feifeicch@gmail.com>`.
  Why it matters: this is the clearest local operator identity cluster tied to the repo that also matches other site branding notes.

- Existing local research notes say GitHub Pages currently has `cname: null`, there is no tracked `CNAME`, and `lifa-su.com` has been observed serving older Cloudflare-fronted content while `lifa-su.github.io` is current.
  Why it matters: local evidence points away from GitHub Pages currently owning the custom domain and toward Cloudflare in front of some other origin, with Vercel the strongest local candidate.

## Noise filtered out

- `~/.zsh_history:1297-1403` contains a large Cloudflare tunnel setup flow, but it is for `~/.openclaw/openclaw/webchat-tunnel` and checks `https://vn.rolilo.com/`, not `lifa-su.com`.
  Why it matters: this proves Cloudflare tooling was used on this machine, but it is not direct evidence of `lifa-su.com` ownership or routing.

- `~/.cloudflared` was not present in this environment during this pass.
  Why it matters: no local Cloudflare config here exposed a `lifa-su.com` zone, account, or dashboard name.

## Direct dashboard/account names found

- GitHub repo owner: `Lifa-su`
- Git identity: `LiFa <feifeicch@gmail.com>`
- Repo/site author names present locally: `Lifa Su`, `FeiDev`
- Commerce/account handles present locally: `feidev` (Ko-fi), `feifeicch` (Gumroad)
- Vercel project names: `lifa-su.github.io`, `ai-cover-letter`
- Vercel team/org identifier: `team_euo5HAI3IKvNkNfIpiRbQh94`

## Bottom line

The strongest local operator evidence is a same-owner cluster: GitHub `Lifa-su`, git identity `LiFa <feifeicch@gmail.com>`, repo/site names `Lifa Su` and `FeiDev`, and explicit local Vercel links for this repo under team `team_euo5HAI3IKvNkNfIpiRbQh94`. The strongest local routing clue is still that GitHub Pages has no `CNAME` while local notes describe `lifa-su.com` as Cloudflare-fronted and stale, which keeps "Cloudflare in front of an older Vercel origin" as the leading local hypothesis.
