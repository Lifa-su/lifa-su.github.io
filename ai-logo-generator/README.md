# AI Logo 生成器

基于 DeepSeek AI 的智能 Logo 生成工具。输入品牌名称、行业和风格偏好，AI 自动生成 Logo 设计方案和 SVG 代码。

## 功能特性

- 🎨 **5种设计风格** — 极简、科技、自然、复古、可爱
- 🤖 **AI 智能生成** — DeepSeek 大模型生成 Logo 方案描述 + SVG 代码
- 👁️ **实时预览** — 即时渲染 SVG Logo 预览
- 📥 **多格式下载** — 支持 SVG 和 PNG 格式导出
- 🎯 **自定义配色** — 预设配色方案或自定义颜色
- 📝 **历史记录** — 本地保存生成历史，随时回顾
- 📱 **响应式设计** — 适配桌面和移动端

## 使用方法

1. 打开 `index.html`
2. 设置 DeepSeek API Key（[获取地址](https://platform.deepseek.com/api_keys)）
3. 输入品牌名称和行业
4. 选择设计风格和配色
5. 点击「生成 Logo 方案」
6. 预览并下载 SVG 或 PNG

## 技术栈

- 纯前端：HTML + CSS + JavaScript（单文件，无依赖）
- AI：DeepSeek API（deepseek-chat 模型）
- 图形：SVG 生成 + Canvas 转 PNG

## 隐私

API Key 仅存储在浏览器 localStorage 中，不会上传到任何服务器。
