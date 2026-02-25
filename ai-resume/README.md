<div align="center">

# 🤖 AI Resume Builder

**Build professional resumes in minutes — powered by AI, no backend required.**

AI 驱动的智能简历生成器，纯前端实现，填写信息即可一键生成专业简历。

[![Stars](https://img.shields.io/github/stars/Lifa-su/ai-resume?style=flat-square&logo=github&color=yellow)](https://github.com/Lifa-su/ai-resume/stargazers)
[![Forks](https://img.shields.io/github/forks/Lifa-su/ai-resume?style=flat-square&logo=github)](https://github.com/Lifa-su/ai-resume/network/members)
[![Issues](https://img.shields.io/github/issues/Lifa-su/ai-resume?style=flat-square&logo=github)](https://github.com/Lifa-su/ai-resume/issues)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Deploy](https://img.shields.io/badge/demo-live-brightgreen?style=flat-square&logo=github-pages)](https://lifa-su.com/ai-resume)

<br/>

[🎯 Live Demo](https://lifa-su.com/ai-resume) · [🐛 Report Bug](https://github.com/Lifa-su/ai-resume/issues) · [💡 Request Feature](https://github.com/Lifa-su/ai-resume/issues)

</div>

---

<!-- 
📸 Screenshot placeholder — replace with actual screenshot
![AI Resume Builder Screenshot](./screenshot.png)
-->

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📝 **Smart Form** | Fill in personal info, work experience, education & skills |
| 🤖 **AI Enhancement** | DeepSeek API auto-polishes job descriptions using the STAR method |
| 🎨 **3 Templates** | Minimal / Professional / Creative — instant preview on switch |
| 👀 **Live Preview** | Edit on the left, see your resume render in real-time on the right |
| 📄 **PDF Export** | Browser-based print, pixel-perfect A4 layout |
| 🌐 **Bilingual UI** | One-click toggle between Chinese & English |
| 💾 **Auto Save** | Data persists in `localStorage` — refresh without losing progress |
| 🎉 **Sample Data** | Pre-filled example on first visit for a quick tour |

## 🚀 Quick Start

No build tools. No Node.js. Just open and go.

```bash
# Clone the repo
git clone https://github.com/Lifa-su/ai-resume.git
cd ai-resume

# Option 1: Open directly
open index.html

# Option 2: Local server
python3 -m http.server 8080
# Then visit http://localhost:8080
```

> 💡 **Online Demo:** [https://lifa-su.com/ai-resume](https://lifa-su.com/ai-resume)

## 🤖 AI-Powered Optimization

1. Click the **🤖 API** button in the top-right corner
2. Enter your [DeepSeek API Key](https://platform.deepseek.com/)
3. Click **✨ AI Optimize** next to any job description
4. AI rewrites your description using the **STAR method** (Situation → Task → Action → Result)

> 🔒 Your API key stays in your browser — nothing is sent to any server except DeepSeek's API.

## 🎨 Resume Templates

| Template | Style | Best For |
|----------|-------|----------|
| **Minimal** | Clean whitespace, single column | Tech roles, international companies |
| **Professional** | Two-column with dark sidebar | Traditional industries, management |
| **Creative** | Gradient header, timeline layout | Design & creative positions |

## 📄 PDF Export

1. Click **Export PDF** (or press `Ctrl/Cmd + P`)
2. Select **Save as PDF** in the print dialog
3. Recommended: A4 paper, no margins, enable background graphics

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| HTML / CSS / JS | Pure frontend, single `index.html` |
| [DeepSeek Chat API](https://platform.deepseek.com/) | AI text optimization |
| CSS `@media print` | PDF export |
| `localStorage` | Client-side data persistence |
| [Google Fonts (Inter)](https://fonts.google.com/specimen/Inter) | Typography |

> Zero dependencies. Zero build steps. Works offline (except AI features).

## 📦 Project Structure

```
ai-resume/
├── index.html          # 🏠 Everything lives here — app, styles & logic
├── README.md
└── .github/workflows/  # GitHub Pages deployment
```

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** this repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a **Pull Request**

### Ideas for Contribution

- 🎨 New resume templates
- 🌍 More language support
- 🧪 Accessibility improvements
- 📱 Mobile responsiveness enhancements

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**If this project helps you, give it a ⭐ — it means a lot!**

如果这个项目对你有帮助，请点个 ⭐ 支持一下！

Made with ❤️ by [Lifa-su](https://github.com/Lifa-su)

</div>
