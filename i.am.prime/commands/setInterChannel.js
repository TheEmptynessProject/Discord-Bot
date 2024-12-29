const fs = require("fs");
const botConfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("You don't have permission to use this command.");

  const guildId = message.guild.id;
  let bool = false;
  let channelId = message.channel.id;

  if (botConfig.guildInter[guildId]) {
    bool = botConfig.guildInter[guildId].enabled;
    channelId = botConfig.guildInter[guildId].id;
  }

  const zero = args[0];
  
  if (!zero) return message.reply("You need to specify what to do: [set/toggle]");
  
  if (zero.toLowerCase() == "set") {
    botConfig.guildInter[guildId] = { id: message.channel.id, enabled: true };
	message.reply(`Inter messaging is **${ botConfig.guildInter[guildId].enabled ? "enabled" : "disabled"}** for the current channel: **${message.channel.name}**.`);
  } else if (zero.toLowerCase() == "toggle") {
    botConfig.guildInter[guildId] = { id: channelId, enabled: !bool };
	const temp = client.guilds.cache.get(guildId).channels.cache.get(channelId);
	message.reply(`Inter messaging is now **${ botConfig.guildInter[guildId].enabled ? "enabled" : "disabled"}** for the current channel: **${temp}**.`);
  }

  fs.writeFile("./botconfig.json", JSON.stringify(botConfig, null, 2), (err) => {
    if (err) return console.log(err);
  });
};

module.exports.help = {
  name: "Set the current as the channel for inter server messaging",
  description: "Sets the current channel as the channel for inter server messaging. If only the command is sent, without any options, it will toggle. If a new prefix is specified, it will be used as the new value (true/false).",
  category: "Settings",
  command: "interm"
};
