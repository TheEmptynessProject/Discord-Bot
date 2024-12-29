const Discord = require("discord.js");
const { emotesID, emotesNAMES, isAnimatedEmoji } = require("../modules/_emotes.js");

module.exports.run = async (client, message, args) => {
  const index = Math.floor(Math.random() * emotesNAMES.length)
        if (isAnimatedEmoji[index] == true) {
            var string_to_send = ('<a:' + emotesNAMES[index] + ':' + emotesID[index] + '>')
            message.delete()
            message.reply(string_to_send)
        } else {
            var string_to_send = ('<:' + emotesNAMES[index] + ':' + 	emotesID[index] + '>')
            message.delete()
            message.reply(string_to_send)
        }
};

module.exports.help = {
  name: "Random Emote",
  description: "Sends a random emote, animated or not",
  category: "Fun",
  command: "r.emote;r.e"
};
