const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	message.reply("**Pinging...**").then(m => {
            var ping = m.createdTimestamp - message.createdTimestamp;
            var botPing = Math.round(client.ws.ping);
            m.edit('Ping Is: **' + ping + '**ms.\nBot Ping Is: **' + botPing + '**ms');
        })
}

module.exports.help = {
  name: "Ping bot",
  description: "Checks and sends the bot ping as a message",
  category: "Debug",
  command: "ping"
};
