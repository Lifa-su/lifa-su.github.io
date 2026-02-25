# ⚡ AI SQL Generator

用自然语言描述需求，AI 帮你生成 SQL 语句。

## 功能

- 自然语言 → SQL 生成（DeepSeek API）
- 支持 MySQL / PostgreSQL / SQLite 语法
- SQL 语法高亮显示
- 可选表结构输入，提高生成准确性
- 一键复制 SQL
- API Key 本地保存（localStorage）
- 响应式设计，支持移动端
- Ctrl/Cmd + Enter 快捷生成

## 使用

1. 浏览器打开 `index.html`
2. 输入你的 [DeepSeek API Key](https://platform.deepseek.com/)
3. 选择数据库类型
4. 用自然语言描述你的 SQL 需求
5. 点击「生成 SQL」

## 技术栈

纯前端单页应用，无需构建工具或后端服务。

- HTML + CSS + JavaScript
- DeepSeek Chat API
- 自实现 SQL 语法高亮

## License

MIT
