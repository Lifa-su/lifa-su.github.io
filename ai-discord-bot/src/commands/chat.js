const { SlashCommandBuilder } = require('discord.js');
const { chatCompletion } = require('../utils/ai');
const { getContext, addMessage } = require('../utils/context');
const { checkLimit } = require('../utils/rateLimit');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('和 AI 对话')
    .addStringOption(opt =>
      opt.setName('message').setDescription('你的消息').setRequired(true)
    ),

  async execute(interaction) {
    const limit = checkLimit(interaction.user.id);
    if (!limit.allowed) {
      return interaction.reply({ content: `⏳ 已达使用上限，${limit.resetIn} 分钟后重置。`, ephemeral: true });
    }

    await interaction.deferReply();
    const userMsg = interaction.options.getString('message');
    const channelId = interaction.channelId;

    addMessage(channelId, 'user', userMsg);
    const messages = [
      { role: 'system', content: '你是一个友好、有帮助的 AI 助手。用用户使用的语言回复。回复简洁清晰。' },
      ...getContext(channelId),
    ];

    try {
      const reply = await chatCompletion(messages);
      addMessage(channelId, 'assistant', reply);

      // Discord 2000 char limit
      if (reply.length > 2000) {
        const chunks = reply.match(/[\s\S]{1,2000}/g);
        await interaction.editReply(chunks[0]);
        for (let i = 1; i < chunks.length; i++) {
          await interaction.followUp(chunks[i]);
        }
      } else {
        await interaction.editReply(reply);
      }
    } catch (err) {
      console.error('Chat error:', err.message);
      await interaction.editReply('❌ AI 请求失败，请稍后重试。');
    }
  },
};
