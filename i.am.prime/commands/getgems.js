const Discord = require("discord.js");
const { loadData, writeData } = require("../modules/_data.js");

module.exports.run = async (client, message, args) => {
    const data = await loadData();
    const userId = message.member.id;
    const currentTime = Date.now();
    const lastGemsTime = data[userId]["GETGEMS_TIME"];
    const timeSinceLastGems = currentTime - lastGemsTime;
    const cooldown = 2 * 60 * 60 * 1000;

    if (timeSinceLastGems >= cooldown) {
        data[userId]["GEMS"] += 2;
        data[userId]["GETGEMS_TIME"] = currentTime;
        writeData(data);
        message.reply(`Added 2 gems to ${message.author.username}.`);
    } else {
        const remainingTime = cooldown - timeSinceLastGems;
        const hours = Math.floor(remainingTime / (60 * 60 * 1000));
        const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
        message.reply(`You are on cooldown. Try again in ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);
    }
};

module.exports.help = {
  name: "Get gems",
  description: "Gets gems if the cooldown has passed",
  category: "Fun",
  command: "get.gems;get.g"
};
