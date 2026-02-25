# PerfLens — AI Website Performance Analyzer

AI-powered website performance analysis tool that provides Core Web Vitals insights, optimization recommendations, and actionable checklists. Built for the global market.

## Features

- **Code Analysis** — Paste HTML/CSS/JS code for instant AI-powered performance review
- **Core Web Vitals (2025-2026)** — LCP (≤ 2.5s), INP (≤ 200ms), CLS (≤ 0.1) analysis
- **Image Optimization** — Format, sizing, lazy loading, AVIF/WebP recommendations
- **CSS Optimization** — Unused CSS detection, critical CSS extraction suggestions
- **JavaScript Optimization** — Code splitting, tree shaking, bundle size analysis
- **Resource Loading** — Preload, preconnect, async/defer, HTTP/2 recommendations
- **Caching Strategy** — Cache-Control, ETags, service workers, CDN suggestions
- **Third-Party Script Analysis** — Analytics, ads, widgets impact assessment
- **Performance Score** — 0-100 score with visual ring indicator
- **Before/After Comparison** — Estimated improvement after applying fixes
- **Export Checklist** — Download optimization report as Markdown

## Tech Stack

- Single-page HTML + CSS + JS (no build tools required)
- DeepSeek API (chat completions, `deepseek-chat` model)
- Modern responsive UI with CSS Grid, custom properties, glassmorphism
- Zero dependencies

## Quick Start

1. Open `index.html` in any modern browser
2. Enter your [DeepSeek API key](https://platform.deepseek.com/)
3. Paste your website code (HTML, CSS, and/or JS)
4. Click **Analyze Performance**
5. Review results and export the checklist

## Core Web Vitals Standards (2025-2026)

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP (Largest Contentful Paint) | ≤ 2.5s | 2.5s – 4s | > 4s |
| INP (Interaction to Next Paint) | ≤ 200ms | 200ms – 500ms | > 500ms |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | 0.1 – 0.25 | > 0.25 |

> INP replaced FID (First Input Delay) as a Core Web Vital in March 2024.

## Screenshots

Open `index.html` in your browser to see the tool in action.

## License

MIT
