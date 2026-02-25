# 🛡️ AI Badge Generator

GitHub README 徽章/Badge 生成器 — 一个纯前端的可视化工具，帮你快速生成漂亮的 README 徽章。

![License: MIT](https://img.shields.io/badge/license-MIT-green)
![Made with](https://img.shields.io/badge/made_with-❤️-red)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

## ✨ 功能特性

- **可视化编辑器** — 实时预览，所见即所得编辑标签、消息、颜色、样式
- **50+ 预设徽章** — 构建状态、版本、许可证、社交、下载量、代码质量、技术栈、平台、文档等分类
- **shields.io 集成** — 直接生成标准 shields.io 徽章 URL
- **自定义 Logo** — 支持上传自定义 Logo（Base64/URL）
- **多种排列方式** — 横排、竖排、分组预览
- **多格式输出** — Markdown / HTML / reStructuredText / 纯 URL
- **一键复制** — 生成的代码一键复制到剪贴板
- **AI 智能推荐** — 输入项目描述，AI 自动推荐合适的徽章组合（DeepSeek API）
- **拖拽排序** — 拖拽调整徽章顺序
- **双击编辑** — 双击已添加的徽章可快速编辑
- **深色主题** — 现代 GitHub 风格深色 UI
- **响应式设计** — 支持桌面和移动端

## 🚀 快速开始

纯前端项目，无需安装任何依赖，直接打开即可使用：

```bash
# 克隆项目
git clone https://github.com/your-username/ai-badge-generator.git

# 直接用浏览器打开
open ai-badge-generator/index.html
```

或者使用任意 HTTP 服务器：

```bash
cd ai-badge-generator
python3 -m http.server 8080
# 访问 http://localhost:8080
```

## 🤖 AI 推荐功能

AI 推荐功能使用 DeepSeek API，需要配置 API Key：

1. 前往 [DeepSeek Platform](https://platform.deepseek.com/) 获取 API Key
2. 点击页面右上角 🔑 按钮设置 API Key
3. 在 AI 推荐标签页输入项目描述
4. AI 会自动推荐 8-15 个最合适的徽章

> API Key 仅保存在浏览器 localStorage 中，不会上传到任何服务器。

## 📖 使用方法

### 自定义徽章
1. 在左侧「编辑器」标签页填写标签、消息、颜色等信息
2. 实时预览区域会即时显示效果
3. 点击「添加到预览」将徽章加入集合

### 预设徽章
1. 切换到「预设」标签页
2. 浏览或搜索 50+ 预设徽章
3. 点击任意徽章即可添加

### AI 推荐
1. 切换到「AI 推荐」标签页
2. 输入项目描述和类型
3. 点击「AI 推荐徽章」
4. 可单个添加或全部添加推荐结果

### 导出
- 在右侧预览区域调整排列方式（横排/竖排/分组）
- 切换输出格式（Markdown/HTML/reStructuredText/URL）
- 点击「复制」按钮一键复制代码

## 🛠️ 技术栈

- **HTML5 + CSS3 + Vanilla JavaScript** — 零依赖，纯前端实现
- **shields.io** — 徽章渲染服务
- **DeepSeek API** — AI 推荐引擎
- **CSS Custom Properties** — 主题系统
- **Drag & Drop API** — 拖拽排序

## 📄 License

MIT
