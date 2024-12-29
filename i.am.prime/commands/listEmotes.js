const Discord = require("discord.js");
const { emotesID, emotesNAMES, isAnimatedEmoji } = require("../modules/_emotes.js");

module.exports.run = async (client, message, args) => {
  const emotes = [];

  emotesNAMES.forEach((name, index) => {
    const emojiString = isAnimatedEmoji[index]
      ? `<a:${name}:${emotesID[index]}>`
      : `<:${name}:${emotesID[index]}>`;
    emotes.push(`${name}: ${emojiString}`);
  });

  if (emotes.length <= 0) {
    return message.reply("No emotes were found.");
  }

  const embed = new Discord.MessageEmbed()
    .setTitle("List of Emotes")
    .setDescription(emotes.join("\n"))
    .setColor("#ffffff");

  try {
    await message.author.send({embeds: [embed]});
    message.reply("Sent a DM with the list of emotes.");
  } catch (error) {
    message.reply(
      "Unable to send a DM. Please make sure your DMs are open and try again."
    );
  }
};

module.exports.help = {
  name: "Lists all emotes",
  description: "Sends a list of all available emotes in a DM",
  category: "Debug",
  command: "l.emote;l.emotes;l.e",
};
