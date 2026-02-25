# AI API Tester

一个基于 AI 的 API 测试工具 MVP，纯前端单页应用，类似 Postman 的简洁版。

## 功能

- **REST API 测试** — 支持 GET / POST / PUT / DELETE
- **AI 生成测试用例** — 输入 API 描述，DeepSeek AI 自动生成多个测试用例
- **请求参数管理** — 可视化编辑 Params、Headers、Body
- **响应美化显示** — JSON 语法高亮，状态码颜色标识，响应时间统计
- **历史记录** — 自动保存到 localStorage，点击可回放
- **快捷键** — `Cmd/Ctrl + Enter` 快速发送请求

## 使用

1. 用浏览器打开 `index.html`
2. 点击右上角 ⚙️ 设置 DeepSeek API Key
3. 输入 URL 发送请求，或输入 API 描述让 AI 生成测试用例

## 技术栈

- 纯 HTML + CSS + JavaScript，无任何依赖
- DeepSeek API（需自行提供 API Key）
- localStorage 持久化

## 截图

深色主题，左侧历史记录面板，右侧请求/响应双栏布局。

## License

MIT
