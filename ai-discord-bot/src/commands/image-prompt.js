const { SlashCommandBuilder } = require('discord.js');
const { chatCompletion } = require('../utils/ai');
const { checkLimit } = require('../utils/rateLimit');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('image-prompt')
    .setDescription('生成 Midjourney / DALL-E 提示词')
    .addStringOption(opt =>
      opt.setName('idea').setDescription('图片创意描述').setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName('style').setDescription('风格').setRequired(false)
        .addChoices(
          { name: '写实', value: 'photorealistic' },
          { name: '动漫', value: 'anime' },
          { name: '油画', value: 'oil painting' },
          { name: '水彩', value: 'watercolor' },
          { name: '赛博朋克', value: 'cyberpunk' },
          { name: '像素风', value: 'pixel art' },
          { name: '3D渲染', value: '3D render' },
        )
    ),

  async execute(interaction) {
    const limit = checkLimit(interaction.user.id);
    if (!limit.allowed) {
      return interaction.reply({ content: `⏳ 已达使用上限，${limit.resetIn} 分钟后重置。`, ephemeral: true });
    }

    await interaction.deferReply();
    const idea = interaction.options.getString('idea');
    const style = interaction.options.getString('style') || '';

    try {
      const result = await chatCompletion([
        {
          role: 'system',
          content: `You are an expert AI image prompt engineer. Generate detailed, high-quality prompts for both Midjourney and DALL-E based on the user's idea.

Output format:
🎨 **Midjourney Prompt:**
[prompt] --ar 16:9 --v 6

🖼️ **DALL-E Prompt:**
[prompt]

Include details about composition, lighting, mood, colors, and technical parameters. Be specific and vivid.`,
        },
        { role: 'user', content: `Idea: ${idea}${style ? `\nStyle: ${style}` : ''}` },
      ], { temperature: 0.8 });

      await interaction.editReply(result);
    } catch (err) {
      console.error('Image-prompt error:', err.message);
      await interaction.editReply('❌ 提示词生成失败，请稍后重试。');
    }
  },
};
