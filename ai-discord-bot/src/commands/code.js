const { SlashCommandBuilder } = require('discord.js');
const { chatCompletion } = require('../utils/ai');
const { checkLimit } = require('../utils/rateLimit');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('code')
    .setDescription('代码生成或解释')
    .addStringOption(opt =>
      opt.setName('action').setDescription('操作类型').setRequired(true)
        .addChoices(
          { name: '生成代码', value: 'generate' },
          { name: '解释代码', value: 'explain' },
          { name: '审查代码', value: 'review' },
          { name: '修复Bug', value: 'fix' },
        )
    )
    .addStringOption(opt =>
      opt.setName('input').setDescription('需求描述或代码').setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName('language').setDescription('编程语言').setRequired(false)
    ),

  async execute(interaction) {
    const limit = checkLimit(interaction.user.id);
    if (!limit.allowed) {
      return interaction.reply({ content: `⏳ 已达使用上限，${limit.resetIn} 分钟后重置。`, ephemeral: true });
    }

    await interaction.deferReply();
    const action = interaction.options.getString('action');
    const input = interaction.options.getString('input');
    const lang = interaction.options.getString('language') || '';

    const prompts = {
      generate: `Generate code${lang ? ` in ${lang}` : ''}. Requirements: ${input}`,
      explain: `Explain this code clearly:\n\`\`\`\n${input}\n\`\`\``,
      review: `Review this code, point out issues and suggest improvements:\n\`\`\`\n${input}\n\`\`\``,
      fix: `Fix the bugs in this code and explain what was wrong:\n\`\`\`\n${input}\n\`\`\``,
    };

    try {
      const result = await chatCompletion([
        { role: 'system', content: '你是一个资深程序员助手。提供清晰、高质量的代码和解释。用用户使用的语言回复解释部分。' },
        { role: 'user', content: prompts[action] },
      ], { temperature: 0.3, maxTokens: 2048 });

      if (result.length > 2000) {
        const chunks = result.match(/[\s\S]{1,2000}/g);
        await interaction.editReply(chunks[0]);
        for (let i = 1; i < chunks.length; i++) {
          await interaction.followUp(chunks[i]);
        }
      } else {
        await interaction.editReply(result);
      }
    } catch (err) {
      console.error('Code error:', err.message);
      await interaction.editReply('❌ 代码处理失败，请稍后重试。');
    }
  },
};
