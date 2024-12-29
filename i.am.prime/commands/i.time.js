const Discord = require("discord.js");
const { loadData } = require("../modules/_idle.js");

module.exports.run = async (client, message, args) => {
  const data = await loadData();
  let userId = args[0] || message.member.id;
  if (message.mentions.users.size > 0) {
    userId = message.mentions.users.first().id;
  }
  if (data[userId]) {
    const displayName = message.guild.members.cache.get(userId).displayName;
    const embed = new Discord.MessageEmbed()
      .setTitle(`**${displayName}** times:`)
      .setColor("#ffffff");
	const minutesSinceLastCollect = Math.floor((Date.now() - data[userId]["TIME_SINCE_COLLECT"]) / 60000);
	const moneyToAdd = minutesSinceLastCollect * (data[userId]["MONEY_UPGRADES"]+1);
	
	embed.addField(
						  `Info about collect`,
						  `${minutesSinceLastCollect} minutes passed since your last collect. You have ${moneyToAdd} money to collect.`,
						  false
						);
    for (const since in data[userId]) {
      if (since.includes("TIME_SINCE")) {
		const test = since.replace("TIME_SINCE_", "")
		   for (const rest in data[userId]) {
			   if (rest.includes(`TIME_FOR_REST_${test}`)) {
				   const timeLeft = Math.ceil(
					(data[userId][since] + data[userId][rest] - Date.now()) / 60000
				  );
				   if (timeLeft > 0) {
						const completionTime = new Date(Date.now() + timeLeft * 60000).toLocaleTimeString([], {
						  hour: "2-digit",
						  minute: "2-digit",
						  hour12: false,
						});
						embed.addField(
						  `Time left for ${test}`,
						  `You still need to rest for **${timeLeft}** minutes. Rest will be completed around **${completionTime}**.`,
						  true
						);
					  } else {
						  embed.addField(
						  `Time left for ${test}`,
						  `You can do this.`,
						  true
						);
					  }
				}
		   }
      }
	}

    message.reply({
    embeds: [embed],
  });
  } else {
    message.reply("This user is not registered.");
  }
};

module.exports.help = {
  name: "time check",
  description: "Check your times for the idle game",
  category: "Fun",
  command: "idle.time",
};

