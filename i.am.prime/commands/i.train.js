const Discord = require("discord.js");
const { loadData, writeData } = require("../modules/_idle.js");

module.exports.run = async (client, message, args) => {
  const data = await loadData();
  const userId = message.member.id;
  if (!data[userId]) return message.reply("This user is not registered")
  const trainCost = Math.floor((
    200 +
    20 * ((data[userId]["ATTACK"] + 1) ** 1.2) /
    ((data[userId]["ATTACK_UPGRADES"] + 1) / 10))/
	(1+data[userId]["REBIRTH"])
  );
  const money = data[userId]["MONEY"];

  if (money < trainCost) {
    return message.reply(`You need ${trainCost} money to train your attack.`);
  }

  let trainDuration = Math.floor((15 + Math.random() * 10 + data[userId]["ATTACK_UPGRADES"] * (trainCost / 1000))/(1+data[userId]["REBIRTH"]));
  let restDuration = Math.floor((20 + Math.random() * 20 + data[userId]["ATTACK_UPGRADES"] * (trainCost / 2000))/(1+data[userId]["REBIRTH"]));

  if (data[userId]["TIME_SINCE_ATK"] + data[userId]["TIME_FOR_REST_ATK"] > Date.now()) {
    const timeLeft = Math.ceil(
      (data[userId]["TIME_SINCE_ATK"] + data[userId]["TIME_FOR_REST_ATK"] - Date.now()) / 60000
    );

    if (timeLeft > 0) {
      const completionTime = new Date(Date.now() + (timeLeft * 60000)).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
      return message.reply(
        `You still need to rest for **${timeLeft}** minutes. Rest will be completed around **${completionTime}**.`
      );
    }
  }

  const critTrain = Math.random() < (0.08 + 0.0025 * data[userId]["ATTACK_UPGRADES"]);

  data[userId]["TIME_SINCE_ATK"] = Date.now();

  if (critTrain) {
    data[userId]["ATTACK"] += Math.floor(2 * (data[userId]["ATTACK_UPGRADES"] + 1.5* (1+data[userId]["REBIRTH"])));
    trainDuration *= 1.5;
    restDuration *= 0.5;
	data[userId]["TIME_FOR_REST_ATK"] = restDuration * 60000;
	data[userId]["MONEY"] -= Math.floor(trainCost*0.8);
    writeData(data);

    return message.reply(
      `You were highly motivated to train and gained **${Math.floor(2 * (data[userId]["ATTACK_UPGRADES"] + 1.5))}** attack points. You trained for **${trainDuration}** minutes and need to rest for **${restDuration}** minutes.`
    );
  } else {
    data[userId]["ATTACK"] += data[userId]["ATTACK_UPGRADES"] + 1* (1+data[userId]["REBIRTH"]);
	data[userId]["TIME_FOR_REST_ATK"] = restDuration * 60000;
	data[userId]["MONEY"] -= trainCost;
    writeData(data);

    return message.reply(
      `You trained for **${trainDuration}** minutes and gained **${data[userId]["ATTACK_UPGRADES"] + 1}** attack points. You need to rest for **${restDuration}** minutes.`
    );
  }
};

module.exports.help = {
  name: "Train yourself",
  description: "Train your attack stat for the idle game",
  category: "Fun",
  command: "idle.train;idle.t",
};