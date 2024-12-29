const { loadData, writeData } = require("../modules/_data.js");
const Discord = require("discord.js");
const { loadCache, insertCache } = require("../modules/_cache.js");

module.exports.run = async (client, message, args) => {
    const data = await loadData();
    const cache = await loadCache();
    let userId = args[0] || message.member.id;
    if (message.mentions.users.size > 0) {
        userId = message.mentions.users.first().id;
    }

    const user = await client.users.fetch(userId);
    const inventory = data[userId]?.INV || {};

    let sortedInventory = Object.entries(inventory)
        .filter(([_, item]) => item.count > 0)
        .map(([name, item]) => ({
            name: item.name,
            count: item.count,
            price: cache[item.name]?.price,
        }))
        .sort((a, b) => {
            if (a.price && b.price) {
                return (
                    parseFloat(b.price.replace(/[^0-9,.-]+/g, "").replace(",", ".")) -
                    parseFloat(a.price.replace(/[^0-9,.-]+/g, "").replace(",", "."))
                );
            } else if (a.price) {
                return -1;
            } else if (b.price) {
                return 1;
            } else {
                return 0;
            }
        });

    const codeBlock = "```js\n";
    const maxMessageLength = 2000;
    const maxStringLength = maxMessageLength - codeBlock.length - 3; // Consider space for "```" at the end

    let inventoryString = `Inventory of ${user.username}\n`;
    let totalValue = 0;
    let currentPart = `${codeBlock}${inventoryString}`;
    let currentPartLength = currentPart.length;

    if (sortedInventory.length === 0) {
        inventoryString += "The inventory is empty.";
    } else {
        for (const item of sortedInventory) {
            let itemString = `${item.name} x${item.count} - ${item.price}\n`;

            if (currentPartLength + itemString.length > maxStringLength) {
                currentPart += "```";
                message.channel.send(currentPart);

                currentPart = `${codeBlock}${itemString}`;
                currentPartLength = currentPart.length;
            } else {
                currentPart += itemString;
                currentPartLength += itemString.length;
            }

            if (item.price) {
                totalValue += item.count * parseFloat(item.price.replace(/[^0-9,.-]+/g, "").replace(",", "."));
            }
        }
    }

    currentPart += "```";
    message.channel.send(currentPart);

    // Send the total value as a separate message
    const totalValueMessage = `\`\`\`ansi\n[2;31mTotal value: ${totalValue.toFixed(2)}€[0m\n\`\`\``;
    message.channel.send(totalValueMessage);
};

module.exports.help = {
    name: "showInventory",
    description: "Shows the inventory of a user",
    category: "Fun",
    command: "get.inventory;get.inv",
};
