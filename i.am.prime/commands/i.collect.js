const Discord = require("discord.js");
const { loadData, writeData } = require("../modules/_idle.js");

module.exports.run = async (client, message, args) => {
	const data = await loadData();
	const userId = message.member.id;
	if (!data[userId]) return message.reply("This user is not registered")
	const lastCollect = data[userId]["TIME_SINCE_COLLECT"];
	const money = data[userId]["MONEY"];
	
	const minutesSinceLastCollect = Math.floor((Date.now() - lastCollect) / 60000);
	const moneyToAdd = minutesSinceLastCollect * (data[userId]["MONEY_UPGRADES"]+1+data[userId]["REBIRTH"]);
	
	if (moneyToAdd <= 0) {
		return message.reply(`You have no money to collect`);
	} else {
	const newMoney = money + moneyToAdd;
	data[userId]["TIME_SINCE_COLLECT"] = Date.now();
	data[userId]["MONEY"] = newMoney;
	writeData(data)
	
	return message.reply(`Collected ${moneyToAdd} money! Total money: ${newMoney} money`);
	}
	
	
};

module.exports.help = {
  name: "Collect idle money",
  description: "Collects all idle money that has not been collected yet",
  category: "Fun",
  command: "idle.collect;idle.c",
};
