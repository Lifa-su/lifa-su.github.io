# AI API 文档生成器

基于 DeepSeek AI 的智能 API 文档生成工具。粘贴代码或 API 端点定义，自动生成完整、专业的 API 文档。

## 功能

- **AI 智能分析** — 粘贴代码/API 端点，DeepSeek AI 自动生成完整文档
- **RESTful & GraphQL** — 同时支持两种 API 风格
- **自动生成示例** — 请求/响应示例自动生成
- **多语言代码** — curl、Python、JavaScript、Go 代码示例一键切换
- **OpenAPI/Swagger** — 支持导出标准 OpenAPI 3.0 格式
- **交互式测试** — 内置 API 测试面板，直接发送请求
- **多格式导出** — Markdown、HTML、OpenAPI JSON
- **搜索导航** — 侧边栏搜索，快速定位端点
- **Stripe 风格 UI** — 现代、清晰的文档界面

## 使用

1. 用浏览器打开 `index.html`
2. 输入 DeepSeek API Key（[获取 Key](https://platform.deepseek.com/)）
3. 选择 API 类型（RESTful / GraphQL）
4. 粘贴代码或 API 定义
5. 点击「生成 API 文档」

## 示例输入

### RESTful
```
GET /api/users
GET /api/users/:id
POST /api/users { name: string, email: string }
PUT /api/users/:id { name?: string, email?: string }
DELETE /api/users/:id
```

### GraphQL
```graphql
type Query {
  users(limit: Int, offset: Int): [User!]!
  user(id: ID!): User
}

type Mutation {
  createUser(input: CreateUserInput!): User!
}

type User {
  id: ID!
  name: String!
  email: String!
}
```

也支持直接粘贴 Express、Flask、FastAPI、Go 等框架代码。

## 技术栈

- 纯前端：HTML + CSS + JavaScript（无依赖）
- AI：DeepSeek API
- UI：Stripe 文档风格

## License

MIT
