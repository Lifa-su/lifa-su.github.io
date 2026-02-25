# 🎨 AI Brand Colors - 品牌配色系统生成器

AI 驱动的品牌视觉配色系统生成工具。输入品牌信息，自动生成完整的配色方案，包含主色、辅色、强调色、中性色和语义色。

## 功能特性

- **AI 智能生成** — 基于 DeepSeek API，根据品牌名/行业/风格生成专业配色系统
- **完整色彩体系** — 主色、辅色、强调色、中性色（含 50-950 色阶）、语义色（成功/警告/错误/信息）
- **实时预览** — 模拟真实网站 UI（导航栏、Hero、卡片、表单、提示框）
- **暗色模式** — 自动生成暗色模式配色并预览
- **无障碍检查** — WCAG AA/AAA 对比度检测，确保可访问性
- **多格式导出** — CSS 变量、Tailwind Config、SCSS 变量、Design Token JSON
- **配色历史** — 本地保存生成记录，随时回顾

## 使用方法

1. 用浏览器打开 `index.html`
2. 输入 DeepSeek API Key（[获取 API Key](https://platform.deepseek.com/)）
3. 填写品牌名称、选择行业和风格
4. 点击「生成品牌配色系统」
5. 在各标签页查看配色方案、预览效果、对比度检查、导出代码

## 技术栈

- 纯前端：HTML + CSS + JavaScript（无框架依赖）
- AI：DeepSeek Chat API
- 存储：localStorage（API Key + 配色历史）

## 截图

打开后填写品牌信息 → 点击生成 → 查看配色方案 / 预览 / 对比度 / 导出

## License

MIT
