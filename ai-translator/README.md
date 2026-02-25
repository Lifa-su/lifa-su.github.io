<div align="center">

# 🌐 AI Translator

### Smart Multi-Language Translator Powered by DeepSeek AI

**一个基于 DeepSeek AI 的智能多语言翻译工具，纯前端、零部署、开箱即用。**

[![Stars](https://img.shields.io/github/stars/Lifa-su/ai-translator?style=flat-square&logo=github&color=yellow)](https://github.com/Lifa-su/ai-translator/stargazers)
[![Forks](https://img.shields.io/github/forks/Lifa-su/ai-translator?style=flat-square&logo=github&color=blue)](https://github.com/Lifa-su/ai-translator/network/members)
[![Issues](https://img.shields.io/github/issues/Lifa-su/ai-translator?style=flat-square&logo=github&color=orange)](https://github.com/Lifa-su/ai-translator/issues)
[![License](https://img.shields.io/github/license/Lifa-su/ai-translator?style=flat-square&color=green)](./LICENSE)
[![Deploy](https://img.shields.io/github/actions/workflow/status/Lifa-su/ai-translator/static.yml?style=flat-square&label=deploy&logo=github-actions)](https://github.com/Lifa-su/ai-translator/actions)

<br/>

[🎯 **Live Demo 在线体验**](https://lifa-su.com/ai-translator) · [🐛 Report Bug](https://github.com/Lifa-su/ai-translator/issues) · [💡 Request Feature](https://github.com/Lifa-su/ai-translator/issues)

<br/>

<!-- 📸 Screenshot placeholder — replace with actual screenshot -->
<!-- ![AI Translator Screenshot](./screenshot.png) -->
<img src="https://via.placeholder.com/800x450/4285f4/ffffff?text=AI+Translator+Screenshot" alt="AI Translator Screenshot" width="80%" />

</div>

---

## ✨ Features | 功能亮点

- 🌍 **14 Languages** — Chinese, English, Japanese, Korean, French, German, Spanish, Russian, Portuguese, Italian, Arabic, Thai, Vietnamese & more
- 🔍 **Auto Detect** — Automatically identifies the source language（自动检测源语言）
- 🔄 **One-Click Swap** — Instantly swap source and target languages
- 📋 **Copy to Clipboard** — Copy translation results with one click
- 📝 **Translation History** — Local storage for up to 20 recent translations（本地存储翻译历史）
- ⌨️ **Keyboard Shortcut** — `Ctrl/Cmd + Enter` for quick translation
- 📱 **Responsive Design** — Works seamlessly on desktop and mobile
- 🔒 **Privacy First** — API key stored locally, never uploaded to any server
- ⚡ **Zero Dependencies** — Single HTML file, no build tools, no frameworks
- 🚀 **One-Click Deploy** — GitHub Pages auto-deployment via GitHub Actions

---

## 🎯 Live Demo | 在线体验

👉 **[https://lifa-su.com/ai-translator](https://lifa-su.com/ai-translator)**

> Bring your own DeepSeek API Key — get one free at [platform.deepseek.com](https://platform.deepseek.com/api_keys)

---

## 🚀 Quick Start | 快速开始

### Option 1: Use Online（在线使用）

Visit the [Live Demo](https://lifa-su.com/ai-translator) directly — no installation needed!

### Option 2: Run Locally（本地运行）

```bash
# Clone the repository
git clone https://github.com/Lifa-su/ai-translator.git

# Open in browser — that's it!
open ai-translator/index.html
```

### Setup（配置）

1. Click the **⚙️ API Settings** button in the top-right corner
2. Enter your [DeepSeek API Key](https://platform.deepseek.com/api_keys)（输入你的 DeepSeek API Key）
3. Start translating! 🎉

---

## 🛠 Tech Stack | 技术栈

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5 + CSS3 + Vanilla JavaScript |
| AI Engine | [DeepSeek Chat API](https://platform.deepseek.com/) (`deepseek-chat`) |
| Storage | `localStorage` (API Key + History) |
| Deployment | GitHub Pages + GitHub Actions |
| Architecture | Single-file SPA, zero dependencies |

---

## 📦 Project Structure | 项目结构

```
ai-translator/
├── index.html          # 🎯 All-in-one app (HTML + CSS + JS)
├── .github/
│   └── workflows/
│       └── static.yml  # 🚀 GitHub Pages auto-deploy
├── LICENSE             # 📄 MIT License
└── README.md           # 📖 This file
```

> Yes, the entire app is a single HTML file. Simple is beautiful. ✨

---

## 🤝 Contributing | 贡献指南

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Ideas for Contribution

- 🌐 Add more languages
- 🎨 UI/UX improvements
- 🔧 Support for more AI providers (OpenAI, Claude, etc.)
- 📱 PWA support
- 🌙 Dark mode

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="center">

**If you find this project useful, please give it a ⭐!**

**如果觉得这个项目有用，请给个 Star ⭐ 支持一下！**

Made with ❤️ by [Lifa-su](https://github.com/Lifa-su)

</div>
