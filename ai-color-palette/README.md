# 🎨 AI Color Palette Generator

AI 驱动的调色板与渐变生成器，单页纯前端应用。

## 功能

- **AI 配色方案生成** — 输入关键词/心情/场景，通过 DeepSeek API 生成 5 色调色板
- **CSS 渐变生成器** — 支持线性、径向、锥形渐变，可视化编辑色标
- **颜色格式转换** — HEX / RGB / HSL 互转，一键复制
- **WCAG 对比度检查** — 前景/背景色对比度计算，AA/AAA 等级判定
- **调色板导出** — CSS 变量、Tailwind config、SCSS 变量、JSON 格式
- **生成历史** — 本地存储历史配色方案，随时回顾

## 使用

1. 用浏览器打开 `index.html`
2. 输入 DeepSeek API Key（[获取 API Key](https://platform.deepseek.com/)）
3. 输入关键词或选择预设，点击"生成配色"

## 技术栈

- 纯 HTML + CSS + JavaScript，无依赖
- DeepSeek Chat API
- LocalStorage 持久化
- 响应式设计，支持移动端

## 截图预览

打开 `index.html` 即可体验，深色主题 UI，本身就是设计工具的展示。

## License

MIT
