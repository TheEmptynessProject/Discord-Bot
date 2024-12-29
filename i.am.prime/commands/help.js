const Discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (client, message, args) => {
  const descArray = [];
  const embed = new Discord.MessageEmbed()
    .setTitle("Command List")
    .setDescription("List of all available commands")
    .setColor("#ffffff")
    .setTimestamp();

  client.commands.forEach((command) => {
    var commandName = command.help.command;
    var temp = "";
    const commandDesc = command.help.description;
    if (commandName.includes(";")) {
      commandName = commandName.split(";");
      for (x in commandName) {
        temp += `${botConfig.prefix}${commandName[x]}; `;
      }
      temp = temp.slice(0, -1);
      if (!descArray.includes(commandName[0]) && !commandName[0].toLowerCase().includes("admin")) {
        embed.addField(`${temp}`, `${commandDesc}`, true);
        descArray.push(commandName[0]);
      }
    } else {
      if (!descArray.includes(commandName) && !commandName.toLowerCase().includes("admin")) {
        embed.addField(`${botConfig.prefix}${commandName} `, `${commandDesc}`, true);
        descArray.push(commandName);
      }
    }
  });

  message.reply({
    embeds: [embed],
  });
};

module.exports.help = {
  name: "Help",
  description: "Lists all commands available",
  category: "Debug",
  command: "help",
};
