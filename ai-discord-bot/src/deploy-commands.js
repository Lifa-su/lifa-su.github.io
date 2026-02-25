const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  if (command.data) commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(config.discord.token);

(async () => {
  try {
    console.log(`🔄 注册 ${commands.length} 个斜杠命令...`);
    await rest.put(Routes.applicationCommands(config.discord.clientId), { body: commands });
    console.log('✅ 命令注册成功！');
  } catch (error) {
    console.error('❌ 命令注册失败:', error);
  }
})();
