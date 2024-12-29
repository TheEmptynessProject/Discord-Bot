const Discord = require("discord.js");
const { loadData, writeData } = require("../modules/_idle.js");

module.exports.run = async (client, message, args) => {
  const data = await loadData();
  const userId = message.member.id;
  if (!data[userId]) return message.reply("This user is not registered");

  const DEFtrainCost = Math.floor((150 + 25 * ((data[userId]["DEFENSE"] + 1) ** 1.4) / ((data[userId]["DEFENSE_UPGRADES"] + 1) / 10)) / (1 + data[userId]["REBIRTH"]));
  const ATKtrainCost = Math.floor((200 + 20 * ((data[userId]["ATTACK"] + 1) ** 1.2) / ((data[userId]["ATTACK_UPGRADES"] + 1) / 10)) / (1 + data[userId]["REBIRTH"]));
  const MANAtrainCost = Math.floor((500 + 10 * ((data[userId]["MANA"] + 1) ** 1.75) / ((data[userId]["MANA_UPGRADES"] + 1) / 10)) / (1 + data[userId]["REBIRTH"]));
  const HPtrainCost = Math.floor((1000 + 10 * ((data[userId]["HEALTH"] + 1) ** 1.5) / ((data[userId]["HEALTH_UPGRADES"] + 1) / 5)) / (1 + data[userId]["REBIRTH"]));
  
  let DEFtrainDuration = Math.floor((10 + Math.random() * 10 + data[userId]["DEFENSE_UPGRADES"] * (DEFtrainCost / 1000))/(1+data[userId]["REBIRTH"]));
  let DEFrestDuration = Math.floor((20 + Math.random() * 10 + data[userId]["DEFENSE_UPGRADES"] * (DEFtrainCost / 2000))/(1+data[userId]["REBIRTH"]));
  let HPtrainDuration = Math.floor((15 + Math.random() * 10 + data[userId]["HEALTH_UPGRADES"] * (HPtrainCost / 1000))/(1+data[userId]["REBIRTH"]));
  let HPrestDuration = Math.floor((25 + Math.random() * 15 + data[userId]["HEALTH_UPGRADES"] * (HPtrainCost / 2000))/(1+data[userId]["REBIRTH"]));
  let MANAtrainDuration = Math.floor((15 + Math.random() * 25 + data[userId]["MANA_UPGRADES"] * (MANAtrainCost / 1000))/(1+data[userId]["REBIRTH"]));
  let MANArestDuration = Math.floor((25 + Math.random() * 15 + data[userId]["MANA_UPGRADES"] * (MANAtrainCost / 2000))/(1+data[userId]["REBIRTH"]));
  let ATKtrainDuration = Math.floor((15 + Math.random() * 10 + data[userId]["ATTACK_UPGRADES"] * (ATKtrainCost / 1000))/(1+data[userId]["REBIRTH"]));
  let ATKrestDuration = Math.floor((20 + Math.random() * 20 + data[userId]["ATTACK_UPGRADES"] * (ATKtrainCost / 2000))/(1+data[userId]["REBIRTH"]));
  
  const trainCosts = [
    { stat: "DEFENSE", cost: DEFtrainCost, upgradeStat: "DEFENSE_UPGRADES", restStat: "TIME_FOR_REST_DEF", sinceStat: "TIME_SINCE_DEF", restDur: DEFrestDuration, trainDur: DEFtrainDuration},
    { stat: "ATTACK", cost: ATKtrainCost, upgradeStat: "ATTACK_UPGRADES", restStat: "TIME_FOR_REST_ATK", sinceStat: "TIME_SINCE_ATK", restDur: ATKrestDuration, trainDur: ATKtrainDuration },
    { stat: "MANA", cost: MANAtrainCost, upgradeStat: "MANA_UPGRADES", restStat: "TIME_FOR_REST_MANA", sinceStat: "TIME_SINCE_MANA", restDur: MANArestDuration, trainDur: MANAtrainDuration },
    { stat: "HEALTH", cost: HPtrainCost, upgradeStat: "HEALTH_UPGRADES", restStat: "TIME_FOR_REST_HEALTH", sinceStat: "TIME_SINCE_HEALTH", restDur: HPrestDuration, trainDur: HPtrainDuration}
  ];

  trainCosts.sort((a, b) => a.cost - b.cost);

  let trainIndex = 0;
  let statTrained = false;

  while (trainIndex < trainCosts.length) {
    const trainCost = trainCosts[trainIndex].cost;
    const stat = trainCosts[trainIndex].stat;
    const upgradeStat = trainCosts[trainIndex].upgradeStat;
    const restStat = trainCosts[trainIndex].restStat;
    const sinceStat = trainCosts[trainIndex].sinceStat;
	const restDuration = trainCosts[trainIndex].restDur
	const trainDuration = trainCosts[trainIndex].trainDur

    if (data[userId]["MONEY"] >= trainCost) {
		statTrained = true
      if (data[userId][sinceStat] + data[userId][restStat] > Date.now()) {
    const timeLeft = Math.ceil(
      (data[userId][sinceStat] + data[userId][restStat] - Date.now()) / 60000
    );

    if (timeLeft > 0) {
      const completionTime = new Date(Date.now() + (timeLeft * 60000)).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
      message.reply(
        `To train ${stat} you still need to rest for **${timeLeft}** minutes. Rest will be completed around **${completionTime}**.`
      );
	  trainIndex++
	  continue
    }
  }

  const critTrain = Math.random() < (0.08 + 0.002 * data[userId][upgradeStat]);

  data[userId][sinceStat] = Date.now();

  if (critTrain) {
    data[userId][stat] += Math.floor(4 * (data[userId][upgradeStat] + 11 * (1+data[userId]["REBIRTH"])));
	data[userId][restStat] = restDuration*0.3 * 60000;
	data[userId]["MONEY"] -= Math.floor(trainCost*0.7);
    writeData(data);

    message.reply(
      `You trained ${stat} for the best **${trainDuration*2}** minutes of your life. You gained **${Math.floor(4 * (data[userId][upgradeStat] + 11))}** and need to rest for **${restDuration*0.3}** minutes.`
    );
  } else {
    data[userId][stat] += Math.floor(2*data[userId][upgradeStat] + 11 * (1+data[userId]["REBIRTH"]));
	data[userId][restStat] = restDuration * 60000;
	data[userId]["MONEY"] -= trainCost;
    writeData(data);

    message.reply(
      `You trained ${stat} for **${trainDuration}** minutes and gained **${Math.floor(2*data[userId][upgradeStat] + 11)}**. You need to rest for **${restDuration}** minutes.`
    );
  }
}

trainIndex++;
}

if (!statTrained) {
message.channel.send("You don't have enough money to train any stats.");
}
};

module.exports.help = {
name: "Train yourself",
description: "Train all stats for the idle game",
category: "Fun",
command: "idle.all",
};
