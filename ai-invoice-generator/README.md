# AI 发票生成器 | AI Invoice Generator

一个基于纯前端的 AI 发票/收据生成器工具，支持多模板、多币种、AI 智能优化和 PDF 导出。

A pure frontend AI-powered invoice/receipt generator with multiple templates, multi-currency support, AI optimization, and PDF export.

## 功能特性 | Features

- 📝 填写发票信息（公司名、地址、项目明细、税率）
- 🤖 AI 自动补全和优化描述（DeepSeek API）
- 🎨 多种发票模板（简约、专业、创意）
- 🧮 自动计算小计、税额、折扣、总计
- 💱 多币种支持（CNY、USD、EUR、GBP、JPY、KRW、HKD）
- 📄 导出 PDF（html2canvas + jsPDF）
- 💾 历史发票管理（localStorage）
- 🌐 中英文界面切换
- 📱 响应式设计，支持移动端

## 快速开始 | Quick Start

直接在浏览器中打开 `index.html` 即可使用，无需安装任何依赖。

```bash
# 或使用本地服务器
cd ai-invoice-generator
python3 -m http.server 8080
# 访问 http://localhost:8080
```

## AI 功能配置 | AI Setup

1. 点击右上角 ⚙️ 设置按钮
2. 输入你的 DeepSeek API Key（[获取 API Key](https://platform.deepseek.com/)）
3. 保存设置
4. 在项目明细中点击 ✨ 按钮即可使用 AI 优化描述

API Key 仅存储在浏览器本地，不会上传到任何服务器。

## 技术栈 | Tech Stack

- HTML5 + CSS3 + Vanilla JavaScript
- [jsPDF](https://github.com/parallax/jsPDF) - PDF 生成
- [html2canvas](https://html2canvas.hertzen.com/) - HTML 转 Canvas
- [DeepSeek API](https://platform.deepseek.com/) - AI 文本优化

## 项目结构 | Structure

```
ai-invoice-generator/
├── index.html    # 主页面
├── style.css     # 样式文件
├── app.js        # 应用逻辑
└── README.md     # 说明文档
```

## License

MIT
