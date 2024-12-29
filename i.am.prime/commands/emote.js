const Discord = require("discord.js");
const { emotesID, emotesNAMES, isAnimatedEmoji } = require("../modules/_emotes.js");

module.exports.run = async (client, message, args) => {
  var emoteName = args[0];
  if (!emoteName) return message.reply("Please provide a valid emote.");
  emoteName = emoteName.toLowerCase();
  
  if (emotesNAMES.includes(emoteName)) {
    const index = emotesNAMES.indexOf(emoteName);
    const emojiString = isAnimatedEmoji[index]
      ? `<a:${emoteName}:${emotesID[index]}>`
      : `<:${emoteName}:${emotesID[index]}>`;

    await message.reply(emojiString).then(msg => {
    message.delete();
  });
  } else {
    return message.reply("Please provide a valid emote.");
  }
};

module.exports.help = {
  name: "Emote",
  description: "Sends an emote, animated or not",
  category: "Fun",
  command: "emote"
};
