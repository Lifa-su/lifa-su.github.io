# AI JSON 工具箱 🔧

一个纯前端的 AI JSON 工具箱，单页 HTML 实现，无需后端。

## 功能

- **JSON 格式化 / 压缩** — 美化或压缩 JSON，带语法高亮
- **JSON → TypeScript** — 自动推断并生成 TypeScript 接口定义
- **JSON → Go Struct** — 生成 Go 结构体代码
- **JSON → Python Dataclass** — 生成 Python dataclass 代码
- **JSON Diff 对比** — 逐行对比两段 JSON 的差异
- **AI 解释 JSON 结构** — 使用 DeepSeek API 智能分析 JSON 结构和含义

## 使用

直接用浏览器打开 `index.html` 即可，无需安装任何依赖。

```bash
open index.html
# 或
python3 -m http.server 8080
```

AI 解释功能需要填入 [DeepSeek API Key](https://platform.deepseek.com/)（页面右上角输入框）。

## 快捷键

- `Ctrl/Cmd + Enter` — 执行当前标签页操作

## 技术栈

- 纯 HTML + CSS + JS，零依赖
- DeepSeek API（仅 AI 解释功能）
- 响应式设计，支持移动端

## License

MIT
