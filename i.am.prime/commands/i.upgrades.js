const Discord = require("discord.js");
const { loadData, writeData } = require("../modules/_idle.js");

module.exports.run = async (client, message, args) => {
  const data = await loadData();
  const userId = message.member.id;
if (!data[userId]) return message.reply("This user is not registered")
  if (args[0].toUpperCase() === "MONEY") {
    let upgradeCost = Math.floor(20 + (5 * data[userId]["MONEY_UPGRADES"] + 1) ** 1.3);
if (data[userId]["MONEY"] < upgradeCost) {
        return message.reply(`You need ${upgradeCost} money to upgrade your money earning rate.`);
      }
    if (args[1] && args[1].toUpperCase() === "MAX") {
		let count = 0
      while (data[userId]["MONEY"] >= upgradeCost) {
		  count++
        data[userId]["MONEY"] -= upgradeCost;
        data[userId]["MONEY_UPGRADES"]++;
        upgradeCost = Math.floor(20 + (5 * data[userId]["MONEY_UPGRADES"] + 1) ** 1.3);
      }
	  writeData(data);
	  return message.reply(`Upgraded money earning rate ${count} times!`);
    } else {
  
      data[userId]["MONEY"] -= upgradeCost;
      data[userId]["MONEY_UPGRADES"]++;
    }

    writeData(data);

    return message.reply(`Upgraded money earning rate!`);
  } else if (args[0].toUpperCase() === "ATTACK" || args[0].toUpperCase() === "ATK") {
    let upgradeCost = Math.floor(50 + 10 * (data[userId]["ATTACK_UPGRADES"] + 1) ** 1.5);
if (data[userId]["MONEY"] < upgradeCost) {
        return message.reply(`You need ${upgradeCost} money to upgrade your attack training efficiency.`);
      }
    if (args[1] && args[1].toUpperCase() === "MAX") {
		let count = 0
      while (data[userId]["MONEY"] >= upgradeCost) {
		  count++
        data[userId]["MONEY"] -= upgradeCost;
        data[userId]["ATTACK_UPGRADES"]++;
        upgradeCost = Math.floor(50 + 10 * (data[userId]["ATTACK_UPGRADES"] + 1) ** 1.5);
      }
	  writeData(data);
	  return message.reply(`Upgraded attack training efficiency ${count} times!`);
    } else {

      data[userId]["MONEY"] -= upgradeCost;
      data[userId]["ATTACK_UPGRADES"]++;
    }

    writeData(data);

    return message.reply(`Upgraded attack training efficiency!`);
  } else if (args[0].toUpperCase() === "DEFENSE" || args[0].toUpperCase() === "DEF") {
    let upgradeCost = Math.floor(100 + 20 * (data[userId]["DEFENSE_UPGRADES"] + 1) ** 1.5);
if (data[userId]["MONEY"] < upgradeCost) {
        return message.reply(`You need ${upgradeCost} money to upgrade your focus.`);
      }
    if (args[1] && args[1].toUpperCase() === "MAX") {
		let count = 0
      while (data[userId]["MONEY"] >= upgradeCost) {
		  count++
        data[userId]["MONEY"] -= upgradeCost;
        data[userId]["DEFENSE_UPGRADES"]++;
        upgradeCost = Math.floor(100 + 20 * (data[userId]["DEFENSE_UPGRADES"] + 1) ** 1.5);
      }
	  writeData(data);
	  return message.reply(`Upgraded focus ${count} times!`);
    } else {

      data[userId]["MONEY"] -= upgradeCost;
      data[userId]["DEFENSE_UPGRADES"]++;
    }

    writeData(data);

    return message.reply(`Upgraded focus!`);
  } else if (args[0].toUpperCase() === "MANA") {
    let upgradeCost = Math.floor(200 + 5 * (data[userId]["MANA_UPGRADES"] + 1) ** 1.8);
if (data[userId]["MONEY"] < upgradeCost) {
        return message.reply(`You need ${upgradeCost} money to upgrade your meditation efficiency.`);
      }
    if (args[1] && args[1].toUpperCase() === "MAX") {
		let count = 0
      while (data[userId]["MONEY"] >= upgradeCost) {
		  count++
        data[userId]["MONEY"] -= upgradeCost;
        data[userId]["MANA_UPGRADES"]++;
        upgradeCost = Math.floor(200 + 5 * (data[userId]["MANA_UPGRADES"] + 1) ** 1.8);
      }
	  writeData(data);
	  return message.reply(`Upgraded meditation efficiency ${count} times!`);
    } else {

      data[userId]["MONEY"] -= upgradeCost;
      data[userId]["MANA_UPGRADES"]++;
    }

    writeData(data);

    return message.reply(`Upgraded meditation efficiency!`);
  } else if (args[0].toUpperCase() === "HEALTH" || args[0].toUpperCase() === "HP") {
    let upgradeCost = Math.floor(50 + 15 * (data[userId]["HEALTH_UPGRADES"] + 1) ** 1.4);
if (data[userId]["MONEY"] < upgradeCost) {
        return message.reply(`You need ${upgradeCost} money to upgrade your recovery efficiency.`);
      }
    if (args[1] && args[1].toUpperCase() === "MAX") {
		let count = 0
      while (data[userId]["MONEY"] >= upgradeCost) {
		  count++
        data[userId]["MONEY"] -= upgradeCost;
        data[userId]["HEALTH_UPGRADES"]++;
        upgradeCost = Math.floor(50 + 15 * (data[userId]["HEALTH_UPGRADES"] + 1) ** 1.4);
      }
	  writeData(data);
	  return message.reply(`Upgraded recovery efficiency ${count} times!`);
    } else {

      data[userId]["MONEY"] -= upgradeCost;
      data[userId]["HEALTH_UPGRADES"]++;
    }

    writeData(data);

    return message.reply(`Upgraded recovery efficiency!`);
  } 
};

module.exports.help = {
  name: "Upgrades a certain stat",
  description: "Upgrades a certain stat for the idle game",
  category: "Fun",
  command: "idle.upgrades;idle.up",
};
