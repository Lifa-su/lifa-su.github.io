# AI Legal Doc Generator / AI法律文档生成器

AI驱动的隐私政策、服务条款、Cookie政策生成器。基于DeepSeek API，通过问卷式引导快速生成专业法律文档。

## 功能特性

- **多种文档类型**：隐私政策、服务条款、Cookie政策
- **多法规支持**：GDPR（欧盟）、CCPA（加州）、中国个人信息保护法（PIPL）
- **问卷式引导**：4步问卷收集信息（基本信息→数据收集→第三方与合规→输出设置）
- **多语言输出**：中文、英文、中英双语
- **流式生成**：实时显示AI生成进度
- **导出格式**：Markdown (.md) 和 HTML (.html) 文件下载
- **历史管理**：本地存储历史文档，支持查看、加载、删除
- **响应式设计**：适配桌面和移动端

## 快速开始

1. 获取 [DeepSeek API Key](https://platform.deepseek.com/)
2. 用浏览器打开 `index.html`
3. 输入 API Key 并保存
4. 按步骤填写问卷，点击"生成文档"

## 技术栈

- 纯前端：单页 HTML + CSS + JavaScript
- AI：DeepSeek Chat API（流式输出）
- 存储：localStorage（API Key + 历史文档）
- 无需后端、无需构建工具、无需依赖

## 文件结构

```
ai-legal-docs/
├── index.html   # 完整应用（HTML+CSS+JS）
└── README.md    # 说明文档
```

## License

MIT
