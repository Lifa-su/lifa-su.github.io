# AI README Generator

输入项目信息，AI 自动生成专业的 README.md 文件。

## 功能

- 🤖 DeepSeek AI 驱动，流式生成专业 README
- 📝 4 种模板：开源项目 / NPM 包 / API 文档 / 个人项目
- 🎛️ 可选章节：badges、目录、功能特性、安装指南、使用方法、API 文档、贡献指南等
- 👀 实时 Markdown 预览 + 源码编辑
- 📋 一键复制 / 下载 .md 文件
- 🌐 支持中文 / 英文 / 双语输出
- 🎨 暗色主题，响应式设计
- 🔑 API Key 本地存储（localStorage）

## 使用

1. 用浏览器打开 `index.html`
2. 输入 DeepSeek API Key（[获取](https://platform.deepseek.com/)）
3. 填写项目名称、描述、技术栈
4. 选择模板和章节
5. 点击「生成 README」

## 技术栈

HTML + CSS + JavaScript（纯前端，无需构建）

- [marked.js](https://github.com/markedjs/marked) — Markdown 解析
- [Font Awesome](https://fontawesome.com/) — 图标
- [DeepSeek API](https://platform.deepseek.com/) — AI 生成

## License

MIT
