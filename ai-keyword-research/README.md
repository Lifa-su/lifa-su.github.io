# AI Keyword Research Tool

AI-powered keyword research tool for modern SEO workflows. Part of the SEO Suite.

Built as a single-page application (HTML + CSS + JS) powered by the DeepSeek API.

## Features

- **Keyword Research** — Enter a seed keyword, get 20 related keywords with volume, difficulty, intent, CPC, and trend data
- **Long-Tail Keywords** — Discover low-competition, high-conversion long-tail opportunities with buyer stage mapping
- **Topic Clusters** — Build hub-and-spoke content strategies with pillar pages and supporting clusters
- **Competitor Analysis** — Analyze competitor domains to find keyword gaps and content opportunities
- **People Also Ask** — Generate PAA questions for featured snippet targeting
- **Keyword Grouping** — Auto-group keywords by intent and topic for content planning
- **Trend Prediction** — 12-month search volume forecasts with seasonal analysis
- **Multi-Language** — Research keyword equivalents across 12+ languages with market opportunity scoring
- **CSV Export** — Export any result set to CSV for use in other tools

## Tech Stack

- Pure frontend: single `index.html` file (~32KB)
- DeepSeek API (`deepseek-chat` model) for AI analysis
- No build tools, no dependencies, no backend
- Modern dark UI with responsive design
- CSS custom properties for theming

## Quick Start

1. Open `index.html` in a browser
2. Enter your [DeepSeek API key](https://platform.deepseek.com/)
3. Start researching keywords

The API key is stored in `localStorage` for convenience.

## Design Decisions

- **AI-estimated data**: Search volumes and difficulty scores are AI estimates for directional guidance. For precision data, validate with tools like Semrush or Ahrefs.
- **2025-2026 SEO trends**: Incorporates modern keyword research practices including search intent classification, topic clustering (hub-and-spoke model), AI search impact analysis, and multi-language market opportunity assessment.
- **Single file**: Keeps deployment simple — host anywhere, no build step needed.

## License

MIT
