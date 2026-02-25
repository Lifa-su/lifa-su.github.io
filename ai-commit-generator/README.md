# AI Git Commit Message Generator

粘贴 `git diff`，AI 自动生成规范的 Conventional Commits 格式 commit message。

## 功能

- 粘贴 git diff → AI 生成 commit message
- 支持 Conventional Commits 格式（feat/fix/docs/style/refactor 等）
- 中英文 commit message 切换
- 三种详细程度：简洁 / 标准 / 详细
- 一键复制，⌘+Enter 快捷生成
- Diff 统计（文件数、增删行数）
- API Key 本地存储
- 深色主题，响应式设计

## 使用

1. 打开 `index.html`
2. 输入 [DeepSeek API Key](https://platform.deepseek.com/)
3. 粘贴 `git diff --staged` 或 `git diff HEAD` 的输出
4. 选择语言和详细程度
5. 点击生成，复制结果

## 技术栈

纯前端单页应用：HTML + CSS + JavaScript，无需构建工具或后端服务。

## License

MIT
