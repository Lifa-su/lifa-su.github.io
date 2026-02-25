# AI SEO Meta Tag Generator

A single-page AI-powered tool that generates optimized SEO meta tags using DeepSeek API. Built for the international market with English-first UI and Chinese language support.

## Features

- **Title Tag Optimization** — 50-60 character limit with keyword front-loading (2025-2026 best practices)
- **Meta Description** — 150-160 characters with CTA and natural keyword placement
- **Open Graph Tags** — Full og:title, og:description, og:image (1200×630px), og:type, og:url, og:locale
- **Twitter Card Tags** — summary_large_image format for maximum visibility on X/Twitter
- **Schema.org JSON-LD** — Structured data for rich results (WebPage, Article, Product, LocalBusiness, Event, FAQ, etc.)
- **Canonical URL** — Self-referencing canonical tag suggestion
- **Hreflang Tags** — Multi-language alternate links with x-default for international SEO
- **Live Preview** — Google SERP preview, Facebook/LinkedIn social card, X/Twitter card
- **One-Click Copy** — Copy individual sections or all code at once
- **Bilingual UI** — English (default) / 中文 toggle

## Tech Stack

- Pure HTML + CSS + JS (single file, no build step, no dependencies)
- DeepSeek API (deepseek-chat or deepseek-reasoner)
- Modern dark UI with responsive design
- LocalStorage for API key and language preference

## Usage

1. Open `index.html` in any modern browser
2. Enter your DeepSeek API key (get one at [platform.deepseek.com](https://platform.deepseek.com))
3. Enter a page URL and/or page content description
4. Select page type and target languages
5. Click **Generate Meta Tags**
6. Review, preview, and copy the generated tags

## SEO Best Practices (2025-2026)

Based on latest research:

| Tag | Guideline |
|-----|-----------|
| Title | 50-60 chars, ~500-600px width, primary keyword near front |
| Meta Description | 150-160 chars, include CTA, natural keyword usage |
| OG Image | 1200×630px, < 8MB, JPG/PNG |
| Twitter Card | summary_large_image, 1200×630px |
| Schema.org | JSON-LD in `<head>`, appropriate @type per page |
| Canonical | Self-referencing, absolute URL |
| Hreflang | ISO 639-1 codes, include x-default |

## License

MIT
