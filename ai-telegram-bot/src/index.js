import { Bot } from 'grammy';
import { config } from './config.js';
import { logger } from './logger.js';
import { registerCommands } from './commands.js';

if (!config.botToken) {
  logger.error('BOT_TOKEN is required. Set it in .env file.');
  process.exit(1);
}
if (!config.deepseek.apiKey) {
  logger.error('DEEPSEEK_API_KEY is required. Set it in .env file.');
  process.exit(1);
}

const bot = new Bot(config.botToken);

// Error handler
bot.catch((err) => {
  const ctx = err.ctx;
  const e = err.error;
  logger.error(`Error for ${ctx.update.update_id}: ${e.message || e}`);
  ctx.reply('❌ 出了点问题，请稍后再试。').catch(() => {});
});

// Register all commands
registerCommands(bot);

// Log all incoming messages
bot.on('message', (ctx) => {
  const u = ctx.from;
  const chat = ctx.chat;
  logger.info(`[${chat.type}] ${u.first_name}(${u.id}) in ${chat.id}: ${ctx.message.text?.slice(0, 80) || '<non-text>'}`);
});

// Start
bot.start({
  onStart: (info) => logger.info(`Bot @${info.username} started successfully!`),
});

// Graceful shutdown
const stop = () => {
  logger.info('Shutting down...');
  bot.stop();
};
process.once('SIGINT', stop);
process.once('SIGTERM', stop);
