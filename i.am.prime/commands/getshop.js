const Discord = require("discord.js");
const { loadShop } = require("../modules/_shop.js");

module.exports.run = async (client, message, args) => {
    const shop = await loadShop();

    const embed = new Discord.MessageEmbed().setTitle("Shop Information").setColor("#ffffff");

    for (const [caseName, caseData] of Object.entries(shop)) {
        const caseMoneyCost = caseData.moneyCost;
        const caseGemCost = caseData.gemsCost;
        const caseProbability = caseData.probabilities[0];
        const caseSkinName = caseData.items[0];

        embed.addField("Case Name", caseName.toString(), false);
        embed.addField("Money Cost", caseMoneyCost.toString(), true);
        embed.addField("Gem Cost", caseGemCost.toString(), true);
        embed.addField("Rarest Skin", `${caseSkinName.toString()}`, true);
    }

    return message.reply({
        embeds: [embed]
    });
};

module.exports.help = {
    name: "Shows what the shop has to offer",
    description: "Shows what the shop has to offer",
    category: "Fun",
    command: "get.shop;get.s",
};
