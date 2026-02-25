# 🐳 AI Docker Compose Generator

用自然语言描述你的架构，AI 帮你生成 `docker-compose.yml`。

## 功能

- **AI 生成** — 自然语言描述架构需求，通过 DeepSeek API 生成 docker-compose.yml
- **预设模板** — LAMP、MERN、Django+PostgreSQL、Laravel+MySQL、WordPress、Next.js 等一键使用
- **可视化编辑器** — 添加/删除服务、端口映射、环境变量、数据卷、依赖关系
- **依赖关系图** — SVG 可视化服务间的依赖关系
- **YAML 语法高亮** — 关键字、字符串、数字、布尔值彩色显示
- **YAML 验证** — 实时验证 YAML 语法正确性
- **一键复制/下载** — 复制到剪贴板或下载为 docker-compose.yml
- **配置说明** — 自动解释 YAML 中使用的 Docker Compose 配置项
- **响应式设计** — 支持桌面和移动端

## 使用

1. 直接用浏览器打开 `index.html`
2. 输入你的 [DeepSeek API Key](https://platform.deepseek.com/)（保存在浏览器本地）
3. 三种方式生成配置：
   - **AI 生成**：用自然语言描述你的架构
   - **模板**：选择预设模板快速开始
   - **编辑器**：手动添加和配置服务

## 技术栈

- 纯前端：HTML + CSS + JavaScript（单文件，无需构建）
- [js-yaml](https://github.com/nodeca/js-yaml) — YAML 解析和验证
- [DeepSeek API](https://platform.deepseek.com/) — AI 生成

## License

MIT
