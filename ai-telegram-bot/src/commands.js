import { chatCompletion } from './ai.js';
import { getHistory, addMessage, clearHistory } from './context.js';
import { checkLimit, increment, getUsage } from './limiter.js';
import { config } from './config.js';
import { logger } from './logger.js';

function userInfo(ctx) {
  const u = ctx.from;
  return { userId: u.id, chatId: ctx.chat.id, name: u.first_name || 'User' };
}

async function withLimit(ctx, fn) {
  const { userId } = userInfo(ctx);
  const { allowed, remaining } = checkLimit(userId);
  if (!allowed) {
    return ctx.reply(`⚠️ 今日免费额度已用完（${config.dailyLimit}次/天）。明天再来吧！\n\nYour daily free quota is used up. Come back tomorrow!`);
  }
  await fn();
  increment(userId);
  const left = remaining - 1;
  if (left <= 3 && left >= 0) {
    await ctx.reply(`💡 今日剩余 ${left} 次免费使用`, { reply_parameters: undefined });
  }
}

export function registerCommands(bot) {
  // /start
  bot.command('start', async (ctx) => {
    const { name } = userInfo(ctx);
    await ctx.reply(
      `👋 Hi ${name}! 我是 AI 助手 Bot。\n\n` +
      `可用命令：\n` +
      `/chat <消息> - 与AI对话\n` +
      `/translate <文本> - 翻译（自动检测语言）\n` +
      `/summarize <文本> - 文本摘要\n` +
      `/image <描述> - 生成图片的文字描述\n` +
      `/clear - 清除对话记忆\n` +
      `/usage - 查看今日用量\n` +
      `/help - 帮助菜单\n\n` +
      `每天免费 ${config.dailyLimit} 次，开始吧！🚀`
    );
  });

  // /help
  bot.command('help', async (ctx) => {
    await ctx.reply(
      `📖 *帮助菜单*\n\n` +
      `*对话：* /chat 你好\n` +
      `*翻译：* /translate Hello World\n` +
      `*摘要：* /summarize <粘贴长文本>\n` +
      `*图片描述：* /image 一只在月球上的猫\n` +
      `*清除记忆：* /clear\n` +
      `*用量查询：* /usage\n\n` +
      `支持私聊和群聊。群聊中请使用命令触发。\n` +
      `每日免费额度：${config.dailyLimit} 次`,
      { parse_mode: 'Markdown' }
    );
  });

  // /chat
  bot.command('chat', async (ctx) => {
    const text = ctx.match?.trim();
    if (!text) return ctx.reply('用法：/chat <你的消息>\n例如：/chat 帮我写一首诗');

    await withLimit(ctx, async () => {
      const { userId, chatId } = userInfo(ctx);
      addMessage(userId, chatId, 'user', text);
      const history = getHistory(userId, chatId);

      await ctx.replyWithChatAction('typing');
      try {
        const reply = await chatCompletion(history);
        addMessage(userId, chatId, 'assistant', reply);
        await ctx.reply(reply, { reply_parameters: { message_id: ctx.message.message_id } });
      } catch {
        await ctx.reply('❌ AI 服务暂时不可用，请稍后再试。');
      }
    });
  });

  // /translate
  bot.command('translate', async (ctx) => {
    const text = ctx.match?.trim();
    if (!text) return ctx.reply('用法：/translate <文本>\n例如：/translate Hello World');

    await withLimit(ctx, async () => {
      await ctx.replyWithChatAction('typing');
      try {
        const prompt = 'You are a professional translator. Detect the source language. If it is Chinese, translate to English. If it is English or any other language, translate to Chinese. Only output the translation, no explanation.';
        const reply = await chatCompletion([{ role: 'user', content: text }], prompt);
        await ctx.reply(`🌐 ${reply}`, { reply_parameters: { message_id: ctx.message.message_id } });
      } catch {
        await ctx.reply('❌ 翻译失败，请稍后再试。');
      }
    });
  });

  // /summarize
  bot.command('summarize', async (ctx) => {
    const text = ctx.match?.trim();
    if (!text) return ctx.reply('用法：/summarize <长文本>\n将文本粘贴在命令后面');

    await withLimit(ctx, async () => {
      await ctx.replyWithChatAction('typing');
      try {
        const prompt = 'You are a summarization expert. Provide a concise summary of the given text in the same language. Use bullet points for key points.';
        const reply = await chatCompletion([{ role: 'user', content: text }], prompt);
        await ctx.reply(`📝 *摘要*\n\n${reply}`, { parse_mode: 'Markdown', reply_parameters: { message_id: ctx.message.message_id } });
      } catch {
        await ctx.reply('❌ 摘要生成失败，请稍后再试。');
      }
    });
  });

  // /image
  bot.command('image', async (ctx) => {
    const text = ctx.match?.trim();
    if (!text) return ctx.reply('用法：/image <描述>\n例如：/image 一只在月球上弹吉他的猫');

    await withLimit(ctx, async () => {
      await ctx.replyWithChatAction('typing');
      try {
        const prompt = 'You are a creative visual artist. Given a description, generate a vivid, detailed, and imaginative text description of the image as if painting with words. Include colors, composition, lighting, mood, and fine details. Reply in the same language as the input.';
        const reply = await chatCompletion([{ role: 'user', content: text }], prompt);
        await ctx.reply(`🎨 ${reply}`, { reply_parameters: { message_id: ctx.message.message_id } });
      } catch {
        await ctx.reply('❌ 图片描述生成失败，请稍后再试。');
      }
    });
  });

  // /clear
  bot.command('clear', async (ctx) => {
    const { userId, chatId } = userInfo(ctx);
    clearHistory(userId, chatId);
    await ctx.reply('🗑️ 对话记忆已清除。');
  });

  // /usage
  bot.command('usage', async (ctx) => {
    const { userId } = userInfo(ctx);
    const used = getUsage(userId);
    const left = Math.max(0, config.dailyLimit - used);
    await ctx.reply(`📊 今日用量：${used}/${config.dailyLimit}\n剩余：${left} 次`);
  });
}
