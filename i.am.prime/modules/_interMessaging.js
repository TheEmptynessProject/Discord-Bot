const botConfig = require('../botconfig.json');

const sendMessage = async (client, message, prefix) => {
  const guildId = message.guild.id;
  if (botConfig.guildInter[guildId]) {
    if (botConfig.guildInter[guildId].enabled) {
      message.delete();
      for (const guildId_loop in botConfig.guildInter) {
        if (botConfig.guildInter[guildId_loop].enabled) {
          const targetGuildId = guildId_loop;
          const targetGuild = client.guilds.cache.get(targetGuildId);
          if (targetGuild) {
            const channelId = botConfig.guildInter[targetGuildId].id;
            const channel = targetGuild.channels.cache.get(channelId);
            if (channel) {
					await channel.send(`${message.author}: ${message.content} [Sent from: ${message.guild.name}]`);
            } else {
              console.log(`Channel not found for ID: ${channelId}`);
            }
          } else {
            console.log(`Guild not found for ID: ${targetGuildId}`);
          }
        }
      }
    }
  }
};

module.exports = {
  sendMessage,
};
