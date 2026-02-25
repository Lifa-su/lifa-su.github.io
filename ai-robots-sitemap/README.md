# AI Robots.txt & Sitemap Generator

A modern, single-page web tool for generating robots.txt and sitemap.xml files with built-in AI crawler management. Built for the AI-first web era.

## Features

### Robots.txt Generator
- Visual rule editor (Allow/Disallow) with custom user-agent support
- 8 preset templates: WordPress, Next.js, E-commerce, Blog, SaaS, Docs, Portfolio, Restrictive
- AI crawler management for 21 bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.)
- Quick policies: Allow All, Block All, Allow Search Only, Block Training Only
- Syntax validation and error checking
- URL tester — check if a specific URL is allowed/blocked for any user-agent
- One-click copy and download

### Sitemap.xml Generator
- Generate sitemaps from URL lists
- Configurable priority and change frequency
- Multi-language support with hreflang tags
- Image sitemap support
- One-click copy and download

### AI-Powered Suggestions
- Integrates with DeepSeek API for intelligent robots.txt analysis
- Get optimization recommendations based on your configuration
- AI crawler best practices for 2025-2026

## AI Crawlers Supported (Updated Feb 2026)

| Bot | Vendor | Type |
|-----|--------|------|
| GPTBot | OpenAI | Training |
| OAI-SearchBot | OpenAI | Search |
| ChatGPT-User | OpenAI | Search |
| anthropic-ai | Anthropic | Training |
| ClaudeBot | Anthropic | Search |
| Claude-SearchBot | Anthropic | Search |
| PerplexityBot | Perplexity | Search |
| Google-Extended | Google | Training |
| Applebot-Extended | Apple | Training |
| CCBot | Common Crawl | Training |
| Bytespider | ByteDance | Training |
| Meta-ExternalAgent | Meta | Training |
| + 9 more... | | |

## Usage

1. Open `index.html` in any modern browser
2. (Optional) Enter your DeepSeek API key for AI suggestions
3. Choose a template or configure rules manually
4. Manage AI crawler access with one-click policies
5. Generate, validate, copy, or download your files

No server required — runs entirely in the browser.

## Tech Stack

- Pure HTML + CSS + JavaScript (single file, ~580 lines)
- DeepSeek API for AI suggestions (optional)
- Zero dependencies

## Data Sources

AI crawler data compiled from:
- Official documentation (OpenAI, Anthropic, Google, Apple, Meta)
- Momentic Marketing AI Crawler List (Nov 2025)
- Paul Calvano's AI Bots research (Aug 2025)
- robotstxt.com/ai reference

## License

MIT
