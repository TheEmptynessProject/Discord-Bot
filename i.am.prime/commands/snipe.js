const Discord = require('discord.js');
const { loadCache } = require("../modules/_notSkinCache.js");

module.exports.run = async (client, message, args) => {
  const messages = await loadCache();
  if (!messages.deleted) {
    return message.reply('No deleted messages found.');
  }

  const snipedMessage = messages.deleted;
  const user = await client.users.fetch(snipedMessage.authorId);
  const embed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setAuthor({ name: user.tag, iconURL: user.avatarURL() })
    .setDescription(snipedMessage.content)
    .setTimestamp(snipedMessage.createdTimestamp);

  message.channel.send({ embeds: [embed] });
};

module.exports.help = {
  name: 'snipe',
  description: 'Snipes the most recent deleted message',
  category: 'Fun',
  command: 'snipe',
};
