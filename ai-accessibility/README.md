# A11y Inspector — AI-Powered Web Accessibility Checker

A single-page web application that combines local static analysis with AI-powered checks (DeepSeek API) to audit HTML code for accessibility issues against **WCAG 2.2** standards (2025-2026 compliance).

![License](https://img.shields.io/badge/license-MIT-blue)
![WCAG](https://img.shields.io/badge/WCAG-2.2%20AA%2FAAA-green)

## Features

- **HTML Code Analysis** — Paste HTML and get instant accessibility feedback
- **WCAG 2.2 Compliance** — Checks against all 86 criteria including 9 new WCAG 2.2 success criteria:
  - 2.4.11 Focus Not Obscured (Minimum)
  - 2.4.12 Focus Not Obscured (Enhanced)
  - 2.4.13 Focus Appearance
  - 2.5.7 Dragging Movements
  - 2.5.8 Target Size (Minimum)
  - 3.2.6 Consistent Help
  - 3.3.7 Redundant Entry
  - 3.3.8 Accessible Authentication (Minimum)
  - 3.3.9 Accessible Authentication (Enhanced)
- **Local Static Checks** — Instant analysis without API calls:
  - Missing alt attributes
  - Form labels
  - Heading hierarchy
  - Document language
  - Page title
  - Link text
  - ARIA misuse
  - Keyboard traps (tabindex)
  - Table headers
  - Semantic HTML
  - Viewport meta
  - Autoplaying media
- **AI-Powered Deep Analysis** — DeepSeek API for contextual checks, alt text suggestions, and ARIA recommendations
- **Color Contrast Checker** — Real-time WCAG AA/AAA contrast ratio calculator with visual preview
- **Severity Grading** — Issues classified as Critical / Major / Minor
- **Scoring System** — 0-100 accessibility score
- **Report Export** — Download results as Markdown or PDF
- **Modern Dark UI** — Responsive design, works on desktop and mobile

## Quick Start

1. Open `index.html` in any modern browser
2. Go to **Settings** tab and enter your [DeepSeek API key](https://platform.deepseek.com/)
3. Paste HTML code in the editor (or click "Load Sample")
4. Click **Run Accessibility Check**
5. Review issues, scores, and fix suggestions

## Tech Stack

- Pure HTML + CSS + JavaScript (no build tools, no dependencies)
- DeepSeek Chat API for AI analysis
- Local DOMParser-based static analysis engine

## API Key

This tool uses the [DeepSeek API](https://platform.deepseek.com/) for AI-powered analysis. You need a DeepSeek API key to use the AI features. Local static checks work without an API key.

The API key is stored in your browser's localStorage and never sent anywhere except DeepSeek's API.

## WCAG 2.2 Reference

WCAG 2.2 (W3C Recommendation, October 2023) is the current accessibility standard. It is now referenced by:
- ADA (Americans with Disabilities Act)
- Section 508
- European Accessibility Act (EAA) — enforcement from June 2025
- ISO/IEC 40500:2026 (expected late 2026)

Key compliance deadlines:
- EAA: June 28, 2025
- ADA Title II (large entities): April 24, 2026

## License

MIT
