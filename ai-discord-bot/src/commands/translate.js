const { SlashCommandBuilder } = require('discord.js');
const { chatCompletion } = require('../utils/ai');
const { checkLimit } = require('../utils/rateLimit');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('translate')
    .setDescription('翻译文本')
    .addStringOption(opt =>
      opt.setName('text').setDescription('要翻译的文本').setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName('to').setDescription('目标语言（默认英文）').setRequired(false)
        .addChoices(
          { name: '英文', value: 'English' },
          { name: '中文', value: 'Chinese' },
          { name: '日文', value: 'Japanese' },
          { name: '韩文', value: 'Korean' },
          { name: '法文', value: 'French' },
          { name: '西班牙文', value: 'Spanish' },
          { name: '德文', value: 'German' },
        )
    ),

  async execute(interaction) {
    const limit = checkLimit(interaction.user.id);
    if (!limit.allowed) {
      return interaction.reply({ content: `⏳ 已达使用上限，${limit.resetIn} 分钟后重置。`, ephemeral: true });
    }

    await interaction.deferReply();
    const text = interaction.options.getString('text');
    const targetLang = interaction.options.getString('to') || 'English';

    try {
      const result = await chatCompletion([
        { role: 'system', content: `You are a professional translator. Translate the given text to ${targetLang}. Only output the translation, nothing else.` },
        { role: 'user', content: text },
      ], { temperature: 0.3 });

      await interaction.editReply(`**${targetLang}:**\n${result}`);
    } catch (err) {
      console.error('Translate error:', err.message);
      await interaction.editReply('❌ 翻译失败，请稍后重试。');
    }
  },
};
