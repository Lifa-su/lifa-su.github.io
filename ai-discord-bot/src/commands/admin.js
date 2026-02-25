const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { clearContext } = require('../utils/context');

// Per-guild settings (in-memory for MVP)
const guildSettings = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('admin')
    .setDescription('管理员命令')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(sub =>
      sub.setName('clear-context').setDescription('清除当前频道的对话上下文')
    )
    .addSubcommand(sub =>
      sub.setName('set-system-prompt').setDescription('设置本服务器的系统提示词')
        .addStringOption(opt =>
          opt.setName('prompt').setDescription('系统提示词').setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub.setName('status').setDescription('查看 Bot 状态')
    ),

  guildSettings,

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    switch (sub) {
      case 'clear-context': {
        clearContext(interaction.channelId);
        await interaction.reply({ content: '✅ 已清除当前频道的对话上下文。', ephemeral: true });
        break;
      }
      case 'set-system-prompt': {
        const prompt = interaction.options.getString('prompt');
        const settings = guildSettings.get(interaction.guildId) || {};
        settings.systemPrompt = prompt;
        guildSettings.set(interaction.guildId, settings);
        await interaction.reply({ content: `✅ 系统提示词已更新为：\n> ${prompt}`, ephemeral: true });
        break;
      }
      case 'status': {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const memUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
        await interaction.reply({
          content: `📊 **Bot 状态**\n⏱️ 运行时间：${hours}h ${minutes}m\n💾 内存：${memUsage} MB\n🏓 延迟：${interaction.client.ws.ping}ms`,
          ephemeral: true,
        });
        break;
      }
    }
  },
};
