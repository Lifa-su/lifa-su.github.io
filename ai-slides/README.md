# 🎯 AI Slides Generator

AI 驱动的演示文稿生成器 — 输入主题，一键生成精美 Slides。

## 功能

- **AI 生成** — 输入主题/大纲，DeepSeek AI 自动生成完整演示文稿
- **5 种主题风格** — 商务、科技、教育、创意、极简
- **Markdown 支持** — 标题、列表、粗体、代码块、表格、引用、图片
- **代码高亮** — 支持 JS/TS/Python/Java/Rust/Go/SQL/Bash 等语言
- **演讲者备注** — AI 自动生成，可手动编辑
- **演示模式** — 类 reveal.js 全屏演示，支持键盘导航
- **幻灯片编辑** — 可视化编辑每页 Markdown 内容
- **导出 HTML** — 导出独立可演示的 HTML 文件
- **导出 Markdown** — 导出完整 Markdown 文档
- **响应式设计** — 适配桌面和移动端

## 使用

1. 用浏览器打开 `index.html`
2. 输入 DeepSeek API Key（[获取](https://platform.deepseek.com/)）
3. 输入演示主题和大纲（可选）
4. 选择主题风格和幻灯片数量
5. 点击「生成演示文稿」

## 快捷键

| 按键 | 功能 |
|------|------|
| `←` `↑` `PageUp` | 上一页 |
| `→` `↓` `PageDown` `Space` | 下一页 |
| `F` | 进入/退出演示模式 |
| `E` | 编辑当前幻灯片 |
| `Home` | 跳到第一页 |
| `End` | 跳到最后一页 |
| `Esc` | 退出演示模式 |

## 技术栈

- 纯前端：HTML + CSS + JavaScript（零依赖）
- AI：DeepSeek Chat API
- 单文件实现，无需构建工具

## License

MIT
