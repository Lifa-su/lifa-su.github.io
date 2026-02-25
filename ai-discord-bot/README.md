# AI Discord Bot

基于 DeepSeek API 的 AI Discord Bot，支持对话、翻译、摘要、代码助手等功能。

## 功能

| 命令 | 说明 |
|------|------|
| `/chat` | AI 对话（支持频道上下文） |
| `/translate` | 多语言翻译（中/英/日/韩/法/西/德） |
| `/summarize` | 频道消息摘要 |
| `/code` | 代码生成 / 解释 / 审查 / 修复 |
| `/image-prompt` | 生成 Midjourney / DALL-E 提示词 |
| `/help` | 查看帮助和使用情况 |
| `/admin` | 管理员命令（清除上下文、设置系统提示词、查看状态） |

## 快速开始

### 1. 创建 Discord Bot

1. 前往 [Discord Developer Portal](https://discord.com/developers/applications)
2. 点击 "New Application"，输入名称
3. 左侧 "Bot" → "Reset Token" → 复制 Token
4. 开启 "Message Content Intent"
5. 左侧 "OAuth2" → 复制 Client ID

### 2. 获取 DeepSeek API Key

前往 [DeepSeek Platform](https://platform.deepseek.com/) 注册并获取 API Key。

### 3. 安装和配置

```bash
cd ai-discord-bot
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env，填入 Token、Client ID、API Key
```

### 4. 注册斜杠命令

```bash
npm run deploy
```

### 5. 启动 Bot

```bash
npm start
```

### 6. 邀请 Bot 到服务器

```bash
npm run invite
# 打开输出的链接，选择服务器并授权
```

## 环境变量

| 变量 | 说明 | 必填 |
|------|------|------|
| `DISCORD_TOKEN` | Discord Bot Token | ✅ |
| `DISCORD_CLIENT_ID` | Application Client ID | ✅ |
| `DEEPSEEK_API_KEY` | DeepSeek API Key | ✅ |
| `DEEPSEEK_BASE_URL` | API 地址（默认 `https://api.deepseek.com`） | |
| `DEFAULT_MODEL` | 模型名（默认 `deepseek-chat`） | |
| `MAX_CONTEXT_MESSAGES` | 上下文消息数（默认 20） | |
| `RATE_LIMIT_PER_USER` | 每用户每小时限制（默认 30） | |
| `RATE_LIMIT_WINDOW_MINUTES` | 限制窗口分钟数（默认 60） | |

## 部署

### PM2（推荐）

```bash
npm install -g pm2
pm2 start src/index.js --name ai-discord-bot
pm2 save
pm2 startup
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
CMD ["node", "src/index.js"]
```

```bash
docker build -t ai-discord-bot .
docker run -d --env-file .env --name ai-discord-bot ai-discord-bot
```

## 项目结构

```
ai-discord-bot/
├── src/
│   ├── index.js              # 入口
│   ├── config.js             # 配置
│   ├── deploy-commands.js    # 注册斜杠命令
│   ├── invite.js             # 生成邀请链接
│   ├── commands/
│   │   ├── chat.js           # AI 对话
│   │   ├── translate.js      # 翻译
│   │   ├── summarize.js      # 摘要
│   │   ├── code.js           # 代码助手
│   │   ├── image-prompt.js   # 图片提示词
│   │   ├── help.js           # 帮助
│   │   └── admin.js          # 管理员命令
│   └── utils/
│       ├── ai.js             # DeepSeek API 封装
│       ├── context.js        # 对话上下文管理
│       └── rateLimit.js      # 使用次数限制
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## License

MIT
