const { loadData, writeData } = require("../modules/_data.js");
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    const data = await loadData();

    let targetId = args[0];
    
    if (message.mentions.users.size > 0) {
        targetId = message.mentions.users.first().id;
    }
    if (targetId == message.author.id) {
		return message.reply("You can't pay to yourself.");
	}
    const receiverUser = await client.users.fetch(targetId);
    
    if (!receiverUser) {
        return message.reply("Invalid options.");
    }
    
    const currency = args[1];
    if (!currency) {
        return message.reply("You didn't specify what currency to use.");
    }
    
    const amount = parseInt(args[2]);
    if (!amount || isNaN(amount)) {
        return message.reply("You didn't specify a valid amount to pay.");
    }
    if (amount <= 0) {return message.reply("You didn't specify a valid amount to pay.");}
    if (currency.toLowerCase().startsWith("m")) {
        if (data[message.author.id]["MONEY"] >= amount) {
            data[message.author.id]["MONEY"] -= amount;
            data[targetId]["MONEY"] = parseInt(data[targetId]["MONEY"]) + amount;
            writeData(data);
            return message.reply(`You paid ${amount} money to ${receiverUser.username}.`);
        } else {
            return message.reply(`You do not have enough money to pay that amount. You have ${data[message.author.id]["MONEY"]}.`);
        }
    } else if (currency.toLowerCase().startsWith("g")) {
        if (data[message.author.id]["GEMS"] >= amount) {
            data[message.author.id]["GEMS"] -= amount;
            data[targetId]["GEMS"] = parseInt(data[targetId]["MONEY"]) + amount;
            writeData(data);
            return message.reply(`You paid ${amount} gems to ${receiverUser.username}.`);
        } else {
            return message.reply(`You do not have enough gems to pay that amount. You have ${data[message.author.id]["GEMS"]}.`);
        }
    }
};

module.exports.help = {
    name: "pay",
    description: "Pay money or gems to someone",
    category: "Fun",
    command: "get.pay"
};
