# AI Chat Telegram Bot 🤖

基于 Node.js + grammY + DeepSeek API 的 AI 聊天 Telegram Bot。

## 功能

| 命令 | 说明 |
|------|------|
| `/start` | 欢迎消息 |
| `/chat <消息>` | 与 AI 对话（支持上下文记忆） |
| `/translate <文本>` | 自动检测语言并翻译（中↔英） |
| `/summarize <文本>` | 文本摘要 |
| `/image <描述>` | 生成图片的文字描述 |
| `/clear` | 清除对话记忆 |
| `/usage` | 查看今日用量 |
| `/help` | 帮助菜单 |

## 特性

- ✅ 支持私聊和群聊
- ✅ 对话上下文记忆（最近 10 条）
- ✅ 每日免费使用次数限制（默认 10 次/天）
- ✅ 错误处理和日志记录
- ✅ 优雅关闭

## 快速开始

### 1. 获取 Token

- **Telegram Bot Token**: 在 Telegram 中找 [@BotFather](https://t.me/BotFather)，发送 `/newbot` 创建
- **DeepSeek API Key**: 在 [platform.deepseek.com](https://platform.deepseek.com) 注册获取

### 2. 安装

```bash
cd ai-telegram-bot
npm install
```

### 3. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 填入你的 Token 和 API Key
```

### 4. 运行

```bash
npm start

# 开发模式（自动重启）
npm run dev
```

## 环境变量

| 变量 | 必填 | 说明 | 默认值 |
|------|------|------|--------|
| `BOT_TOKEN` | ✅ | Telegram Bot Token | - |
| `DEEPSEEK_API_KEY` | ✅ | DeepSeek API Key | - |
| `DEEPSEEK_BASE_URL` | | API 地址 | `https://api.deepseek.com` |
| `DEEPSEEK_MODEL` | | 模型名称 | `deepseek-chat` |
| `DAILY_LIMIT` | | 每日免费次数 | `10` |
| `LOG_LEVEL` | | 日志级别 | `info` |

## 部署

### Railway（推荐）

1. Fork 本项目到 GitHub
2. 登录 [railway.app](https://railway.app)
3. New Project → Deploy from GitHub repo
4. 在 Variables 中添加 `BOT_TOKEN` 和 `DEEPSEEK_API_KEY`
5. 自动部署完成

### Render

1. 登录 [render.com](https://render.com)
2. New → Web Service → 连接 GitHub 仓库
3. 设置：
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. 在 Environment 中添加环境变量
5. 部署

### Docker（可选）

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
CMD ["npm", "start"]
```

```bash
docker build -t ai-telegram-bot .
docker run -d --env-file .env ai-telegram-bot
```

## 项目结构

```
ai-telegram-bot/
├── src/
│   ├── index.js      # 入口，启动 Bot
│   ├── config.js     # 环境变量配置
│   ├── logger.js     # Winston 日志
│   ├── ai.js         # DeepSeek API 调用
│   ├── context.js    # 对话上下文记忆
│   ├── commands.js   # 命令处理
│   └── limiter.js    # 使用次数限制
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 扩展方向

- 接入数据库（Redis/PostgreSQL）持久化对话和用量
- 付费订阅（Stripe/支付宝）解锁更多次数
- 接入真正的图片生成 API（DALL-E / Stable Diffusion）
- 添加 inline mode 支持
- 多语言 i18n

## License

MIT
