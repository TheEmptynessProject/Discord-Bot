const Discord = require("discord.js");
const { loadData, writeData } = require("../modules/_data.js");
const { loadShop } = require("../modules/_shop.js");
const {
    loadCache,
	insertCache
} = require("../modules/_cache.js");


module.exports.run = async (client, message, args) => {
    const data = await loadData();
    const shop = await loadShop();
	const cache = await loadCache()
    const userId = message.member.id;
    const caseName = args[0];

    if (!caseName) return message.reply("You didn't provide a valid case name.");
	
	let matchingCase = null
	let count = 0
	
    for (const [key, value] of Object.entries(shop)) {
        if (key.toLowerCase().includes(caseName.toLowerCase())) {
			count++;
			matchingCase = key;
		}
    }

    if (count === 0) {
        return message.reply(`No case found with the value "${caseName}".`);
    } else if (count > 1) {
        return message.reply(`There are multiple cases with the value "${caseName}".`);
    }

    
    const userData = data[userId];
    const matchingCaseItem = userData["INV"].find(item => item.name === matchingCase);

if (!matchingCaseItem) {
    return message.reply(`You don't have any more cases of "${matchingCase}".`);
}

if (matchingCaseItem.count <= 0) {
    return message.reply(`You don't have any more cases of "${matchingCase}".`);
}
    const existingCase = userData["INV"].find(item => item.name === matchingCase);
    const { items, probabilities } = shop[matchingCase];

    const createDistribution = (array, weights, size) => {
                            const distribution = [];
                            const sum = weights.reduce((a, b) => a + b);
                            for (let i = 0; i < array.length; ++i) {
                                const count = (weights[i] / sum) * size;
                                for (let j = 0; j < count; ++j) {
                                    distribution.push(i);
                                }
                            }
                            return distribution;
                        };

    const getRandomIndex = distribution => {
        const index = Math.floor(distribution.length * Math.random());
        return distribution[index];
    };

    const qualitiesProbabilities = [14.71, 24.68, 43.18, 7.92, 9.93];
    const qualities = ['Factory New', 'Minimal Wear', 'Field-Tested', 'Well-Worn', 'Battle-Scarred'];
    const standOrStat = ['Standard', 'StatTrak™'];
    const standOrStatProbabilities = [91, 9];

    const distribution1 = createDistribution(items, probabilities, 100);
    const distribution2 = createDistribution(qualities, qualitiesProbabilities, 100);
    const distribution3 = createDistribution(standOrStat, standOrStatProbabilities, 100);

    let unboxed, unboxedQuality, unboxedStandStat, actualUnboxed, imgURL, priceURL, skinValue, skinIMG, encodedURL1, encodedURL2;

    const embed = new Discord.MessageEmbed();

    const fetchPriceAndImage = async url => {
        try {
            const response = await fetch(url);
            const { lowest_price } = await response.json();
            skinValue = lowest_price;
            embed.setDescription('Price: ' + skinValue);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getRandomItem = (array, distribution, val) => {
        const index = getRandomIndex(distribution);
		if (val) {
		embed.setColor(shop[matchingCase].rarity[index]);
		}
        return array[index];
    };

        unboxed = getRandomItem(items, distribution1, true);

    unboxedQuality = getRandomItem(qualities, distribution2, false);

    unboxedStandStat = getRandomItem(standOrStat, distribution3, false);

if (unboxed === "Special") {
    unboxed = getRandomItem(shop["special"], []);
}

actualUnboxed = unboxed + ' (' + unboxedQuality + ')';

if (unboxedStandStat === 'StatTrak™') {
	actualUnboxed = 'StatTrak™ ' + actualUnboxed;
    priceURL = 'http://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=' + actualUnboxed;
    imgURL = 'https://api.steamapis.com/image/item/730/' + actualUnboxed;
    encodedURL1 = encodeURI(priceURL);
    encodedURL2 = encodeURI(imgURL);
} else if (unboxedStandStat === 'Standard') {
    priceURL = 'http://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=' + actualUnboxed;
    imgURL = 'https://api.steamapis.com/image/item/730/' + actualUnboxed;
    encodedURL1 = encodeURI(priceURL);
    encodedURL2 = encodeURI(imgURL);
}
if (cache[actualUnboxed]) {
	embed.setImage(cache[actualUnboxed].imageUrl);
	embed.setTitle('Unboxed ' + actualUnboxed + ' from ' + matchingCase);
	embed.setDescription('Price: ' + cache[actualUnboxed].price);
    message.reply({ embeds: [embed] });
} else {
const fetchPromises = [
    fetchPriceAndImage(encodedURL1)
];

Promise.all(fetchPromises)
    .then(() => {
        embed.setImage(encodedURL2);
        embed.setTitle('Unboxed ' + actualUnboxed + ' from ' + matchingCase);
		if (skinValue) {
		insertCache(actualUnboxed, skinValue, encodedURL2)
		} else {
			insertCache(actualUnboxed, null, encodedURL2)
		}
        message.reply({ embeds: [embed] });
    })
    .catch(error => {
		console.log(error)
        embed.setImage(encodedURL2);
        embed.setTitle('Unboxed ' + actualUnboxed + ' from ' + matchingCase);
		embed.setDescription('Price: *error*');
        message.reply({ embeds: [embed] });
    });
}
if (userData["INV"].find(item => item.name === actualUnboxed)) {
    const existingCase = userData["INV"].find(item => item.name === actualUnboxed);
    existingCase.count++;
} else {
    userData["INV"].push({ type: "ITEM", name: actualUnboxed, count: 1 });
}

existingCase.count--;
userData["EXP"]++
writeData(data);
};


module.exports.help = {
    name: "Unbox a case from your inventory",
    description: "Unbox a case from your inventory",
    category: "Fun",
    command: "get.unbox;get.u"
};
