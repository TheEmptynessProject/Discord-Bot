const Discord = require("discord.js");
const { loadData, writeData } = require("../modules/_idle.js");

module.exports.run = async (client, message, args) => {
  const data = await loadData();
  const userId = message.member.id;
  if (!data[userId]) return message.reply("This user is not registered")
  const trainCost = Math.floor((
    1000 +
    10 * ((data[userId]["HEALTH"] + 1) ** 1.5) /
    ((data[userId]["HEALTH_UPGRADES"] + 1) / 5))/
	(1+data[userId]["REBIRTH"])
  );
  const money = data[userId]["MONEY"];

  if (money < trainCost) {
    return message.reply(`You need ${trainCost} money to train your health.`);
  }

  let trainDuration = Math.floor((15 + Math.random() * 10 + data[userId]["HEALTH_UPGRADES"] * (trainCost / 1000))/(1+data[userId]["REBIRTH"]));
  let restDuration = Math.floor((25 + Math.random() * 15 + data[userId]["HEALTH_UPGRADES"] * (trainCost / 2000))/(1+data[userId]["REBIRTH"]));

  if (data[userId]["TIME_SINCE_HEALTH"] + data[userId]["TIME_FOR_REST_HEALTH"] > Date.now()) {
    const timeLeft = Math.ceil(
      (data[userId]["TIME_SINCE_HEALTH"] + data[userId]["TIME_FOR_REST_HEALTH"] - Date.now()) / 60000
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

  const critTrain = Math.random() < (0.08 + 0.002 * data[userId]["HEALTH_UPGRADES"]);

  data[userId]["TIME_SINCE_HEALTH"] = Date.now();

  if (critTrain) {
    data[userId]["HEALTH"] += Math.floor(4 * (data[userId]["HEALTH_UPGRADES"] + 11 * (1+data[userId]["REBIRTH"])));
    trainDuration *= 2;
    restDuration *= 0.3;
	data[userId]["TIME_FOR_REST_HEALTH"] = restDuration * 60000;
	data[userId]["MONEY"] -= Math.floor(trainCost*0.7);
    writeData(data);

    return message.reply(
      `You slept for the best **${trainDuration}** minutes of your life. You gained **${Math.floor(4 * (data[userId]["HEALTH_UPGRADES"] + 11))}** health points and need to rest for **${restDuration}** minutes.`
    );
  } else {
    data[userId]["HEALTH"] += Math.floor(2*data[userId]["HEALTH_UPGRADES"] + 11 * (1+data[userId]["REBIRTH"]));
	data[userId]["TIME_FOR_REST_HEALTH"] = restDuration * 60000;
	data[userId]["MONEY"] -= trainCost;
    writeData(data);

    return message.reply(
      `You recovered for **${trainDuration}** minutes and gained **${Math.floor(2*data[userId]["HEALTH_UPGRADES"] + 11)}** health points. You need to rest for **${restDuration}** minutes.`
    );
  }
};

module.exports.help = {
  name: "Train yourself",
  description: "Train your health stat for the idle game",
  category: "Fun",
  command: "idle.recover;idle.sleep",
};
