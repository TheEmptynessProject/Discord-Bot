const Discord = require("discord.js");
const { loadData, updateData } = require("../modules/_idle.js");

module.exports.run = async (client, message, args) => {
	const data = await loadData()
	if (data[message.member.id]) {
		return message.reply("Already registered")
	} else 
	{
		updateData(client,message)
	return message.reply("Registered succesfully")
	}
	
};

module.exports.help = {
  name: "Register",
  description: "Register yourself to the idle game",
  category: "Fun",
  command: "idle.register;idle.r",
};
