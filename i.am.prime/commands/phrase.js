const Discord = require("discord.js");
const { emotesID, emotesNAMES, isAnimatedEmoji } = require("../modules/_emotes.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (client, message, args) => {
  const messageContent = args;
  let editedContent = "";
  if (!messageContent) return message.reply("Please provide a phrase.");
  for (const element of messageContent) {
    if (element.startsWith(botConfig.prefix)) {
      const emoteName = element.slice(botConfig.prefix.length).toLowerCase();
      if (emotesNAMES.includes(emoteName)) {
        const index = emotesNAMES.indexOf(emoteName);
        const emojiString = isAnimatedEmoji[index]
          ? `<a:${emoteName}:${emotesID[index]}>`
          : `<:${emoteName}:${emotesID[index]}>`;
        editedContent += emojiString + " ";
        continue;
      }
    }
    editedContent += element + " ";
  }

  const embed = new Discord.MessageEmbed()
    .setTitle(editedContent)
    .setColor("#FFFFFF")
    .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL() });
  
  message.reply({ embeds: [embed] }).then(msg => {
    message.delete();
  });
};

module.exports.help = {
  name: "Phrase",
  description: `nao sei explicar esta merda`,
  category: "Fun",
  command: "phrase"
};
