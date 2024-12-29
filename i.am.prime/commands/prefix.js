const fs = require("fs");
const botConfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("You don't have permission to use this command.");
  
  const newPrefix = args[0];
  if (!newPrefix) return message.reply("Please provide a new prefix.");
  
  botConfig.guildPrefixes[message.guild.id] = newPrefix;
  
  fs.writeFile("./botconfig.json", JSON.stringify(botConfig, null, 2), (err) => {
    if (err) return console.log(err);
    message.reply(`Prefix has been set to ${newPrefix}`);
  });
};

module.exports.help = {
  name: "Change prefix",
  description: "Change the prefix the bot uses for commands",
  category: "Settings",
  command: "prefix"
};
