const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { chatCompletion } = require('../utils/ai');
const { checkLimit } = require('../utils/rateLimit');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('summarize')
    .setDescription('总结频道最近的消息')
    .addIntegerOption(opt =>
      opt.setName('count').setDescription('消息数量（默认50）').setMinValue(10).setMaxValue(200)
    ),

  async execute(interaction) {
    const limit = checkLimit(interaction.user.id);
    if (!limit.allowed) {
      return interaction.reply({ content: `⏳ 已达使用上限，${limit.resetIn} 分钟后重置。`, ephemeral: true });
    }

    await interaction.deferReply();
    const count = interaction.options.getInteger('count') || 50;

    try {
      const messages = await interaction.channel.messages.fetch({ limit: count });
      const sorted = [...messages.values()].reverse();
      const transcript = sorted
        .filter(m => !m.author.bot)
        .map(m => `${m.author.displayName}: ${m.content}`)
        .join('\n');

      if (!transcript.trim()) {
        return interaction.editReply('没有找到可总结的消息。');
      }

      const summary = await chatCompletion([
        { role: 'system', content: '你是一个摘要助手。请用简洁的要点总结以下聊天记录，保留关键信息和讨论主题。用聊天记录的主要语言回复。' },
        { role: 'user', content: transcript },
      ], { maxTokens: 1024 });

      await interaction.editReply(`📋 **最近 ${count} 条消息摘要：**\n\n${summary}`);
    } catch (err) {
      console.error('Summarize error:', err.message);
      await interaction.editReply('❌ 摘要生成失败，请稍后重试。');
    }
  },
};
