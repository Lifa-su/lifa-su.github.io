# ⚙️ ServerConf AI

AI-powered .htaccess & Nginx configuration generator. Single-page web app — no backend required.

## Features

- **AI Config Generator** — Describe what you need in plain English, get production-ready server config
- **Quick Templates** — One-click templates for security headers, caching, compression, CORS, SSL, hotlink protection
- **Config Converter** — Convert between .htaccess (Apache) ↔ Nginx formats using AI
- **Security Audit** — Paste your config, get a security score with detailed checks (HSTS, CSP, XSS, etc.)
- **Redirect Generator** — Build 301/302/307/308 redirect rules with exact, regex, or prefix matching
- **Config Explainer** — Paste any config and AI explains every line in plain English
- **One-click Copy** — Copy any generated config to clipboard instantly

## Tech Stack

- Pure HTML + CSS + JavaScript (single file, no dependencies)
- DeepSeek API for AI features
- Modern dark UI, fully responsive

## Quick Start

1. Open `index.html` in your browser
2. Enter your [DeepSeek API key](https://platform.deepseek.com/api_keys) and click Save
3. Start generating configs!

## Security Best Practices (2025/2026)

Templates follow current best practices including:
- HSTS with `includeSubDomains` and `preload`
- Content-Security-Policy (CSP)
- Permissions-Policy (replaces Feature-Policy)
- X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- TLS 1.2/1.3 only, OCSP stapling
- Gzip/Brotli compression with optimal settings
- Immutable cache headers for static assets

## License

MIT
