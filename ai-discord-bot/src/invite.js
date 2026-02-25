require('dotenv').config();

const clientId = process.env.DISCORD_CLIENT_ID;
if (!clientId) {
  console.error('❌ 请在 .env 中设置 DISCORD_CLIENT_ID');
  process.exit(1);
}

const permissions = 2147485696; // Send Messages + Use Slash Commands + Read Message History
const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=bot%20applications.commands`;

console.log('🔗 Bot 邀请链接：');
console.log(url);
