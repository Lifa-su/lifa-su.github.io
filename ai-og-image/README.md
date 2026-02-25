# OG Image Generator

AI-powered Open Graph image generator. Create stunning social media preview images in seconds.

## Features

- **Canvas-based rendering** — 1200×630px OG images (optimal for Twitter/X, Facebook, LinkedIn)
- **4 templates** — Blog Post, Product Page, Landing Page, GitHub Project
- **Custom backgrounds** — Gradient presets, solid colors, patterns (dots, grid, diagonal, waves, circles)
- **Typography controls** — 5 Google Fonts, adjustable title/description size, text alignment
- **Logo/avatar upload** — Drag & drop, with size control
- **AI layout suggestions** — DeepSeek API integration for smart typography and color recommendations
- **Export** — PNG and JPEG with automatic filename slugs
- **Batch generation** — Enter multiple titles, generate all at once
- **Social previews** — Live preview for Twitter/X, Facebook, and LinkedIn
- **Dark UI** — Modern, responsive single-page app

## Quick Start

Just open `index.html` in your browser. No build step, no dependencies, no server required.

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

## AI Suggestions

To use AI-powered layout suggestions:

1. Click the **🔑 API Key** button in the header
2. Enter your [DeepSeek API key](https://platform.deepseek.com)
3. Click **✨ AI Suggest Layout** in the sidebar

The AI analyzes your title, description, and template to recommend optimal font sizes, colors, alignment, and gradients.

## OG Image Best Practices (2025)

Based on current platform guidelines:

| Platform | Recommended Size | Aspect Ratio |
|----------|-----------------|--------------|
| Facebook | 1200 × 630 px | 1.91:1 |
| Twitter/X | 1200 × 630 px | 1.91:1 |
| LinkedIn | 1200 × 627 px | 1.91:1 |

- Keep important content centered (platforms may crop edges)
- Use high contrast text for readability
- File size under 1MB for fast loading
- PNG for sharp text, JPEG for photo-heavy images

## Tech Stack

- Pure HTML + CSS + JavaScript (no frameworks)
- Canvas API for image rendering
- Google Fonts for typography
- DeepSeek API for AI suggestions

## License

MIT
