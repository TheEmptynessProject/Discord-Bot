const Discord = require("discord.js");
const { loadData, writeData } = require("../modules/_data.js");
const { loadShop } = require("../modules/_shop.js");

module.exports.run = async (client, message, args) => {
    const data = await loadData();
    const shop = await loadShop();
    const userId = message.member.id;
    const caseName = args[0];

    if (!caseName) {
        return message.reply("You didn't provide a valid case name.");
    }

    let count = 0;
    let matchingCase = null;

    for (const [key, value] of Object.entries(shop)) {
        if (key.toLowerCase().includes(caseName.toLowerCase())) {
            count++;
            matchingCase = key;
        }
    }

    if (count > 1) {
        return message.reply(`There are multiple cases with the value "${caseName}".`);
    } else if (count <= 0) {
        return message.reply(`No case found with the value "${caseName}".`);
    } else if (count === 1) {
        const currency = args[1];

        if (!currency) {
            return message.reply("You didn't specify what currency to use.");
        }

        const userData = data[userId];

        if (currency.toLowerCase().startsWith("m")) {
            const cost = shop[matchingCase]["moneyCost"];

            if (userData["MONEY"] >= cost) {
                let caseCount = 0;
				if (args[2]) {
                if (args[2].toUpperCase() === "MAX") {
                    let count = 0;

					while (userData["MONEY"] >= cost) {
                        count++;
                        userData["MONEY"] -= cost;
						if (userData["INV"].find(item => item.name === matchingCase)) {
                        const existingCase = userData["INV"].find(item => item.name === matchingCase);
                        existingCase.count++;
                        caseCount = existingCase.count;
                    } else {
                        userData["INV"].push({ type: "CASE", name: matchingCase, count: 1 });
                        caseCount = 1;
                    }
                    }

                    writeData(data);
					const embed = new Discord.MessageEmbed()
						.setTitle(`You bought **${count} ${matchingCase}** for **${cost * count}** money`)
						.setDescription(`You now have **${caseCount}** of this case and **${userData["MONEY"]}** money`)
						.setImage(shop[matchingCase].imageUrl)	
						.setColor('#ffffff');
                    return message.reply({ embeds: [embed] });
                } else if (parseInt(args[2])) {//2
                    let count = 0;

					while (userData["MONEY"] >= cost && count < (parseInt(args[2]))) {
                        count++;
                        userData["MONEY"] -= cost;
						if (userData["INV"].find(item => item.name === matchingCase)) {
                        const existingCase = userData["INV"].find(item => item.name === matchingCase);
                        existingCase.count++;
                        caseCount = existingCase.count;
                    } else {
                        userData["INV"].push({ type: "CASE", name: matchingCase, count: 1 });
                        caseCount = 1;
                    }
                    }

                    

                    writeData(data);
                    const embed = new Discord.MessageEmbed()
						.setTitle(`You bought **${count} ${matchingCase}** for **${cost * count}** money`)
						.setDescription(`You now have **${caseCount}** of this case and **${userData["MONEY"]}** money`)
						.setImage(shop[matchingCase].imageUrl)
						.setColor('#ffffff');
                    return message.reply({ embeds: [embed] });
				}
                } else {
					userData["MONEY"] -= cost;
                    if (userData["INV"].find(item => item.name === matchingCase)) {
                        const existingCase = userData["INV"].find(item => item.name === matchingCase);
                        existingCase.count++;
                        caseCount = existingCase.count;
                    } else {
                                                userData["INV"].push({ type: "CASE", name: matchingCase, count: 1 });
                        caseCount = 1;
                    }

                    writeData(data);
                    const embed = new Discord.MessageEmbed()
						.setTitle(`You bought **1 ${matchingCase}** for **${cost}** money`)
						.setDescription(`You now have **${caseCount}** of this case and **${userData["MONEY"]}** money`)
						.setImage(shop[matchingCase].imageUrl)
						.setColor('#ffffff');						
                    return message.reply({ embeds: [embed] });
                }
            } else {
                return message.reply(`You do not have enough money. This case costs: **${cost}** money and you have **${userData["MONEY"]}** money`);
            }
        } else if (currency.toLowerCase().startsWith("g")) {
            const cost = shop[matchingCase]["gemsCost"];

            if (userData["GEMS"] >= cost) {
                let caseCount = 0;
				if (args[2]) {
                if (args[2].toUpperCase() === "MAX") {
                    let count = 0;

					while (userData["GEMS"] >= cost) {
                        count++;
                        userData["GEMS"] -= cost;
if (userData["INV"].find(item => item.name === matchingCase)) {
                        const existingCase = userData["INV"].find(item => item.name === matchingCase);
                        existingCase.count++;
                        caseCount = existingCase.count;
                    } else {
                        userData["INV"].push({ type: "CASE", name: matchingCase, count: 1 });
                        caseCount = 1;
                    }

                    }

                    
                    writeData(data);
                   const embed = new Discord.MessageEmbed()
						.setTitle(`You bought **${count} ${matchingCase}** for **${cost * count}** gems`)
						.setDescription(`You now have **${caseCount}** of this case and **${userData["GEMS"]}** gems`)
						.setImage(shop[matchingCase].imageUrl)	
						.setColor('#ffffff');
                    return message.reply({ embeds: [embed] });
                } else if (parseInt(args[2])) {//2
                    let count = 0;

					while (userData["GEMS"] >= cost && count < (parseInt(args[2]))) {
                        count++;
                        userData["GEMS"] -= cost;
if (userData["INV"].find(item => item.name === matchingCase)) {
                        const existingCase = userData["INV"].find(item => item.name === matchingCase);
                        existingCase.count++;
                        caseCount = existingCase.count;
                    } else {
                        userData["INV"].push({ type: "CASE", name: matchingCase, count: 1 });
                        caseCount = 1;
                    }
                    }

                    

                    writeData(data);
                    const embed = new Discord.MessageEmbed()
						.setTitle(`You bought **${count} ${matchingCase}** for **${cost * count}** gems`)
						.setDescription(`You now have **${caseCount}** of this case and **${userData["GEMS"]}** gems`)
						.setImage(shop[matchingCase].imageUrl)	
						.setColor('#ffffff');
                    return message.reply({ embeds: [embed] });
				}
                } else {
					userData["GEMS"] -= cost;
                    if (userData["INV"].find(item => item.name === matchingCase)) {
                        const existingCase = userData["INV"].find(item => item.name === matchingCase);
                        existingCase.count++;
                        caseCount = existingCase.count;
                    } else {
                                                userData["INV"].push({ type: "CASE", name: matchingCase, count: 1 });
                        caseCount = 1;
                    }

                    writeData(data);
                    const embed = new Discord.MessageEmbed()
						.setTitle(`You bought **1 ${matchingCase}** for **${cost}** gems`)
						.setDescription(`You now have **${caseCount}** of this case and **${userData["GEMS"]}** gems`)
						.setImage(shop[matchingCase].imageUrl)	
						.setColor('#ffffff');
                    return message.reply({ embeds: [embed] });
                }
            } else {
                return message.reply(`You do not have enough gems. This case costs: **${cost}** gems and you have **${userData["GEMS"]}** gems`);
            }
        }
    }
};

module.exports.help = {
    name: "Buy a case from the shop",
    description: "Buy a case from the shop",
    category: "Fun",
    command: "get.case;get.c",
};

