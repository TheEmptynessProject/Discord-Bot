const Discord = require("discord.js");
const { loadData } = require("../modules/_idle.js");

module.exports.run = async (client, message, args) => {
  const data = await loadData();
  let userId = args[0] || message.member.id;
  if (message.mentions.users.size > 0) {
	userId = message.mentions.users.first().id
}
const member = message.guild.members.cache.get(userId);
  const displayName = member ? member.displayName : "Unknown member";
function formatKey(key) {
  return key.split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

  const embed = new Discord.MessageEmbed()
    .setTitle(`**${displayName}** stats:`)
    .setColor("#ffffff");

  let totalUpgrades = 0;
  if (data[userId]) {
  for (const key in data[userId]) {
    if (!key.includes("TIME")) {
      if (key.includes("_UPGRADES")) {
        totalUpgrades += data[userId][key];
      }
      embed.addField(formatKey(key), (data[userId][key]).toString(), true);
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

  embed.addField("TOTAL UPGRADES", totalUpgrades.toString());
  embed.setDescription(`Power level: ${powerLevel.toString()}`);

  
  message.reply({
    embeds: [embed],
  });
  } else{
	  return message.reply("This user is not registered.")
  }
};

module.exports.help = {
  name: "Stats check",
  description: "Check your stats in the idle game",
  category: "Fun",
  command: "idle.stats;idle.s",
};
