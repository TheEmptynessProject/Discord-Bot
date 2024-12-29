const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const guild = message.guild;
  const owner = await guild.fetchOwner();
  const guildCreatedDate = new Date(message.guild.createdTimestamp);
  const embed = new Discord.MessageEmbed()
    .setTitle(guild.name)
	.addField(
      "General Info",
      `Owner: ${owner}
	  ID: ${guild.id}
	  Verification Level: ${guild.verificationLevel}
	  Boost Level: ${guild.premiumSubscriptionCount}
	  Created at (MDY): ${guildCreatedDate.toLocaleString('en-US')}
	  `, true
    )
    .addField(
      "Size",
      `Channels: ${guild.channels.cache.size}
	*Text:* ${guild.channels.cache.filter(channel => channel.type === 'text').size}
	*Voice:* ${guild.channels.cache.filter(channel => channel.type === 'voice').size}
	Members: ${guild.members.cache.size}
	*Users:* ${guild.members.cache.filter(member => !member.user.bot).size}
	[
	*Online:* ${guild.members.cache.filter(member => member.presence?.status === 'online').size}
	*Idle:* ${guild.members.cache.filter(member => member.presence?.status === 'idle').size}
	*DND:* ${guild.members.cache.filter(member => member.presence?.status === 'dnd').size}
	*Invisible:* ${guild.members.cache.filter(member => !member.presence || member.presence.status == "offline").size}
	]
    *Bots*: ${guild.members.cache.filter(member => member.user.bot).size}
	Emojis: ${guild.emojis.cache.size}
	*Normal Emoji:* ${guild.emojis.cache.filter(emoji => !emoji.animated).size}
    *Animated Emoji*: ${guild.emojis.cache.filter(emoji => emoji.animated).size}
	Stickers: ${guild.stickers.cache.size}
	Stage Instances: ${guild.stageInstances.cache.size}
	Voice States: ${guild.voiceStates.cache.size}
	Roles: ${guild.roles.cache.size}
	Bans: ${guild.bans.cache.size}
	Scheduled Events: ${guild.scheduledEvents.cache.size}
	Invites: ${guild.invites.cache.size}`, true
    )
    .setThumbnail(guild.iconURL())
    .setColor("#ffffff");

  message.reply({ embeds: [embed] });
};

module.exports.help = {
  name: "Server Info",
  description: "Gets current server info",
  category: "Debug",
  command: "s.info",
};
