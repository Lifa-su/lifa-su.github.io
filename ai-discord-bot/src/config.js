require('dotenv').config();

module.exports = {
  discord: {
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.DISCORD_CLIENT_ID,
  },
  deepseek: {
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
    model: process.env.DEFAULT_MODEL || 'deepseek-chat',
  },
  rateLimit: {
    maxRequests: parseInt(process.env.RATE_LIMIT_PER_USER) || 30,
    windowMinutes: parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES) || 60,
  },
  maxContextMessages: parseInt(process.env.MAX_CONTEXT_MESSAGES) || 20,
};
