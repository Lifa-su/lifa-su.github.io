# 🚀 AI 社交媒体帖子生成器

基于 DeepSeek API 的多平台社交媒体内容生成工具。输入主题，一键生成适配各平台风格的帖子。

## 功能

- **多平台生成** — Twitter/X、LinkedIn、Instagram、小红书、微博、抖音文案
- **自动适配** — 每个平台自动遵守字数限制和内容风格
- **Hashtag 推荐** — AI 智能推荐相关标签
- **Emoji 智能插入** — 根据内容和平台自动添加表情
- **一周内容日历** — 生成 7 天发布计划，合理分配平台和节奏
- **A/B 版本对比** — 同一主题生成两种不同切入角度的版本
- **一键复制** — 点击即可复制各平台版本内容
- **语气风格选择** — 专业正式 / 轻松活泼 / 幽默搞笑 / 励志激励 / 知识科普

## 使用方法

1. 用浏览器打开 `index.html`
2. 输入你的 [DeepSeek API Key](https://platform.deepseek.com/)，点击保存
3. 输入主题/产品名称，选择语气和目标平台
4. 点击「生成帖子」「生成一周日历」或「A/B 版本对比」

## 技术栈

- 纯前端：HTML + CSS + JavaScript（无框架依赖）
- AI：DeepSeek Chat API (`deepseek-chat`)
- 响应式设计，支持移动端

## 注意事项

- 需要有效的 DeepSeek API Key（API Key 保存在浏览器 localStorage）
- 纯前端调用 API，无后端服务
- 建议使用现代浏览器（Chrome / Firefox / Safari / Edge）

## License

MIT
