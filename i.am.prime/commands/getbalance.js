const { loadData, writeData } = require("../modules/_data.js");

module.exports.run = async (client, message, args) => {
  const data = await loadData();

  let userId = args[0] || message.member.id;
  if (message.mentions.users.size > 0) {
    userId = message.mentions.users.first().id;
  }

  const user = await client.users.fetch(userId);
  const balance = data[userId] || { MONEY: 0, GEMS: 0 };
  const displayName = message.guild.members.cache.get(userId)?.displayName || "Unknown member";

  message.reply(`User ${user.username} has **${balance.MONEY} money** and **${balance.GEMS} gems**.`);
};

module.exports.help = {
  name: "Show balance",
  description: "Shows the balance of a user",
  category: "Fun",
  command: "get.balance;get.bal"
};
