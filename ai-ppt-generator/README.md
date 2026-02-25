# AI PPT Generator - AI演示文稿生成器

基于 DeepSeek API 的 AI 演示文稿生成器 MVP。输入主题，AI 自动生成完整 PPT 大纲和内容，支持在线预览和导出。

## 功能特性

- **AI 智能生成** — 输入主题即可生成完整 PPT 大纲与内容（基于 DeepSeek API）
- **4种模板风格** — 商务、科技、教育、创意，一键切换
- **幻灯片预览** — 类 reveal.js 效果，支持键盘导航和全屏演示
- **导出 Markdown** — 一键导出为 Markdown 格式
- **纯前端实现** — 单个 HTML 文件，无需后端，打开即用
- **响应式设计** — 适配桌面和移动端
- **本地存储** — API Key 保存在浏览器本地，安全便捷

## 快速开始

1. 直接用浏览器打开 `index.html`
2. 点击右上角 ⚙️ 设置，填入你的 [DeepSeek API Key](https://platform.deepseek.com)
3. 输入演示主题，选择模板风格
4. 点击「✨ 生成演示文稿」
5. 使用 ← → 键或底部按钮切换幻灯片

## 操作说明

| 操作 | 方式 |
|------|------|
| 切换幻灯片 | ← → 方向键 / 点击侧边栏缩略图 |
| 全屏演示 | 点击「⛶ 全屏」按钮 |
| 退出全屏 | ESC 键 |
| 导出 Markdown | 点击「📄 导出MD」按钮 |
| 切换模板 | 点击左侧模板卡片，实时预览 |

## 技术栈

- HTML5 + CSS3 + Vanilla JavaScript
- DeepSeek API（chat completions）
- CSS Grid / Flexbox 响应式布局
- LocalStorage 持久化配置

## 项目结构

```
ai-ppt-generator/
├── index.html    # 单页应用（HTML + CSS + JS 全部内联）
└── README.md     # 项目说明
```

## 自定义 API

支持自定义 API Base URL，兼容所有 OpenAI 格式的 API 服务。在设置中修改 Base URL 即可。

## License

MIT
