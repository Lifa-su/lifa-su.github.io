<div align="center">

# 📸 AI ID Photo Generator

**Create professional ID/passport photos instantly in your browser — powered by AI.**

**在线智能证件照生成器 — 一键制作标准证件照，无需安装任何软件。**

[![Stars](https://img.shields.io/github/stars/Lifa-su/ai-id-photo?style=flat-square&logo=github&color=yellow)](https://github.com/Lifa-su/ai-id-photo/stargazers)
[![Forks](https://img.shields.io/github/forks/Lifa-su/ai-id-photo?style=flat-square&logo=github)](https://github.com/Lifa-su/ai-id-photo/network/members)
[![Issues](https://img.shields.io/github/issues/Lifa-su/ai-id-photo?style=flat-square&logo=github)](https://github.com/Lifa-su/ai-id-photo/issues)
[![License](https://img.shields.io/github/license/Lifa-su/ai-id-photo?style=flat-square)](./LICENSE)
[![Deploy](https://img.shields.io/badge/demo-live-brightgreen?style=flat-square&logo=github-pages)](https://lifa-su.com/ai-id-photo)

<br/>

[🎯 Live Demo](https://lifa-su.com/ai-id-photo) · [🐛 Report Bug](https://github.com/Lifa-su/ai-id-photo/issues) · [💡 Request Feature](https://github.com/Lifa-su/ai-id-photo/issues)

</div>

---

## 🖼️ Preview / 预览

<!-- Replace with actual screenshots -->
<div align="center">
  <img src="https://via.placeholder.com/800x450?text=Upload+Photo+%E2%86%92+Select+Size+%E2%86%92+Choose+Background+%E2%86%92+Download" alt="AI ID Photo Demo" width="80%"/>
</div>

> 💡 Try it now: **[https://lifa-su.com/ai-id-photo](https://lifa-su.com/ai-id-photo)**

---

## ✨ Features / 功能特性

- 📷 **Upload & Generate** — Upload any photo, get a standard ID photo in seconds / 上传照片一键生成证件照
- 🎨 **Background Colors** — White, Blue, Red backgrounds for different ID requirements / 白、蓝、红三色背景随心切换
- 📐 **Multiple Sizes** — 1-inch, 2-inch, small 2-inch, passport, visa photo formats / 支持一寸、二寸、小二寸、护照、签证照等多种规格
- ✂️ **Smart Crop** — Intelligent center-top cropping optimized for face positioning / 智能裁剪，自动适配人脸位置
- 🖨️ **Print Layout** — Auto-generate 6-inch print layout with cut lines / 六寸排版照生成，含裁切线
- 📥 **Instant Download** — Download standard photo & print layout directly / 一键下载标准照和排版照
- 🤖 **AI Ready** — Seamless integration with [HivisionIDPhotos](https://github.com/Zeyi-Lin/HivisionIDPhotos) for AI background removal / 可接入 AI 抠图 API
- 🌐 **Zero Install** — Pure browser-based, no backend required for basic usage / 纯前端运行，零依赖零安装
- 📱 **Responsive** — Works on desktop and mobile devices / 适配桌面端和移动端

---

## 📏 Supported Sizes / 支持规格

| Size 规格 | Dimensions 尺寸 (mm) | Pixels 像素 (300 DPI) |
|-----------|----------------------|----------------------|
| 1-inch 一寸 | 25 × 35 | 295 × 413 |
| 2-inch 二寸 | 35 × 49 | 413 × 579 |
| Small 2-inch 小二寸 | 33 × 48 | 390 × 567 |
| Passport 护照 | 33 × 48 | 390 × 567 |
| Visa 签证照 | 35 × 45 | 413 × 531 |

---

## 🚀 Quick Start / 快速开始

No build tools needed. Just open and use.

```bash
# Clone the repo
git clone https://github.com/Lifa-su/ai-id-photo.git
cd ai-id-photo

# Option 1: Open directly
open index.html

# Option 2: Local server
python3 -m http.server 8000
# Visit http://localhost:8000
```

---

## 🤖 AI Mode — HivisionIDPhotos Integration

For production-grade results with AI-powered background removal and face detection, integrate with [HivisionIDPhotos](https://github.com/Zeyi-Lin/HivisionIDPhotos):

```bash
# Deploy AI backend with Docker
docker run -itd --name idphoto \
  --restart=always \
  -p 8080:8080 \
  linzeyi/hivision_idphotos \
  python3 deploy_api.py
```

The AI pipeline:
1. **`POST /idphoto`** — Upload photo → AI matting → transparent background ID photo
2. **`POST /add_background`** — Add solid color background (white/blue/red)
3. **`POST /generate_layout_photos`** — Generate 6-inch print layout

> See the [API documentation](#api-reference) below for full details.

<details>
<summary>📖 API Reference (click to expand)</summary>

### `POST /idphoto` — Generate ID Photo

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input_image` | file | either | Photo file upload |
| `input_image_base64` | string | either | Base64 encoded photo |
| `height` | int | no | Photo height in px (default: 413) |
| `width` | int | no | Photo width in px (default: 295) |
| `human_matting_model` | string | no | Matting model |
| `face_detect_model` | string | no | Face detection model (default: mtcnn) |
| `dpi` | int | no | Resolution (default: 300) |

### `POST /add_background` — Add Background Color

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input_image_base64` | string | yes | Transparent background photo (base64) |
| `color` | string | yes | HEX color, e.g. `#438EDB` |
| `kb` | int | no | Target file size in KB |

### `POST /generate_layout_photos` — Print Layout

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input_image_base64` | string | yes | Photo with background (base64) |
| `height` / `width` | int | no | Photo dimensions in px |
| `kb` | int | no | Target file size in KB |

</details>

---

## 🛠️ Tech Stack / 技术栈

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML / CSS / JavaScript (zero dependencies) |
| AI Backend (optional) | [HivisionIDPhotos](https://github.com/Zeyi-Lin/HivisionIDPhotos) — Python / FastAPI |
| Deployment | GitHub Pages / Docker |

---

## 📦 Project Structure / 项目结构

```
ai-id-photo/
├── index.html          # Main application (all-in-one SPA)
├── README.md           # Documentation
├── LICENSE             # MIT License
└── .github/
    └── workflows/      # GitHub Actions (CI/CD)
```

---

## 💰 Monetization Ideas / 变现思路

Building a mini-program or SaaS? Here are some strategies:

- 🆓 Free preview + paid HD download / 免费预览 + 付费下载高清版
- 🎫 Daily free quota + pay per use / 每日免费次数 + 超出付费
- 💳 Subscription plans (monthly/yearly) / 会员制不限次

> WeChat Mini Program migration guide: convert to WXML/WXSS, deploy backend to cloud server with HTTPS, integrate WeChat Pay.

---

## 🤝 Contributing / 贡献指南

Contributions are welcome! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Feel free to open an [issue](https://github.com/Lifa-su/ai-id-photo/issues) for bugs, feature requests, or questions.

---

## ⭐ Star History

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=Lifa-su/ai-id-photo&type=Date)](https://star-history.com/#Lifa-su/ai-id-photo&Date)

</div>

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="center">

**If this project helps you, please give it a ⭐!**

**如果这个项目对你有帮助，请点个 Star ⭐ 支持一下！**

Made with ❤️ by [Lifa-su](https://github.com/Lifa-su)

</div>
