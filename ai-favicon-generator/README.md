# AI Favicon 生成器

一个纯前端的 AI Favicon/图标生成器工具，支持文字图标和 Emoji 图标，集成 DeepSeek AI 智能推荐。

## 功能

- **文字图标** — 自定义文字（1-2字符）、字体、颜色、背景色、字号比例
- **Emoji 图标** — 从预设列表选择或手动输入 Emoji
- **形状选择** — 圆形、圆角、方形
- **AI 智能推荐** — 输入品牌名，DeepSeek AI 自动推荐 emoji + 配色方案
- **实时预览** — 主预览 + 多尺寸预览 + 浏览器标签页效果预览
- **多尺寸导出** — 16×16、32×32、180×180、512×512 PNG
- **ICO 导出** — 标准 ICO 格式（含 16×16 和 32×32）
- **浏览器标签页实时更新** — 编辑时页面 favicon 同步变化

## 使用

直接在浏览器中打开 `index.html` 即可使用，无需安装任何依赖。

```bash
open index.html
# 或
python3 -m http.server 8080
```

### AI 推荐功能

1. 点击「⚙️ 设置 DeepSeek API Key」
2. 输入你的 [DeepSeek API Key](https://platform.deepseek.com/)
3. 输入品牌名称，点击「✨ AI 推荐」
4. 从生成的方案中选择喜欢的应用

## 技术栈

- 纯 HTML + CSS + JS（零依赖）
- Canvas API 绘制图标
- DeepSeek Chat API（AI 推荐）
- ICO 文件格式手动编码
- CSS Grid + 响应式设计

## 浏览器兼容

Chrome / Edge / Firefox / Safari 现代版本均支持。

## License

MIT
