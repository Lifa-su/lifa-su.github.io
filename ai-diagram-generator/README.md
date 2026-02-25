# AI 图表生成器

基于 DeepSeek API + Mermaid.js 的 AI 图表生成器。输入自然语言描述，自动生成流程图、时序图、类图、甘特图、思维导图等。

## 功能

- 自然语言描述 → AI 生成 Mermaid 代码 → 实时渲染图表
- 支持图表类型：流程图、时序图、类图、甘特图、思维导图
- 在线编辑 Mermaid 代码，实时预览
- 导出 PNG（2x 高清）/ SVG
- 内置模板快速开始
- 缩放控制
- 深色主题，响应式设计
- 快捷键：`Cmd/Ctrl + Enter` 生成/渲染

## 使用

1. 浏览器打开 `index.html`
2. 输入 DeepSeek API Key（[申请地址](https://platform.deepseek.com/)）
3. 选择图表类型，输入描述，点击生成
4. 或切换到编辑器标签页，直接编写 Mermaid 代码

## 技术栈

- 纯前端单页应用（HTML + CSS + JS）
- [Mermaid.js](https://mermaid.js.org/) v11 图表渲染
- [DeepSeek API](https://platform.deepseek.com/) AI 生成
- 零依赖，无需构建

## License

MIT
