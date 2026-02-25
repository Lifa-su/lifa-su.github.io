# AI 正则表达式生成器

用自然语言描述匹配规则，AI 帮你生成正则表达式。纯前端单页应用，基于 DeepSeek API。

## 功能

- **自然语言生成正则** — 描述你想匹配的内容，AI 自动生成对应正则表达式
- **实时测试** — 输入测试文本，高亮显示所有匹配结果
- **AI 解释** — 逐段解读正则表达式每个部分的含义
- **模板库** — 内置 12 个常用正则模板（邮箱、手机号、URL、IP、身份证等）
- **多语言支持** — 生成 JavaScript / Python / Java 语法的正则
- **正则标志** — 支持 g / i / m / s 标志切换
- **响应式设计** — 适配桌面和移动端

## 使用

1. 直接用浏览器打开 `index.html`
2. 输入你的 [DeepSeek API Key](https://platform.deepseek.com/)（存储在本地 localStorage）
3. 用自然语言描述你的匹配规则，点击「生成正则」
4. 在测试区域验证匹配效果

## 技术栈

- 纯 HTML + CSS + JavaScript，无任何依赖
- DeepSeek Chat API (`deepseek-chat` 模型)
- CSS Grid 响应式布局
- 暗色主题 UI

## 文件结构

```
index.html  — 页面结构
style.css   — 样式
app.js      — 逻辑
```

## License

MIT
