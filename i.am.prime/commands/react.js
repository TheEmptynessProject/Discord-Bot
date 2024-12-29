const Discord = require("discord.js");
const { emotesID, emotesNAMES, isAnimatedEmoji } = require("../modules/_emotes.js");

module.exports.run = async (client, message, args) => {
    let messageObject, messageId, emoteName;

    try {
        messageObject = await message.channel.messages.fetch(args[0]);
        messageId = args[0];
        emoteName = args[1]?.toLowerCase();
    } catch (error) {
        try {
            messageObject = await message.channel.messages.fetch(args[1]);
            messageId = args[1];
            emoteName = args[0]?.toLowerCase();
        } catch (error) {
            return message.reply(`Error fetching message: ${error.message}`);
        }
    }

    if (!emotesNAMES.includes(emoteName)) {
        return message.reply(`Invalid emote: ${emoteName}`);
    }

    const index = emotesNAMES.indexOf(emoteName);

    const emojiString = isAnimatedEmoji[index] ? `<a:${emoteName}:${emotesID[index]}>` : `<:${emoteName}:${emotesID[index]}>`;

    try {
        await messageObject.react(emotesID[index]);
    } catch (error) {
        return message.reply(`Error reacting to message: ${error.message}`);
    }
};

module.exports.help = {
    name: "React",
    description: "Reacts to a message with an emote",
    category: "Fun",
    command: "react;r"
};
