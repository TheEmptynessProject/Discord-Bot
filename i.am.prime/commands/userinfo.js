const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let id = args[0] || message.author.id;
  if (message.mentions.users.size > 0) {
	id = message.mentions.users.first().id
}
  const author = await message.guild.members.fetch(id)
  const userCreatedDate = author.user.createdAt;
  const userJoinDate = new Date(author.joinedTimestamp);
  const embed = new Discord.MessageEmbed()
    .setTitle(`${author.user.username}#${author.user.discriminator}`)
    .addField(
      "General Info",
      `ID: ${author.id}
	  Created at (MDY): ${userCreatedDate.toLocaleString('en-US')}
	  Joined ${message.guild.name} at (MDY): ${userJoinDate.toLocaleString('en-US')}
	  `, true
    )
    .addField(
      "Status",
      `Status: ${author.presence?.status || 'offline'}
	Activity: ${author.presence?.activities[0]?.name || 'None'}
	`, true
    )
    .setColor("#ffffff")
	.setThumbnail(author.user.displayAvatarURL())
  message.reply({ embeds: [embed] });
};

module.exports.help = {
  name: "User Info",
  description: "Gets information about the message author",
  category: "Debug",
  command: "u.info",
};
