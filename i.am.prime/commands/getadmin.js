const Discord = require("discord.js");
const { loadData, writeData } = require("../modules/_data.js");

module.exports.run = async (client, message, args) => {

if (!message.author.id == '972169575263264848') return message.reply("You don't have permission to use this command.");
  const data = await loadData();
let option = args[0]
let option2 = args[1]
let option3 = args[2]
if (!option3 || !option2 || !option) {
	return message.reply("Not enough options.").then(msg => {
		console.log("Not enough options for admin command.")
	message.delete()
    msg.delete();
  });
}
  let userId = args[3] || message.author.id;
  if (message.mentions.users.size > 0) {
    userId = message.mentions.users.first().id;
  }
	if (option.toLowerCase() == 'set') {
		if (option2.toLowerCase().startsWith("m")) {
			data[userId]["MONEY"] = parseInt(option3)
			message.delete()
			return writeData(data)
		} else if (option2.toLowerCase().startsWith("g")) {
			data[userId]["GEMS"] = parseInt(option3)
			message.delete()
			return writeData(data)
		}
	} else if (option.toLowerCase() == 'add') {
		if (option2.toLowerCase().startsWith("m")) {
			data[userId]["MONEY"] = parseInt(data[userId]["MONEY"]) + parseInt(option3)
			message.delete()
			return writeData(data)
		} else if (option2.toLowerCase().startsWith("g")) {
			data[userId]["GEMS"] = parseInt(data[userId]["GEMS"]) + parseInt(option3)
			message.delete()
			return writeData(data)
		}
	} else if (option.toLowerCase() == 'take') {
		if (option2.toLowerCase().startsWith("m")) {
			if (parseInt(data[userId]["MONEY"]) - parseInt(option3)<0) {
				data[userId]["MONEY"] = 0
			} else {
			data[userId]["MONEY"] = parseInt(data[userId]["MONEY"]) - parseInt(option3)
			}
			message.delete()
			return writeData(data)
		} else if (option2.toLowerCase().startsWith("g")) {
			if (parseInt(data[userId]["GEMS"]) - parseInt(option3)<0) {
				data[userId]["GEMS"] = 0
			} else {
			data[userId]["GEMS"] = parseInt(data[userId]["GEMS"]) - parseInt(option3)
			}
			message.delete()
			return writeData(data)
		}
	}
	
};

module.exports.help = {
    name: "",
    description: "nothing",
    category: "Debug",
    command: "get.admin",
};
