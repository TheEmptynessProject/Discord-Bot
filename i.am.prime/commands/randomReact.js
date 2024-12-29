const Discord = require("discord.js");
const { emotesID, emotesNAMES, isAnimatedEmoji } = require("../modules/_emotes.js");

module.exports.run = async (client, message, args) => {
  const messageID = args[0];
  if (!messageID) return message.reply("Please provide a message ID.");
  const index = Math.floor(Math.random() * emotesNAMES.length);
  const toSend = isAnimatedEmoji[index] ? `<a:${emotesNAMES[index]}:${emotesID[index]}>` : `<:${emotesNAMES[index]}:${emotesID[index]}>`;
  try {
    const msg = await message.channel.messages.fetch(messageID);
    await msg.react(toSend);
    message.delete();
  } catch (err) {
    console.error(err);
    return message.reply("Failed to fetch the message with the provided ID.");
  }
};

module.exports.help = {
  name: "Random React",
  description: "Randomly chooses an emote to react to the message ID provided",
  category: "Fun",
  command: "r.react;r.r"
};
