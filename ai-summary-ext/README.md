<div align="center">

# 🤖 AI Summary — Smart Web Page Summarizer

**One-click AI-powered summaries for any web page. Stop reading, start understanding.**

一键 AI 智能网页摘要，支持中英文自动识别，让阅读效率飞起来 🚀

[![GitHub stars](https://img.shields.io/github/stars/Lifa-su/ai-summary-ext?style=social)](https://github.com/Lifa-su/ai-summary-ext/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Lifa-su/ai-summary-ext?style=social)](https://github.com/Lifa-su/ai-summary-ext/network/members)
[![GitHub license](https://img.shields.io/github/license/Lifa-su/ai-summary-ext?color=blue)](https://github.com/Lifa-su/ai-summary-ext/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/Lifa-su/ai-summary-ext?color=orange)](https://github.com/Lifa-su/ai-summary-ext/issues)
[![Chrome Manifest V3](https://img.shields.io/badge/Manifest-V3-brightgreen?logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/)
[![Powered by DeepSeek](https://img.shields.io/badge/AI-DeepSeek-blueviolet?logo=openai&logoColor=white)](https://platform.deepseek.com/)

</div>

---

<!-- 📸 Screenshots — replace with actual screenshots -->
<div align="center">
  <img src="https://via.placeholder.com/700x400?text=AI+Summary+Screenshot" alt="AI Summary Demo" width="700"/>
  <br/>
  <em>👆 Replace with actual extension screenshot</em>
</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🖱️ **One-Click Summary** | Click the icon or use keyboard shortcut — get a summary in seconds |
| 🌐 **Bilingual Auto-Detection** | Automatically detects Chinese & English, outputs in the same language |
| 📏 **3 Summary Lengths** | Brief (~100 words), Standard (~300 words), or Detailed (~600 words) |
| 📚 **Summary History** | Auto-saves your last 50 summaries for easy reference |
| 📝 **Markdown Export** | One-click export to `.md` file for notes & documentation |
| ⌨️ **Keyboard Shortcut** | `Ctrl+Shift+S` (Mac: `Cmd+Shift+S`) for power users |
| 🌙 **Beautiful Dark UI** | Clean, minimal popup that doesn't get in your way |
| 🔒 **Privacy First** | No tracking, no analytics — your data stays on your device |

## 🚀 Quick Start

### Installation (Developer Mode / 开发者模式安装)

1. Clone this repo:
   ```bash
   git clone https://github.com/Lifa-su/ai-summary-ext.git
   ```
2. Open Chrome → navigate to `chrome://extensions/`
3. Enable **Developer Mode** (top-right toggle)
4. Click **"Load unpacked"** → select the `ai-summary-ext` folder
5. The extension icon appears in your toolbar — you're all set! 🎉

### Configure API Key

1. Click the extension icon → tap the ⚙️ **Settings** gear
2. Enter your **DeepSeek API Key**
   - Get one at [platform.deepseek.com](https://platform.deepseek.com/api_keys) (pricing is extremely affordable)
3. Save → Start summarizing!

## 📖 Usage

1. Open any web page
2. Click the **AI Summary** icon (or press `Ctrl+Shift+S` / `Cmd+Shift+S`)
3. Choose summary length: **Brief** / **Standard** / **Detailed**
4. Click **"✨ Summarize"**
5. Copy, export to Markdown, or browse your history

## 💰 Pricing

| Plan | Price | Includes |
|------|-------|----------|
| 🆓 Free | $0 | 5 summaries / day |
| ⭐ Pro | $3.99/mo | Unlimited summaries |

## 💡 Perfect For

- 📖 **Researchers** scanning multiple papers
- 🎓 **Students** studying online materials
- 💼 **Professionals** catching up on industry news
- ✍️ **Content creators** gathering information
- ⏰ **Anyone** who values their time

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Chrome Manifest V3](https://developer.chrome.com/docs/extensions/mv3/) | Extension framework |
| Vanilla JavaScript | Zero dependencies, lightweight & fast |
| [DeepSeek API](https://platform.deepseek.com/) | AI-powered summarization (deepseek-chat) |
| Content Script | Smart article content extraction |

## 📦 Project Structure

```
ai-summary-ext/
├── manifest.json       # Extension config (Manifest V3)
├── popup.html          # Popup UI
├── popup.css           # Styles (dark theme)
├── popup.js            # Popup logic & interactions
├── content.js          # Web page content extraction
├── background.js       # Service worker (API calls, usage tracking)
├── icons/              # Extension icons (16/48/128px)
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Feel free to [open an issue](https://github.com/Lifa-su/ai-summary-ext/issues) for bug reports, feature requests, or questions.

## 📄 License

This project is open source. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**If you find this useful, give it a ⭐ — it helps a lot!**

如果觉得好用，请给个 ⭐ Star 支持一下！

Made with ❤️ by [Lifa-su](https://github.com/Lifa-su)

</div>
