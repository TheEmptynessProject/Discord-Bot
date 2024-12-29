const Discord = require("discord.js");
const { loadData, writeData } = require("../modules/_idle.js");

module.exports.run = async (client, message, args) => {
  const data = await loadData();
  const userId = message.member.id;
  if (!data[userId]) return message.reply("This user is not registered")
  const trainCost = Math.floor((
    500 +
    10 * ((data[userId]["MANA"] + 1) ** 1.75) /
    ((data[userId]["MANA_UPGRADES"] + 1) / 10))/
	(1+data[userId]["REBIRTH"])
  );
  const money = data[userId]["MONEY"];

  if (money < trainCost) {
    return message.reply(`You need ${trainCost} money to train your mana.`);
  }

  let trainDuration = Math.floor((15 + Math.random() * 25 + data[userId]["MANA_UPGRADES"] * (trainCost / 1000))/(1+data[userId]["REBIRTH"]));
  let restDuration = Math.floor((25 + Math.random() * 15 + data[userId]["MANA_UPGRADES"] * (trainCost / 2000))/(1+data[userId]["REBIRTH"]));

  if (data[userId]["TIME_SINCE_MANA"] + data[userId]["TIME_FOR_REST_MANA"] > Date.now()) {
    const timeLeft = Math.ceil(
      (data[userId]["TIME_SINCE_MANA"] + data[userId]["TIME_FOR_REST_MANA"] - Date.now()) / 60000
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

  const critTrain = Math.random() < (0.08 + 0.002 * data[userId]["MANA_UPGRADES"]);

  data[userId]["TIME_SINCE_MANA"] = Date.now();

  if (critTrain) {
    data[userId]["MANA"] += Math.floor(4 * (data[userId]["MANA_UPGRADES"] + 5* (1+data[userId]["REBIRTH"])));
    trainDuration *= 2;
    restDuration *= 0.3;
	data[userId]["TIME_FOR_REST_MANA"] = restDuration * 60000;
	data[userId]["MONEY"] -= Math.floor(trainCost*0.7);
    writeData(data);

    return message.reply(
      `You found nymphs in a forest and meditated with them for **${Math.floor(4 * (data[userId]["MANA_UPGRADES"] + 5))}** mana points. You focused for **${trainDuration}** minutes and need to rest for **${restDuration}** minutes.`
    );
  } else {
    data[userId]["MANA"] += Math.floor(3 * (data[userId]["MANA_UPGRADES"] + 3* (1+data[userId]["REBIRTH"])));
	data[userId]["TIME_FOR_REST_MANA"] = restDuration * 60000;
	data[userId]["MONEY"] -= trainCost;
    writeData(data);

    return message.reply(
      `You meditated for **${trainDuration}** minutes and gained **${ Math.floor(3 * (data[userId]["MANA_UPGRADES"] + 3))}** mana points. You need to rest for **${restDuration}** minutes.`
    );
  }
};

module.exports.help = {
  name: "Train yourself",
  description: "Train your mana stat for the idle game",
  category: "Fun",
  command: "idle.meditate;idle.m",
};
