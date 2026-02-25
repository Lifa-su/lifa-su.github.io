# AI .env Generator & Manager

AI驱动的环境变量生成、管理、加密与文档工具。纯前端单页应用，无需后端。

## 功能

- **AI生成** — 输入项目类型，DeepSeek AI自动生成.env模板
- **对比检查** — .env与.env.example差异对比，发现缺失/多余变量
- **敏感检测** — 自动识别密钥、Token、密码等敏感值并警告
- **文档生成** — AI或本地自动生成环境变量Markdown文档
- **多环境管理** — Development/Staging/Production三环境切换与AI同步
- **加密解密** — AES-256-GCM + PBKDF2加密保护.env文件
- **格式验证** — 语法检查、重复键检测、引号匹配、自动修复

## 使用

1. 用浏览器打开 `index.html`
2. 点击右上角「API设置」配置DeepSeek API Key
3. 选择功能标签页开始使用

```bash
# 直接打开
open index.html

# 或用本地服务器
npx serve .
```

## 技术栈

- 纯HTML + CSS + JavaScript（零依赖）
- DeepSeek API（AI功能）
- Web Crypto API（AES-256-GCM加密）
- LocalStorage（数据持久化）
- 响应式设计，支持移动端

## API配置

需要DeepSeek API Key，获取地址：https://platform.deepseek.com

支持自定义API Base URL，兼容其他OpenAI格式的API服务。

## License

MIT
