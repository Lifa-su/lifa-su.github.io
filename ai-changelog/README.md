# AI Changelog Generator

粘贴 Git Log → AI 生成结构化更新日志。纯前端单页应用，基于 DeepSeek API。

## 功能

- **结构化 Changelog** — 遵循 [Keep a Changelog](https://keepachangelog.com) 格式
- **语义化版本建议** — 自动判断 major/minor/patch
- **分类归档** — Added / Changed / Deprecated / Removed / Fixed / Security
- **多语言输出** — 中文、英文、中英双语
- **发布说明** — 面向非技术用户的友好描述
- **导出 Markdown** — 复制或下载 `.md` 文件
- **历史版本管理** — 本地存储，随时回溯

## 使用

1. 浏览器打开 `index.html`
2. 输入 [DeepSeek API Key](https://platform.deepseek.com/)
3. 粘贴 git log 或 commit 列表
4. 点击「生成 Changelog」或「生成发布说明」

## 技术栈

- 单文件 HTML + CSS + JS（零依赖）
- DeepSeek Chat API
- localStorage 持久化
- 响应式暗色主题

## License

MIT
