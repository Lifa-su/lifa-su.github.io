const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getUsage } = require('../utils/rateLimit');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('查看帮助信息'),

  async execute(interaction) {
    const usage = getUsage(interaction.user.id);

    const embed = new EmbedBuilder()
      .setTitle('🤖 AI Bot 帮助')
      .setColor(0x5865F2)
      .setDescription('我是一个 AI 助手，以下是可用命令：')
      .addFields(
        { name: '💬 /chat', value: 'AI 对话（支持上下文）', inline: true },
        { name: '🌐 /translate', value: '多语言翻译', inline: true },
        { name: '📋 /summarize', value: '频道消息摘要', inline: true },
        { name: '💻 /code', value: '代码生成/解释/审查/修复', inline: true },
        { name: '🎨 /image-prompt', value: '生成 AI 绘图提示词', inline: true },
        { name: '⚙️ /admin', value: '管理员设置（仅管理员）', inline: true },
      )
      .addFields(
        { name: '📊 使用情况', value: `已用 ${usage.used}/${usage.max} 次` },
      )
      .setFooter({ text: 'Powered by DeepSeek AI' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
