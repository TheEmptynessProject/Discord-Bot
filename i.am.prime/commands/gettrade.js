const Discord = require("discord.js");
const {
    loadData,
    writeData
} = require("../modules/_data.js");
const {
    loadTrades,
    insertTrade,
    writeTrade
} = require("../modules/_getTradeSystem.js");
class trade {
    constructor(creationTime, authorId, otherId, authorAccept, otherAccept, items_author_give, items_author_receive) {
        this.creationTime = creationTime;
        this.authorId = authorId;
        this.otherId = otherId;
        this.authorAccept = authorAccept;
        this.otherAccept = otherAccept;
        this.items_author_give = items_author_give;
        this.items_author_receive = items_author_receive;
    }
}
module.exports.run = async (client, message, args) => {
    const data = await loadData();
    const trades = await loadTrades();
    const authorId = message.author.id;
    let otherId = args[0];
    const [giveItemsString, receiveItemString] = args.slice(1).join(" ").split("=");

    if (message.mentions.users.size == 0) {
        if (args[0].toLowerCase() === "show") {
            const embed = new Discord.MessageEmbed()
                .setColor("ffffff")
                .setTitle(`Active trades:`);

            for (const x in trades) {
                const trade = trades[x];
                const isAuthorTrade = trade.authorId === message.author.id;
                const user = await client.users.fetch(isAuthorTrade ? trade.otherId : trade.authorId);

                embed.addField(`Trade created by:`, isAuthorTrade ? message.author.username : user.username, false);
                embed.addField(`Trade sent to:`, isAuthorTrade ? user.username : message.author.username, false);
                embed.addField(`Trade id:`, `${x}`, true);
                embed.addField(`You ${isAuthorTrade ? 'give' : 'receive'}`, trade.items_author_give.map(item => item.name).join(", ").toString() || "error", true);
                embed.addField(`You ${!isAuthorTrade ? 'give' : 'receive'}`, trade.items_author_receive.map(item => item.name).join(", ").toString() || "error", true);
            }

            return message.reply({
                embeds: [embed]
            });
        } else if (args[0].toLowerCase() == "accept") {
            const tradeId = args[1]
            if (!tradeId) return message.reply("You did not specify the trade ID.")
            for (x in trades) {
                if (trades[x].otherId == message.author.id && x == tradeId) {
					const user = await client.users.fetch(trades[x].otherId)
                    const embed = new Discord.MessageEmbed()
                        .setColor("00ff00")
                        .setTitle(`Trade accepted:`)
                    embed.addField(`Trade created by:`, `${user.username}`, false)
                    embed.addField(`Trade sent to:`, `${message.author.username}`, false)
                    embed.addField(`Trade id:`, `${x}`, false)
                    embed.addField("${user.username} gets:", trades[x].items_author_give.map(item => item.name).join(", ").toString() || "error", true)
                    embed.addField("${message.author.username} gets:", trades[x].items_author_receive.map(item => item.name).join(", ").toString() || "error", true);
                    trades[x].otherAccept = true;
                    if (trades[x].otherAccept && trades[x].authorAccept) {
						for (y in trades[x].items_author_receive) {
						if (data[message.author.id]["INV"].find(item => item.name === trades[x].items_author_receive[y].name)) {
							const existingItem = data[message.author.id]["INV"].find(item => item.name === trades[x].items_author_receive[y].name);
							
							const existingItemOther = data[trades[x].otherId]["INV"].find(item => item.name === trades[x].items_author_receive[y].name);
							if (!existingItemOther || existingItemOther.count <= 0) {
								return message.reply(`${user.username} no longer has the items requested for the trade.`)
							} else {
								existingItemOther.count--;
							}
							existingItem.count++;
						} else {
							const existingItemOther = data[trades[x].otherId]["INV"].find(item => item.name === trades[x].items_author_receive[y].name);
							if (!existingItemOther || existingItemOther.count <= 0) {
								return message.reply(`${user.username} no longer has the items requested for the trade.`)
							} else {
								existingItemOther.count--;
							}
							console.log("HERE")
							data[message.author.id]["INV"].push({ type: "ITEM", name: trades[x].items_author_receive[y].name, count: 1 });
							}
						}
						for (y in trades[x].items_author_give) {
						if (data[trades[x].otherId]["INV"].find(item => item.name === trades[x].items_author_give[y].name)) {
							const existingItem = data[trades[x].otherId]["INV"].find(item => item.name === trades[x].items_author_give[y].name);
							existingItem.count++;
							console.log("HERE2")
						} else {
							data[trades[x].otherId]["INV"].push({ type: "ITEM", name: trades[x].items_author_give[y].name, count: 1 });
							console.log("HERE3")
							}
						}
					await writeData(data)
					delete trades[x]
                    await writeTrade(trades)
                    return message.reply({
                        embeds: [embed]
                    })
                    }
                }
            }
            return message.reply({
                embeds: [embed]
            })
        } else if (args[0].toLowerCase() == "delete") {
            const tradeId = args[1]
            if (!tradeId) return message.reply("You did not specify the trade ID.")
            const embed = new Discord.MessageEmbed()
                .setColor("ff0000")
                .setTitle(`Trade deleted:`)
            for (x in trades) {
                if (trades[x].authorId == message.author.id && x == tradeId) {
                    const user = await client.users.fetch(trades[x].otherId)
                    embed.addField(`Trade created by:`, `${message.author.username}`, false)
                    embed.addField(`Trade sent to:`, `${user.username}`, false)
                    embed.addField(`Trade id:`, `${x}`, false)
                    embed.addField("${user.username} gets:", trades[x].items_author_give.map(item => item.name).join(", ").toString(), true)
                    embed.addField("${message.author.username} gets:", trades[x].items_author_receive.map(item => item.name).join(", ").toString(), true);
					for (y in trades[x].items_author_give) {
						if (data[message.author.id]["INV"].find(item => item.name === trades[x].items_author_give[y].name)) {
							const existingItem = data[message.author.id]["INV"].find(item => item.name === trades[x].items_author_give[y].name);
							existingItem.count++;
						} else {
							data[message.author.id]["INV"].push({ type: "ITEM", name: trades[x].items_author_give[y].name, count: 1 });
						}
					}
					await writeData(data)
					delete trades[x]
                    await writeTrade(trades)
                    return message.reply({
                        embeds: [embed]
                    })
                } else if (trades[x].otherId == message.author.id && x == tradeId) {
                    return message.reply("You do not have permission to delete this trade.")
                }
            }
            return message.reply({
                embeds: [embed]
            })
        }
    } else if (message.mentions.users.size > 0) {
        otherId = message.mentions.users.first().id;
    }
    if (!giveItemsString || !receiveItemString) return message.reply("Invalid")
    const giveItems = giveItemsString.split(",").map(item => item.trim().toLowerCase());
    const receiveItems = receiveItemString.split(",").map(item => item.trim().toLowerCase());
    const otherUser = await client.users.fetch(otherId);
    const give = [];
    const receive = [];
    const authorInv = data[authorId]?.INV;
    const receiverInv = data[otherId]?.INV;
    let receiveCount = 0
    let giveCount = 0
    let receiveMatched = []
    let giveMatched = []

    for (x in receiveItems) {
        for (y in receiverInv) {
            if (receiverInv[y].count > 0) {
                const abc = receiveItems[x].split(" ")
                const test = simplifySkinName(receiverInv[y].name).split(" ")
                let match = 0
                for (a in abc) {
                    for (b in test) {
                        if (abc[a] == test[b] || test[b].includes(abc[a])) {
                            match++
                            if (abc.length == match) {
                                receiveMatched.push(receiverInv[y])
								//receiverInv[y].count--
                                receiveCount++
                            }
                        }
                    }
                }
            }
        }
    }
    for (x in giveItems) {
        for (y in authorInv) {
            if (authorInv[y].count > 0) {
                const abc = giveItems[x].split(" ")
                const test = simplifySkinName(authorInv[y].name).split(" ")
                let match = 0
                for (a in abc) {
                    for (b in test) {
                        if (abc[a] == test[b] || test[b].includes(abc[a])) {
                            match++
                            if (abc.length == match) {
                                giveMatched.push(authorInv[y])
								authorInv[y].count--
								writeData(data)
                                giveCount++
                            }
                        }
                    }
                }
            }
        }
    }
    if (!(receiveCount == receiveItems.length) || !(giveCount == giveItems.length)) {
        return message.reply("Not defined");
    } else {
        const newTrade = new trade(Date.now(), authorId, otherId, true, false, giveMatched, receiveMatched);
        insertTrade(newTrade);
        const embed = new Discord.MessageEmbed()
            .setColor("ffffff")
            .setTitle(`${message.author.username} sent you a trade request:`)
            .setTimestamp(newTrade.creationTime)
            .addField("You receive:", giveMatched.map(item => item.name).join(", ").toString() || "error", false)
            .addField("You give:", receiveMatched.map(item => item.name).join(", ").toString() || "error", true);

        otherUser.send({
                embeds: [embed]
            })
            .then(() => {
                return message.reply(`Trade request sent to ${otherUser.username}.`);
            })
            .catch((error) => {
                console.error(`Failed to send trade request to ${otherUser.username}: ${error}`);
                return message.reply(`Failed to send trade request to ${otherUser.username}.`);
            });
    }

};

function simplifySkinName(name) {
    return name.replace("-", '').replace("| ", '').replace("(", '').replace(")", '').replace("™", "").replace("-", " ").replace("_", " ").replace(".", "").toLowerCase();
}

module.exports.help = {
    name: "trade",
    description: "Initiate a trade with someone",
    category: "Fun",
    command: "get.trade"
};