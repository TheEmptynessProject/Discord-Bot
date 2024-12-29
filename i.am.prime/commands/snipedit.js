const Discord = require('discord.js');
const { loadCache } = require("../modules/_notSkinCache.js");

module.exports.run = async (client, message, args) => {
	const messages = await loadCache();
  if (!messages.edited) {
    return message.reply('No sniped edits found.');
  }
  const snipedEdit = messages.edited;
  const user = await client.users.fetch(snipedEdit.oldMessage.authorId);
  const embed = new Discord.MessageEmbed()
    .setColor('#FFFF00')
    .setAuthor({ name: user.tag, iconURL: user.avatarURL() })
    .addField('Before', snipedEdit.oldMessage.content)
    .addField('After', snipedEdit.newMessage.content)
    .setTimestamp(snipedEdit.newMessage.editedAt);

  message.channel.send({ embeds: [embed] });
};

module.exports.help = {
  name: 'editsnipe',
  description: 'Snipes the most recent edited message',
  category: 'Fun',
  command: 'editsnipe',
};
