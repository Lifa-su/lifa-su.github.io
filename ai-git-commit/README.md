# AI Git Commit Message Generator

基于 DeepSeek API 的 AI Git Commit Message 生成器，纯前端单页应用。

## 功能

- 粘贴 git diff，AI 自动生成规范的 commit message
- 支持 Conventional Commits、Angular、Emoji 三种规范
- 支持中英文生成
- 批量生成多个候选 message（1-5条）
- 一键复制（标题 / 完整message）
- 内置示例 diff，快速体验
- 现代暗色 UI，响应式设计
- API Key 本地存储，安全便捷

## 使用

1. 浏览器打开 `index.html`
2. 输入 DeepSeek API Key（[获取](https://platform.deepseek.com/)）
3. 粘贴 git diff 内容
4. 选择规范、语言、生成数量
5. 点击生成 或 `Ctrl/Cmd + Enter`

## 技术栈

- 纯 HTML + CSS + JS，零依赖
- DeepSeek Chat API (`deepseek-chat`)
- CSS Grid + Flexbox 响应式布局
- GitHub 暗色主题风格

## License

MIT
