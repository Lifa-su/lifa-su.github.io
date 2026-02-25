# 🧩 AI 正则表达式助手

基于 DeepSeek API 的智能正则表达式工具，纯前端单页应用。

## 功能

- **AI 生成正则** — 用自然语言描述需求，AI 自动生成正则表达式
- **实时测试** — 输入测试文本，实时高亮显示匹配结果
- **可视化解释** — 自动解析正则结构，逐部分中文说明
- **模板库** — 10个常用正则模板（邮箱、手机号、URL、IP、日期、身份证等）
- **多语言代码** — 一键生成 JavaScript / Python / Java / Go 代码
- **手动输入** — 支持直接输入正则表达式进行测试
- **标志位切换** — g / i / m / s 标志位可视化切换

## 使用

1. 浏览器打开 `index.html`
2. 输入 DeepSeek API Key（[申请地址](https://platform.deepseek.com/)）
3. 用自然语言描述需求，或从模板库选择
4. 查看生成结果、测试匹配、复制代码

## 技术栈

- 纯 HTML + CSS + JS，无任何依赖
- DeepSeek Chat API
- CSS Variables + Grid 响应式布局
- LocalStorage 持久化 API Key

## 截图

深色主题，现代 UI，支持移动端响应式。

## License

MIT
