# 🧪 AI 单元测试生成器

基于 DeepSeek API 的 AI 单元测试自动生成工具。粘贴代码，一键生成完整单元测试。

## 功能

- **多语言支持** — JavaScript / TypeScript / Python / Go / Java
- **多框架支持** — Jest / Vitest / pytest / Go test / JUnit 5
- **智能生成** — 边界条件、异常处理、Mock/Stub 自动覆盖
- **覆盖率分析** — AI 预估测试覆盖率并给出优化建议
- **流式输出** — 实时显示生成过程
- **代码高亮** — highlight.js 语法高亮
- **一键复制** — 生成的测试代码一键复制到剪贴板
- **响应式设计** — 适配桌面和移动端

## 使用

1. 用浏览器打开 `index.html`
2. 输入你的 [DeepSeek API Key](https://platform.deepseek.com/)（自动保存到 localStorage）
3. 选择编程语言和测试框架
4. 粘贴源代码
5. 点击「生成测试」

## 技术栈

- 纯前端：HTML + CSS + JavaScript（无构建工具）
- DeepSeek Chat API（流式输出）
- highlight.js（代码高亮）

## License

MIT
