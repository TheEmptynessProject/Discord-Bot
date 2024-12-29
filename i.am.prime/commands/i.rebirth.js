const Discord = require("discord.js");
const { loadData, writeData } = require("../modules/_idle.js");

module.exports.run = async (client, message, args) => {
  const data = await loadData();
  const userId = message.member.id;
  
  if (!data[userId]) {
    return message.reply("This user is not registered");
  }
  
  const rebirthCost = Math.floor(5000 * (2 ** data[userId].REBIRTH));
  let totalUpgrades = 0;
  for (const key in data[userId]) {
    if (!key.includes("TIME")) {
      if (key.includes("_UPGRADES")) {
        totalUpgrades += data[userId][key];
      }
    }
  }
  const powerLevel = Math.round(
    (data[userId]["ATTACK"]*3 +
      data[userId]["DEFENSE"]*2 +
      data[userId]["MANA"] +
      (data[userId]["HEALTH"]/100)) +
      (totalUpgrades + 1) *
      (1 + data[userId]["REBIRTH"] / 10)
  );
  
  if (powerLevel >= rebirthCost) {
    data[userId].ATTACK = 0;
    data[userId].MANA = 0;
    data[userId].DEFENSE = 0;
    data[userId].HEALTH = 100;
    data[userId].MONEY = 0;
    data[userId].ATTACK_UPGRADES = 0;
    data[userId].DEFENSE_UPGRADES = 0;
    data[userId].MANA_UPGRADES = 0;
    data[userId].HEALTH_UPGRADES = 0;
    data[userId].MONEY_UPGRADES = 0;
    data[userId].REBIRTH++;
    data[userId].TIME_SINCE_COLLECT = Date.now();
    data[userId].TIME_SINCE_ATK = 0;
    data[userId].TIME_FOR_REST_ATK = 0;
    data[userId].TIME_SINCE_DEF = 0;
    data[userId].TIME_FOR_REST_DEF = 0;
    data[userId].TIME_SINCE_MANA = 0;
    data[userId].TIME_FOR_REST_MANA = 0;
    data[userId].TIME_SINCE_HEALTH = 0;
    data[userId].TIME_FOR_REST_HEALTH = 0;
    
    await writeData(data);
    
    return message.reply(
      `${message.author.username} rebirthed. They are now reborn with greater power, having ${data[userId].REBIRTH} rebirths.`
    );
  } else {
	  return message.reply(
      `You still do not have enough knowledge yet.`
    );
  }
};

module.exports.help = {
  name: "Rebirth",
  description: "Be reborn and gain more power easily",
  category: "Fun",
  command: "idle.rebirth",
};
