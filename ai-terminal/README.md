# AI Terminal Command Generator

智能终端命令生成器 — 用自然语言描述需求，AI 帮你生成终端命令。

## 功能

- **命令生成** — 自然语言描述 → bash/zsh/PowerShell 命令
- **命令解释** — 粘贴命令，AI 逐部分解释含义
- **管道组合** — 描述数据处理流程，生成管道命令
- **危险警告** — 自动检测 `rm -rf`、`chmod 777`、`dd`、fork bomb 等危险命令
- **速查手册** — 文件操作、网络、进程、Git、Docker、文本处理常用命令
- **命令历史** — 本地存储，支持回溯和删除
- **多平台** — Linux/Bash、macOS/Zsh、Windows/PowerShell
- **一键复制** — 点击即复制到剪贴板
- **快捷键** — `Cmd/Ctrl + Enter` 快速执行

## 使用

1. 浏览器打开 `index.html`
2. 输入 [DeepSeek API Key](https://platform.deepseek.com/)（自动保存到 localStorage）
3. 选择平台，输入描述，生成命令

## 技术栈

- 纯前端：HTML + CSS + JavaScript（单文件，零依赖）
- AI：DeepSeek API (`deepseek-chat`)
- UI：终端风格（黑底绿字）

## 截图

```
┌──────────────────────────────────────────┐
│  $ AI Terminal Command Generator_        │
│  自然语言 → 终端命令 | Powered by DeepSeek│
│                                          │
│  [⌨ 生成] [📖 解释] [🔗 管道] [📋 速查]  │
│                                          │
│  > 描述你想做什么                          │
│  ┌────────────────────────────────────┐  │
│  │ 查找大于100MB的文件并按大小排序     │  │
│  └────────────────────────────────────┘  │
│  [生成命令]                               │
│                                          │
│  find . -size +100M -exec ls -lh {} \;   │
│    | sort -k5 -h                         │
└──────────────────────────────────────────┘
```

## License

MIT
