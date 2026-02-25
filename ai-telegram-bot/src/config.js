import 'dotenv/config';

export const config = {
  botToken: process.env.BOT_TOKEN,
  deepseek: {
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
    model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
  },
  dailyLimit: parseInt(process.env.DAILY_LIMIT || '10', 10),
  logLevel: process.env.LOG_LEVEL || 'info',
};
