# AI Markdown Editor

一个 AI 增强的 Markdown 编辑器，纯前端单页应用。

## 功能

- **分屏编辑** — 左侧 Markdown 编辑，右侧实时预览，可拖拽调整比例
- **AI 辅助写作** — 续写、改写、翻译、摘要（基于 DeepSeek API）
- **工具栏** — 标题、粗体、斜体、删除线、链接、图片、代码块、表格、引用、列表、分割线
- **代码高亮** — 基于 highlight.js，支持 180+ 语言
- **目录生成** — 自动从标题提取 TOC，点击跳转
- **字数统计** — 字符数、词数（含中文）、预估阅读时间
- **导出** — HTML / PDF
- **本地保存** — 自动保存到 localStorage，无需后端
- **多文档管理** — 创建、切换、删除多个文档
- **快捷键** — Ctrl/Cmd + B/I/K/S/E/1~3, Ctrl+Shift+N 新建

## 快速开始

直接用浏览器打开 `index.html` 即可使用。

```bash
open index.html
# 或
python3 -m http.server 8080 && open http://localhost:8080
```

## AI 功能配置

1. 点击右上角 ⚙️ 打开设置
2. 填入 DeepSeek API Key（从 [platform.deepseek.com](https://platform.deepseek.com) 获取）
3. 保存即可使用 AI 续写、改写、翻译、摘要功能

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| Ctrl/Cmd + B | 粗体 |
| Ctrl/Cmd + I | 斜体 |
| Ctrl/Cmd + K | 插入链接 |
| Ctrl/Cmd + S | 保存 |
| Ctrl/Cmd + E | 导出 HTML |
| Ctrl/Cmd + 1/2/3 | 一/二/三级标题 |
| Ctrl/Cmd + Shift + N | 新建文档 |
| Tab / Shift+Tab | 缩进/取消缩进 |

## 技术栈

- 纯 HTML + CSS + JavaScript，无构建工具
- [marked.js](https://marked.js.org/) — Markdown 解析
- [highlight.js](https://highlightjs.org/) — 代码语法高亮
- [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) — PDF 导出
- [DeepSeek API](https://platform.deepseek.com) — AI 写作辅助

## License

MIT
