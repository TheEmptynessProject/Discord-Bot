//LOGGIN IN START-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
console.log('Starting up...')
const Discord = require('discord.js');
const XMLHttpRequest = require('xhr2');
//const Mongo = require('mongodb');
const playdl = require('play-dl');
const fs = require('fs');
const {
    joinVoiceChannel,
    createAudioPlayer,
    demuxProbe,
    NoSubscriberBehavior,
    createAudioResource,
    AudioPlayerStatus,
    getVoiceConnection
} = require('@discordjs/voice');
//const {
//    MongoClient
//} = require('mongodb');
const {
    TOKEN
} = require('./config');
const {
    Client,
    Util,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    Intents
} = require('discord.js');
//var db_url = "mongodb+srv://admin:CT8H6GiHRpX5TUBh@sharedcluster.m6pbqo7.mongodb.net/test";
//const connection = new MongoClient(db_url);
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.GUILD_SCHEDULED_EVENTS]
})
client.setMaxListeners(100);
const prefix = "&"
var emotesID = []
var emotesNAMES = []
var isAnimatedEmoji = []
client.on('ready', () => {
    console.log('Online: "' + client.user.tag + '"');
    client.guilds.cache.forEach(async (guild) => {
        for (const emoji of guild.emojis.cache.values()) {
            if (emotesID.includes(emoji.id) || emotesNAMES.includes(emoji.name.toLowerCase())) {
                continue;
            }
            isAnimatedEmoji.push(emoji.animated);
            emotesID.push(emoji.id);
            emotesNAMES.push(emoji.name.toLowerCase());
        }
    });
});

//FUN FACT EACH 2 HOURS
/* var url1 = 'deprecated'
const getFact = new XMLHttpRequest()
setInterval(function() {
	getFact.open('GET', url1);
	getFact.responseType = 'json';
	getFact.onreadystatechange = function() {
		if(getFact.readyState == 4 && getFact.status == 200) {
			client.channels.cache.get('820753075093897226').send(getFact.response.data.fact)
		}
	}
	getFact.send()
}, 7200000) */
//async function mainMongo() {
//    await connection.connect();
//    const Database = connection.db("quantum.byte");
//    data = Database.collection('ServerData');
//    shopvals = Database.collection('ShopVals')
//    return console.log('Connected to Database');
//}
client.login(TOKEN);
//mainMongo()
const emoji_regex = /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])$/;

const urlRegex = /^(?!mailto:)(?:(?:http|https|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:(\/|\?|#)[^\s]*)?$/i;

function isURL(str) {
    return str.length < 2083 && urlRegex.test(str);
}

function rColor() {
    const possibleChars = '0123456789ABCDEF';
    return Array.from({
        length: 6
    }, () => possibleChars[Math.floor(Math.random() * 16)]).join('');
}


function isEmoji(str) {
    return emoji_regex.test(str);
}

function firstCase(str) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
}


setInterval(() => {
    const guildsSize = client.guilds.cache.size;
    client.user.setPresence({
        activities: [{
            name: `Now available in ${guildsSize} guilds`
        }]
    });
}, 60000);


//ADD shopvals VALUES
// setTimeout(function() {
// console.log('Adding values')
// shopvals.insertOne( {
// CASE: 'Riptide Case',
// MONEY_COST: 50, //steam value *10
// GEMS_COST: 0.5, //actual value
// IMG_URL: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU5narKKW4SvIrhw9PZlaPwNuqAxmgBucNz2L3C8dyj31Xn-0VtMW3wdY6LMlhplna0TPI/360fx360f',
// ITEMS: ["Knife", "Desert Eagle | Ocean Drive", "AK-47 | Leet Museo", "Glock-18 | Snack Attack", "SSG 08 | Turbo Peek", "MAC-10 | Toybox", "M4A4 | Spider Lily", "FAMAS | ZX Spectron", "MP9 | Mount Fuji", "Five-SeveN | Boost Protocol", "MAG-7 | BI83 Spectrum", "USP-S | Black Lotus", "XM1014 | Watchdog", "AUG | Plague", "Dual Berettas | Tread", "MP7 | Guerrilla", "PP-Bizon | Lumen", "G3SG1 | Keeping Tabs"],
// KNIFES: ["★ Bowie Knife | Gamma Doppler", "★ Bowie Knife | Lore", "★ Bowie Knife | Black Laminate", "★ Bowie Knife | Autotronic", "★ Bowie Knife | Freehand", "★ Bowie Knife | Bright Water", "★ Butterfly Knife | Gamma Doppler", "★ Butterfly Knife | Autotronic", "★ Butterfly Knife | Freehand", "★ Butterfly Knife | Lore", "★ Butterfly Knife | Black Laminate", "★ Butterfly Knife | Bright Water", "★ Falchion Knife | Gamma Doppler", "★ Falchion Knife | Lore", "★ Falchion Knife | Autotronic", "★ Falchion Knife | Freehand", "★ Falchion Knife | Bright Water", "★ Falchion Knife | Black Laminate", "★ Huntsman Knife | Gamma Doppler", "★ Huntsman Knife | Black Laminate", "★ Huntsman Knife | Lore", "★ Huntsman Knife | Autotronic", "★ Huntsman Knife | Freehand", "★ Huntsman Knife | Bright Water", "★ Shadow Daggers | Lore", "★ Shadow Daggers | Bright Water", "★ Shadow Daggers | Gamma Doppler", "★ Shadow Daggers | Black Laminate", "★ Shadow Daggers | Autotronic", "★ Shadow Daggers | Freehand"],
// PROBABILITIES: [0.25576,0.319695,0.319695,1.06564333333,1.06564333333,1.06564333333,3.19693,3.19693,3.19693,3.19693,3.19693,11.41761,11.41761,11.41761,11.41761,11.41761,11.41761,11.41761]
// })
// }, 10000)
//LOGGING IN END------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//DB SHIT START--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// const avatar = msg.author.displayAvatarURL({
// dynamic: true,
// size: 256
// });
// const embed = new Discord.MessageEmbed()
// .setColor(rColor)
// .setFooter(msg.author.username, avatar)
// .setTitle('UID: ' + authorID)
// .setImage(getRandom.response.image)
// msg.channel.send(embed)
//client.on('messageCreate', (msg) => {
//   if (msg.author.bot) return;
//   const args = msg.content.replace(prefix, '').trim().split(/ +/);
//   const command = args.shift().toLowerCase();
//    if (command === 'register') {
//       data.findOne({
//           UID: msg.author.id
//       }, function(err, doc) {
//           if (doc == null) {
//                msg.channel.send('Adding values')
//               data.insertOne({
//                    UID: msg.author.id,
//                    INV: '',
//                    MONEY: 0,
//                   INV_VAL: 0,
//                    EXP: 0,
//                    GEMS: 0,
//                    GETMONEY_TIME: 0,
//                    GETGEMS_TIME: 0,
//                    FREECASE_TIME: 0
//                });
//            } else {
//                msg.channel.send('UID already exists')
//            }
//        })
//    }
//})
/*
client.on('messageCreate', (msg) => {
    if (msg.author.bot) return;
    const args = msg.content.replace(prefix, '').trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'shop') {
        var casename_array = []
        var money_array = []
        var gems_array = []
        var img_array = []
        var rarest_prob_array = []
        var rarest_name_array = []
        var howManyDocs = -1
        shopvals.find().forEach(function(doc) {
            howManyDocs += 1
            casename_array.push(doc.CASENAME)
            money_array.push(doc.MONEY_COST)
            gems_array.push(doc.GEMS_COST)
            img_array.push(doc.IMG_URL)
            rarest_prob_array.push(doc.PROBABILITIES[0])
            rarest_name_array.push(doc.ITEMS[0])
        });
        const filter1 = i => (i.customId === 'nextPAGE') && i.user.id === msg.author.id;
        const nextPage = msg.channel.createMessageComponentCollector({
            filter1,
            time: 60000
        });
        const filter2 = i => (i.customId === 'prevPAGE') && i.user.id === msg.author.id;
        const prevPage = msg.channel.createMessageComponentCollector({
            filter2,
            time: 60000
        });
        const nextPAGE = new MessageActionRow().addComponents(new MessageButton().setCustomId('nextPAGE').setLabel('Next Page').setStyle('PRIMARY'));
        const prevPAGE = new MessageActionRow().addComponents(new MessageButton().setCustomId('prevPAGE').setLabel('Previous Page').setStyle('PRIMARY'));
        var page_index = -1
        var embed1 = new MessageEmbed()
        embed1.setColor(rColor)
        embed1.setTitle('CASES SHOP')
        embed1.setDescription('Here you can see which cases you can buy, and their cost')
        msg.channel.send({
            content: 'Welcome to the SHOP',
            components: [nextPAGE],
            embeds: [embed1]
        });
        var embed
        nextPage.on('collect', async i => {
            if (i.customId === 'nextPAGE') {
                if (page_index + 1 <= howManyDocs) {
                    page_index += 1
                    embed = new MessageEmbed()
                    embed.setColor(rColor)
                    embed.setDescription('Rarest item is: ' + rarest_name_array[page_index] + ' and the probability to get it is: ' + rarest_prob_array[page_index])
                    embed.setTitle(casename_array[page_index])
                    embed.setImage(img_array[page_index])
                    embed.addFields({
                        name: 'Money cost',
                        value: (money_array[page_index]).toString()
                    }, {
                        name: 'Gem cost',
                        value: (gems_array[page_index]).toString()
                    }, )
                    if (page_index > 0) {
                        var page_num = page_index + 1
                        await i.update({
                            content: 'Page ' + page_num,
                            components: [prevPAGE, nextPAGE],
                            embeds: [embed]
                        });
                    } else {
                        var page_num = page_index + 1
                        await i.update({
                            content: 'Page ' + page_num,
                            components: [nextPAGE],
                            embeds: [embed]
                        });
                    }
                } else {
                    embed = new MessageEmbed()
                    embed.setColor(rColor)
                    embed.setDescription('Rarest item is: ' + rarest_name_array[page_index] + ' and the probability to get it is: ' + rarest_prob_array[page_index])
                    embed.setTitle(casename_array[page_index])
                    embed.setImage(img_array[page_index])
                    embed.addFields({
                        name: 'Money cost',
                        value: (money_array[page_index]).toString()
                    }, {
                        name: 'Gem cost',
                        value: (gems_array[page_index]).toString()
                    }, )
                    await i.update({
                        content: 'There are no more pages',
                        components: [prevPAGE],
                        embeds: [embed]
                    });
                }
            }
        })
        prevPage.on('collect', async i => {
            if (i.customId === 'prevPAGE') {
                if (page_index - 1 >= 0) {
                    page_index -= 1
                    embed = new MessageEmbed()
                    embed.setColor(rColor)
                    embed.setDescription('Rarest item is: ' + rarest_name_array[page_index] + ' and the probability to get it is: ' + rarest_prob_array[page_index])
                    embed.setTitle(casename_array[page_index])
                    embed.setImage(img_array[page_index])
                    embed.addFields({
                        name: 'Money cost',
                        value: (money_array[page_index]).toString()
                    }, {
                        name: 'Gem cost',
                        value: (gems_array[page_index]).toString()
                    }, )
                    if (page_index > 0) {
                        var page_num = page_index + 1
                        await i.update({
                            content: 'Page ' + page_num,
                            components: [prevPAGE, nextPAGE],
                            embeds: [embed]
                        });
                    } else {
                        var page_num = page_index + 1
                        await i.update({
                            content: 'Page ' + page_num,
                            components: [nextPAGE],
                            embeds: [embed]
                        });
                    }
                } else {
                    embed = new MessageEmbed()
                    embed.setColor(rColor)
                    embed.setDescription('Rarest item is: ' + rarest_name_array[page_index] + ' and the probability to get it is: ' + rarest_prob_array[page_index])
                    embed.setTitle(casename_array[page_index])
                    embed.setImage(img_array[page_index])
                    embed.addFields({
                        name: 'Money cost',
                        value: (money_array[page_index]).toString()
                    }, {
                        name: 'Gem cost',
                        value: (gems_array[page_index]).toString()
                    }, )
                    await i.update({
                        content: 'There are no more pages',
                        components: [nextPAGE],
                        embeds: [embed]
                    });
                }
            }
        });
    }
})
client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
    const args = msg.content.replace(prefix, '').trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'unbox') {
        return msg.channel.send('Almost done')
        if (args[0] == null) {
            return msg.channel.send("You didn't specify what to unbox")
        }
        var args_joined = args.join(' ').toLowerCase()
        args_joined = firstCase(args_joined)
        const exists = (await shopvals.find({
            'CASENAME': args_joined
        }).count())
        shopvals.findOne({
            CASENAME: args_joined
        }, function(err, doc) {
            if (doc == null) {
                msg.channel.send('Case not found in database')
            } else {
                const money_cost = doc.MONEY_COST
                const gems_cost = doc.GEMS_COST
                data.findOne({
                    UID: msg.author.id
                }, function(err, doc2) {
                    if (doc2 == null) {
                        msg.channel.send('UID not found in database')
                    } else {
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
                        const randomIndex = distribution => {
                            const index = Math.floor(distribution.length * Math.random());
                            return distribution[index];
                        };
                        const qualities_probabilites = [
                            14.71,
                            24.68,
                            43.18,
                            7.92,
                            9.93
                        ]
                        const qualities = ['Factory New', 'Minimal Wear', 'Field-Tested', 'Well-Worn', 'Battle-Scarred']
                        const stand_OR_stat = ['Standard', 'StatTrak™']
                        const stand_OR_stat_probs = [
                            91,
                            9
                        ]
                        var unboxed;
                        var unboxed_quality;
                        var actualUnboxed;
                        var imgURL;
                        var priceURL;
                        var skinValue
                        var skinIMG
                        var encodedURL1
                        var encodedURL2
                        var embed = new Discord.MessageEmbed()
                        const getPrice = new XMLHttpRequest()
                        const getIMG = new XMLHttpRequest()
                        if (doc2.MONEY - money_cost >= 0) {
                            var temp_items = (doc.ITEMS)
                            var temp_probs = (doc.PROBABILITIES)
                            const distribution1 = createDistribution(temp_items, temp_probs, 100);
                            const distribution2 = createDistribution(qualities, qualities_probabilites, 100);
                            const distribution3 = createDistribution(stand_OR_stat, stand_OR_stat_probs, 100);
                            for (let i = 0; i < 10; ++i) {
                                const index = randomIndex(distribution1);
                                unboxed = (temp_items[index]);
                            }
                            for (let i = 0; i < 10; ++i) {
                                const index2 = randomIndex(distribution2);
                                unboxed_quality = (qualities[index2]);
                            }
                            for (let i = 0; i < 10; ++i) {
                                const index3 = randomIndex(distribution3);
                                unboxed_stand_stat = (stand_OR_stat[index3]);
                            }
                            actualUnboxed = unboxed + ' (' + unboxed_quality + ')';
                            if (unboxed === "Knife") {
                                unboxed = doc.KNIFES[Math.floor(Math.random() * doc.KNIFES.length)]
                                unboxed_quality = ""
                                actualUnboxed = unboxed
                            }
                            if (unboxed_stand_stat === 'StatTrak™') {
                                priceURL = 'http://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=StatTrak%E2%84%A2' + actualUnboxed
                                imgURL = 'https://api.steamapis.com/image/item/730/StatTrak%E2%84%A2' + actualUnboxed
                                encodedURL1 = encodeURI(priceURL);
                                encodedURL2 = encodeURI(imgURL);
                                actualUnboxed = 'StatTrak™ ' + actualUnboxed
                            }
                            if (unboxed_stand_stat === 'Standard') {
                                priceURL = 'http://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=' + actualUnboxed
                                imgURL = 'https://api.steamapis.com/image/item/730/' + actualUnboxed
                                encodedURL1 = encodeURI(priceURL);
                                encodedURL2 = encodeURI(imgURL);
                            }
                            getIMG.onreadystatechange = function() {
                                if (getIMG.readyState == 4 && getIMG.status == 200) {
                                    (skinIMG = getIMG.responseURL);
                                    embed.setImage(skinIMG)
                                }
                                getPrice.onreadystatechange = function() {
                                    if (getPrice.readyState == 4 && getPrice.status == 200) {
                                        (skinValue = getPrice.response.lowest_price);
                                        embed.setDescription('Price: ' + skinValue)
                                        embed.setColor(rColor())
                                        embed.setImage(encodedURL2)
                                        data.updateOne({
                                            UID: msg.author.id
                                        }, {
                                            $set: {
                                                INV_VAL: doc2.INV_VAL + parseFloat(skinValue.replaceAll(',', '.')),
                                                INV: doc2.INV + actualUnboxed + '-',
                                                MONEY: (doc2.MONEY - doc.MONEY_COST)
                                            }
                                        })
                                        msg.channel.send('You spent ' + money_cost + ' conas')
                                        embed.setTitle('Unboxed ' + actualUnboxed + ' from ' + doc.CASENAME)
                                        msg.channel.send({
                                            content: ' ',
                                            embeds: [embed]
                                        });
                                    }
                                }
                            }
                            getPrice.open('GET', encodedURL1, true);
                            getPrice.responseType = 'json';
                            getPrice.send()
                            getIMG.open('GET', encodedURL2, true);
                            getIMG.send();
                        } else if (doc2.GEMS - gems_cost >= 0) {
                            var temp_items = (doc.ITEMS)
                            var temp_probs = (doc.PROBABILITIES)
                            const distribution1 = createDistribution(temp_items, temp_probs, 100);
                            const distribution2 = createDistribution(qualities, qualities_probabilites, 100);
                            const distribution3 = createDistribution(stand_OR_stat, stand_OR_stat_probs, 100);
                            for (let i = 0; i < 10; ++i) {
                                const index = randomIndex(distribution1);
                                unboxed = (temp_items[index]);
                            }
                            for (let i = 0; i < 10; ++i) {
                                const index2 = randomIndex(distribution2);
                                unboxed_quality = (qualities[index2]);
                            }
                            for (let i = 0; i < 10; ++i) {
                                const index3 = randomIndex(distribution3);
                                unboxed_stand_stat = (stand_OR_stat[index3]);
                            }
                            actualUnboxed = unboxed + ' (' + unboxed_quality + ')';
                            if (unboxed === "Knife") {
                                unboxed = doc.KNIFES[Math.floor(Math.random() * doc.KNIFES.length)]
                                unboxed_quality = ""
                                actualUnboxed = unboxed
                            }
                            if (unboxed_stand_stat === 'StatTrak™') {
                                priceURL = 'http://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=StatTrak%E2%84%A2' + actualUnboxed
                                imgURL = 'https://api.steamapis.com/image/item/730/StatTrak%E2%84%A2' + actualUnboxed
                                encodedURL1 = encodeURI(priceURL);
                                encodedURL2 = encodeURI(imgURL);
                                actualUnboxed = 'StatTrak™ ' + actualUnboxed
                            }
                            if (unboxed_stand_stat === 'Standard') {
                                priceURL = 'http://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=' + actualUnboxed
                                imgURL = 'https://api.steamapis.com/image/item/730/' + actualUnboxed
                                encodedURL1 = encodeURI(priceURL);
                                encodedURL2 = encodeURI(imgURL);
                            }
                            getIMG.onreadystatechange = function() {
                                if (getIMG.readyState == 4 && getIMG.status == 200) {
                                    (skinIMG = getIMG.responseURL);
                                    embed.setImage(skinIMG)
                                }
                                getPrice.onreadystatechange = function() {
                                    if (getPrice.readyState == 4 && getPrice.status == 200) {
                                        (skinValue = getPrice.response.lowest_price);
                                        embed.setDescription('Price: ' + skinValue)
                                        embed.setColor(rColor())
                                        embed.setImage(encodedURL2)
                                        data.updateOne({
                                            UID: msg.author.id
                                        }, {
                                            $set: {
                                                INV_VAL: doc2.INV_VAL + parseFloat(skinValue.replaceAll(',', '.')),
                                                INV: doc2.INV + actualUnboxed + '-',
                                                GEMS: (doc2.GEMS - doc.GEMS_COST)
                                            }
                                        })
                                        msg.channel.send('You spent ' + gems_cost + ' gems')
                                        embed.setTitle('Unboxed ' + actualUnboxed + ' from ' + doc.CASENAME)
                                        msg.channel.send({
                                            content: ' ',
                                            embeds: [embed]
                                        });
                                    }
                                }
                            }
                            getPrice.open('GET', encodedURL1, true);
                            getPrice.responseType = 'json';
                            getPrice.send()
                            getIMG.open('GET', encodedURL2, true);
                            getIMG.send();
                        } else {
                            msg.channel.send("You can't afford to buy this case")
                        }
                    }
                })
            }
        })
    }
})
/*

	client.on('messageCreate', (msg) => {
		if(msg.author.bot) return;
		const args = msg.content.replace(prefix, '').trim().split(/ +/);
		const command = args.shift().toLowerCase();
		if(command === '') {
		}
	})
	
 */
//DB SHIT END--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//RPS START--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

client.on('messageCreate', (msg) => {
    if (msg.author.bot) return;
    const args = msg.content.replace(prefix, '').trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'rps') {
        const userChoice = args[0].toLowerCase();
        const options = ["rock", "paper", "scissors"].map(option => option.toLowerCase());
        const random = options[Math.floor(Math.random() * options.length)];
        switch (userChoice) {
            case 'rock':
            case 'r':
                if (random === 'rock') msg.channel.send("**Rock** vs **Rock** : It's a tie!");
                else if (random === 'paper') msg.channel.send("**Rock** vs **Paper** : You win!");
                else if (random === 'scissors') msg.channel.send("**Rock** vs **Scissors** : I win!");
                break;
            case 'paper':
            case 'p':
                if (random === 'rock') msg.channel.send("**Paper** vs **Rock** : I win!");
                else if (random === 'paper') msg.channel.send("**Paper** vs **Paper** : It's a tie!");
                else if (random === 'scissors') msg.channel.send("**Paper** vs **Scissors** : You win!");
                break;
            case 'scissors':
            case 's':
                if (random === 'rock') msg.channel.send("**Scissors** vs **Rock** : You win!");
                else if (random === 'paper') msg.channel.send("**Scissors** vs **Paper** : I win!");
                else if (random === 'scissors') msg.channel.send("**Scissors** vs **Scissors** : It's a tie!");
                break;
            default:
                msg.channel.send("Invalid choice!");
        }
    }
})

//RPS END--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// var player6969_bruh = createAudioPlayer({
    // behaviors: {
        // noSubscriber: NoSubscriberBehavior.Play
    // }
// })
// const toplay_dict = new Map()
// var isPlaying = false
// var connection
// client.on('messageCreate', async (msg) => {
    // try {
        // if (msg.author.bot) return;
        // const args = msg.content.replace(prefix, '').trim().split(' ');
        // const command = args.shift().toLowerCase();
        // const args_var = (args).toString()
        // if (command === 'play' || command === 'p') {
            // if (args == null) return msg.channel.send('You didnt specify any arguments to search for')
            // if (!msg.member.voice.channel) return msg.channel.send('You need to be connected to a Voice Channel')
            // if (toplay_dict.get((msg.guild.id).toString()) == null) {
                // toplay_dict.set((msg.guild.id).toString(), [])
            // }
            // const toadd = args.toString().replaceAll(',', '-')
            // toplay_dict.get((msg.guild.id).toString()).push(toadd + '=0')
            // connection = joinVoiceChannel({
                // channelId: msg.member.voice.channel.id,
                // guildId: msg.guild.id,
                // adapterCreator: msg.guild.voiceAdapterCreator
            // })
            // var start_video = await playdl.search(args_var.replaceAll(',', ' '), {
                // limit: 1
            // })
            // msg.channel.send('Added "**' + start_video[0].title + '**" to the queue')
            // if (!isPlaying) {
                // await playNext(connection, msg.guild.id, msg)
            // }
        // }
    // } catch (e) {
        // console.log(e)
    // }
// })

// async function playNext(connection, guildId, msg) {
    // isPlaying = true
    // if (toplay_dict.get((guildId).toString()) == null || toplay_dict.get((guildId).toString()).length == 0) {
        // connection.destroy()
        // toplay_dict.delete((guildId).toString())
        // toplay_dict.delete((guildId + '?NP').toString())
        // isPlaying = false
        // return
    // }
    // var toplay = toplay_dict.get((guildId).toString()).shift()
    // toplay = toplay.split("=")
    // const numb = toplay.pop()
    // toplay = toplay.toString().replaceAll(',', ' ')
    // const video = await playdl.search(toplay, {
        // limit: 1
    // })
    // toplay_dict.set((guildId + '?NP').toString(), video[numb].title)
    // const stream = await playdl.stream(video[numb].url)
    // const resource = createAudioResource(stream.stream, {
        // inputType: stream.type
    // })
    // player6969_bruh.play(resource)
    // connection.subscribe(player6969_bruh)
    // msg.channel.send('Now playing "**' + video[numb].title + '**"')
// }

// player6969_bruh.on(AudioPlayerStatus.Idle, async () => {
    // if (toplay_dict.size == 0) {
        // isPlaying = false
        // return
    // }
    // const guildId = toplay_dict.keys().next().value
    // await playNext(connection, guildId)
// })

// client.on('messageCreate', async (msg) => {
    // try {
        // if (msg.author.bot) return;
        // const args = msg.content.replace(prefix, '').trim().split(' ');
        // const command = args.shift().toLowerCase();
        // const args_var = (args).toString()
        // if (command === 'skip' || command === 's') {
            // if (!msg.member.voice.channel) return msg.channel.send('You need to be connected to a Voice Channel')
            // if (toplay_dict.get((msg.guild.id).toString()) == null || toplay_dict.get((msg.guild.id).toString()).length == 0) {
                // return msg.channel.send('There is no song to skip')
            // }
            // toplay_dict.get((msg.guild.id).toString()).shift()
            // player6969_bruh.stop()
            // msg.channel.send('Skipped the current song')
        // }
        // if (command === 'queue' || command === 'q') {
            // if (toplay_dict.get((msg.guild.id).toString()) == null || toplay_dict.get((msg.guild.id).toString()).length == 0) {
                // return msg.channel.send('The queue is empty')
            // }
            // const np_song = toplay_dict.get((msg.guild.id + '?NP').toString())
            // let reply = 'Now Playing: ' + np_song + '\n\n'
            // reply += 'Queue:\n'
            // for (let i = 0; i < toplay_dict.get((msg.guild.id).toString()).length; i++) {
                // const video = await playdl.search(toplay_dict.get((msg.guild.id).toString())[i].split('=')[0].replaceAll('-', ' '), {
                    // limit: 1
                // })
                // reply += (i + 1) + '. ' + video[0].title + '\n'
            // }
            // msg.channel.send(reply)
        // }
    // } catch (e) {
        // console.log(e)
    // }
// })
// client.on('messageCreate', async (msg) => {
    // if (msg.author.bot) return;
    // const args = msg.content.replace(prefix, '').trim().split(' ');
    // const command = args.shift().toLowerCase();
    // const args_var = (args).toString()
    // const args_const = (args).toString().toLowerCase()
    // if (command === 'search' || command === 's') {
        // try {
            // if (args == null) return msg.channel.send('You didnt specify any arguments to search for')
            // if (!msg.member.voice.channel) return msg.channel.send('You need to be connected to a Voice Channel')
            // if (toplay_dict.get((msg.guild.id).toString()) == null) {
                // toplay_dict.set((msg.guild.id).toString(), [])
            // }
            // var searched_titles = []
            // var searched_thumbnails = []
            // var searched_urls = []
            // var embed
            // if (isURL(args)) {
                // if (args_const.includes('list')) { //playlists
                    // if (args_const.includes('youtube')) {
                        // const playlist = await playdl.playlist_info(args.toString())
                        // var map = (playlist['fetched_videos'])
                        // var size = map.get('1').length
                        // for (var i = 0; i < size; i++) {
                            // var temp_urls = (map.get('1')[i].url)
                            // var temp_titles = (map.get('1')[i].title)
                            // searched_titles.push(temp_titles)
                            // searched_urls.push(temp_urls)
                            // temp_titles = temp_titles.replaceAll(' ', '-')
                            // toplay_dict.get((msg.guild.id).toString()).push(temp_titles)
                        // }
                        // msg.channel.send('Added ' + size + ' songs to queue')
                    // } else if (args_const.includes('soundcloud')) {
                        // msg.channel.send('Is a soundcloud playlist')
                        // msg.channel.send('Not implemented')
                    // } else if (args_const.includes('deezer')) {
                        // msg.channel.send('Is a deezer playlist')
                        // msg.channel.send('Not implemented')
                    // } else if (args_const.includes('spotify')) {
                        // msg.channel.send('Is a spotify playlist')
                        // msg.channel.send('Not implemented')
                        const getPlaylist = new XMLHttpRequest()
                        const temp_args = args[0].split('/')
                        var play_id = temp_args[4].split('?')
                        play_id = play_id[0]
                        getPlaylist.open('GET', 'https://api.spotify.com/v1/playlists/'+play_id+'/tracks', true);
                        getPlaylist.setRequestHeader('Accept', 'application/json');
                        getPlaylist.setRequestHeader('Content-Type', 'application/json');
                        getPlaylist.setRequestHeader("Authorization", 'Bearer '+spot_token);
                        console.log(getPlaylist)
                        getPlaylist.onreadystatechange = function() {
                        if(getPlaylist.readyState == 4 && getPlaylist.status == 200) {
                        console.log(getPlaylist)
                        }
                        }
                        getPlaylist.send()
                    // }
                // } else { //tracks
                    // if (args_const.includes('youtube')) {
                        // msg.channel.send('Is a youtube track')
                        // msg.channel.send('Not implemented YET')
                    // } else if (args_const.includes('soundcloud')) {
                        // msg.channel.send('Is a soundcloud track')
                        // msg.channel.send('Not implemented')
                    // } else if (args_const.includes('deezer')) {
                        // msg.channel.send('Is a deezer track')
                        // msg.channel.send('Not implemented')
                    // } else if (args_const.includes('spotify')) {
                        // msg.channel.send('Is a spotify track')
                        // msg.channel.send('Not implemented')
                    // }
                // }
            // } else { //search
                // try {
                    // const search = await playdl.search(args_var, {
                        // limit: 5
                    // })
                    // embed = new MessageEmbed()
                    // for (var i = 0; i < 5; i++) {
                        // temp_val = i + 1
                        // searched_titles.push(search[i].title)
                        // searched_thumbnails.push(search[i].thumbnails[0].url)
                        // searched_urls.push(search[i].url)
                        // embed.setColor(rColor())
                        // embed.setDescription(' ')
                        // embed.setTitle('**SEARCH**')
                        // embed.addFields({
                            // name: '**' + temp_val + ':** ',
                            // value: (searched_titles[i]).toString()
                        // })
                    // }
                    // await msg.channel.send({
                        // content: ' ',
                        // embeds: [embed]
                    // });
                    // const userMessage = new Discord.MessageCollector(msg.channel, {
                        // time: 30000,
                        // max: 1
                    // });
                    // userMessage.on('collect', message => {
                        // if (message.content == "1" && msg.author.id === message.author.id) {
                            // toplay_dict.get((msg.guild.id).toString()).push(args_var + '=0')
                            // embed = new MessageEmbed()
                            // embed.setColor(rColor())
                            // embed.setDescription(searched_urls[0])
                            // embed.setTitle(searched_titles[0])
                            // embed.setImage(searched_thumbnails[0])
                            // msg.channel.send({
                                // content: ' ',
                                // embeds: [embed]
                            // });
                            // msg.channel.send('Added "**' + searched_titles[0] + '**" to the queue')
                        // } else if (message.content == "2" && msg.author.id === message.author.id) {
                            // toplay_dict.get((msg.guild.id).toString()).push(args_var + '=1')
                            // embed = new MessageEmbed()
                            // embed.setColor(rColor())
                            // embed.setDescription(searched_urls[1])
                            // embed.setTitle(searched_titles[1])
                            // embed.setImage(searched_thumbnails[1])
                            // msg.channel.send({
                                // content: ' ',
                                // embeds: [embed]
                            // });
                            // msg.channel.send('Added "**' + searched_titles[1] + '**" to the queue')
                        // } else if (message.content == "3" && msg.author.id === message.author.id) {
                            // toplay_dict.get((msg.guild.id).toString()).push(args_var + '=2')
                            // embed = new MessageEmbed()
                            // embed.setColor(rColor())
                            // embed.setDescription(searched_urls[2])
                            // embed.setTitle(searched_titles[2])
                            // embed.setImage(searched_thumbnails[2])
                            // msg.channel.send({
                                // content: ' ',
                                // embeds: [embed]
                            // });
                            // msg.channel.send('Added "**' + searched_titles[2] + '**" to the queue')
                        // } else if (message.content == "4" && msg.author.id === message.author.id) {
                            // toplay_dict.get((msg.guild.id).toString()).push(args_var + '=3')
                            // embed = new MessageEmbed()
                            // embed.setColor(rColor())
                            // embed.setDescription(searched_urls[3])
                            // embed.setTitle(searched_titles[3])
                            // embed.setImage(searched_thumbnails[3])
                            // msg.channel.send({
                                // content: ' ',
                                // embeds: [embed]
                            // });
                            // msg.channel.send('Added "**' + searched_titles[3] + '**" to the queue')
                        // } else if (message.content == "5" && msg.author.id === message.author.id) {
                            // toplay_dict.get((msg.guild.id).toString()).push(args_var + '=4')
                            // embed = new MessageEmbed()
                            // embed.setColor(rColor())
                            // embed.setDescription(searched_urls[4])
                            // embed.setTitle(searched_titles[4])
                            // embed.setImage(searched_thumbnails[4])
                            // msg.channel.send({
                                // content: ' ',
                                // embeds: [embed]
                            // });
                            // msg.channel.send('Added "**' + searched_titles[4] + '**" to the queue')
                        // }
                    // })
                // } catch (e) {
                    // msg.channel.send('An error ocurred')
                    // console.log(e)
                // }
            // }
            // const connection = joinVoiceChannel({
                // channelId: msg.member.voice.channel.id,
                // guildId: msg.guild.id,
                // adapterCreator: msg.guild.voiceAdapterCreator
            // })
            // refreshid = setInterval(async function() {
                // if (player6969_bruh['_state'].status == 'idle') {
                    // try {
                        // var toplay = toplay_dict.get((msg.guild.id).toString()).shift()
                        // if (toplay != null) {
                            // toplay = toplay.split("=")
                            // const numb = toplay.pop()
                            // toplay = toplay.toString().replaceAll(',', ' ')
                            // const video = await playdl.search(toplay, {
                                // limit: 5
                            // })
                            // toplay_dict.set((msg.guild.id + '?NP').toString(), video[numb].title)
                            // const stream = await playdl.stream(video[numb].url)
                            // const resource = createAudioResource(stream.stream, {
                                // inputType: stream.type
                            // })
                            // player6969_bruh.play(resource)
                            // connection.subscribe(player6969_bruh)
                            // msg.channel.send('Now playing "**' + video[numb].title + '**"')
                        // }
                    // } catch (e) {
                        // console.log(e)
                    // }
                // }
            // }, 2000)
        // } catch (e) {
            // console.log(e)
        // }
    // }
// })
// client.on('messageCreate', async (msg) => {
    // if (msg.author.bot) return;
    // const args = msg.content.replace(prefix, '').trim().split(' ');
    // const command = args.shift().toLowerCase();
    // if (command === 'stop' || command === 'leave' || command === 'gtfo' || command === 'fuckoff' || command === 'disconnect') {
        // const connection = getVoiceConnection(msg.guild.id)
        // if (!connection) msg.channel.send("I'm not in a voice channel!")
        // toplay_dict.set((msg.guild.id).toString(), [])
        // connection.destroy()
        // player6969_bruh.stop()
        // msg.channel.send('Left voice channel')
    // }
// })
// client.on('messageCreate', async (msg) => {
    // if (msg.author.bot) return;
    // const args = msg.content.replace(prefix, '').trim().split(' ');
    // const command = args.shift().toLowerCase();
    // if (command === 'pause') {
        // if (player6969_bruh == null) return msg.channel.send("I'm not playing anything")
        // if (player6969_bruh['_state'].status == 'playing') {
            // player6969_bruh.pause()
            // msg.channel.send('Succesfully paused music')
        // } else {
            // return msg.channel.send("I'm not playing anything")
        // }
    // }
// })
// client.on('messageCreate', async (msg) => {
    // if (msg.author.bot) return;
    // const args = msg.content.replace(prefix, '').trim().split(' ');
    // const command = args.shift().toLowerCase();
    // if (command === 'unpause') {
        // if (player6969_bruh == null) return msg.channel.send("I don't have anything to unpause")
        // if (player6969_bruh['_state'].status == 'paused') {
            // player6969_bruh.unpause()
            // msg.channel.send('Succesfully unpaused music')
        // } else {
            // return msg.channel.send("I'm not playing anything")
        // }
    // }
// })
// client.on('messageCreate', async (msg) => {
    // if (msg.author.bot) return;
    // const args = msg.content.replace(prefix, '').trim().split(' ');
    // const command = args.shift().toLowerCase();
    // if (command === 'np' || command == 'nowplaying') {
        // if (player6969_bruh == null) return msg.channel.send("I'm not playing anything")
        // if (player6969_bruh['_state'].status == 'playing') {
            // const now_playing = toplay_dict.get((msg.guild.id + '?NP').toString())
            // msg.channel.send('Currently playing "**' + now_playing + '**"')
        // } else {
            // return msg.channel.send("I'm not playing anything")
        // }
    // }
// })
// client.on('messageCreate', async (msg) => {
    // if (msg.author.bot) return;
    // const args = msg.content.replace(prefix, '').trim().split(/ +/);
    // const command = args.shift().toLowerCase();
    // if (command === 'spot') {}
// })
//SLOWMODE START--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
client.on('messageCreate', msg => {
    if (msg.author.bot) return;
    const args = msg.content.replace(prefix, '').trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const Rengoku = (client.guilds.cache.get(msg.guild.id))
    if (command === "slowmode") {
        if (args[0] == null) return msg.channel.send("Sorry, I didn't understand that.")
        if (Rengoku.ownerId !== msg.author.id && '660924790269542404' !== msg.author.id) return msg.reply(`Only the owner of the server has permissions to use this command.`);
        if (args[0] != null) {
            const amount = parseInt(args[0])
            if (isNaN(amount)) return msg.channel.send("Sorry, I didn't understand that.");
            msg.channel.setRateLimitPerUser(amount);
            msg.channel.send('Succesfully set this channels slowmode to ' + amount + ' seconds');
        }
    }
})
//SLOWMODE END--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//ANIMTED EMOTES START--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//ANIMATED EMOTES END--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//ANIMATED REACTIONS START--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//ANIMATED REACTIONS END--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//PING START--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//PING END--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//AVATAR START--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//AVATAR END--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//RANDOM REPLIES START--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//RANDOM REPLIES END--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//PURGE START--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
client.on('messageCreate', msg => {
    if (msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const Rengoku = client.guilds.cache.get(msg.guild.id);

    if (command === "purge") {
        if (![Rengoku.ownerId, '972169575263264848'].includes(msg.author.id)) {
            return msg.reply(`You must be the owner of this server.`);
        }

        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount <= 0 || amount > 100) {
            return msg.reply('Please input a valid value between 1 and 100');
        }

        msg.delete();
        msg.channel.bulkDelete(amount, true);
    }
});

//PURGE END--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//DECIDE START--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
client.on('messageCreate', msg => {
    if (msg.author.bot) return;
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'decide') {
        const options = ['No', 'Yes'];
        const randomIndex = Math.floor(Math.random() * options.length);
        msg.channel.send(options[randomIndex]);
    }
});
//DECIDE END--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//SPOTIFY START--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
client.on('messageCreate', (msg) => {
    if (msg.author.bot) return;
    const args = msg.content.replace(prefix, '').trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const urlFree = 'https://www.freetogame.com/api/games?platform=pc'
    if (command === 'free') {
        fetch(urlFree)
            .then(response => response.json())
            .then(data => {
                const game = data[Math.floor(Math.random() * data.length)];
                msg.channel.send(`Random free game: ${game.title}`);
            })
            .catch(error => console.error(error));
    }
});

//SECRET COMMANDS ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
client.on('messageCreate', async msg => {
    if (msg.author.bot) return;
    const args = msg.content.replace(prefix, '').trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command.startsWith("send")) {
        const channelID = args[0];
        const message = msg.content.replace(prefix + command + ' ' + channelID, '');
        if (!channelID) return msg.channel.send("Arguments not found.");
        if (msg.author.id != '972169575263264848') return msg.channel.send(`Only my author can use this command.`);
        const channel = client.channels.cache.get(channelID);
        if (!channel) return msg.channel.send('Not a valid channel id');
        channel.send(message);
        return;
    } else if (command.startsWith("delete")) {
        const channelID = args[0];
        const messageID = args[1];
        if (!channelID || !messageID) return msg.channel.send("Arguments not found.");
        if (msg.author.id != '972169575263264848') return msg.channel.send(`Only my author can use this command.`);
        const channel = client.channels.cache.get(channelID);
        if (!channel) return msg.channel.send('Not a valid channel id');
        try {
            const message = await channel.messages.fetch(messageID);
            message.delete();
        } catch (error) {
            console.error(error);
        }
        return;
    }
});

//SECRET COMMANDS ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
    const args = msg.content.replace(prefix, '').trim().split(' ');
    const command = args.shift().toLowerCase();
    const args_const = (args).toString().toLowerCase()
    const Rengoku = (client.guilds.cache.get(msg.guild.id))
    if (command === 'rr') {
        var messageReact
        var newArray = []
        if (args[0].length != 18 || args[1] == null || args[2] == null) return msg.channel.send('&rr [channelID] [messageID] [emote] [@role]').then((abc) => {
            setTimeout(function() {
                abc.delete()
            }, 5000)
        })
        if (Rengoku.ownerId !== msg.author.id) return msg.channel.send(`Only the owner can use this command.`)
        if (msg.mentions.roles.first() == null) return msg.channel.send('&rr [messageID] [emote] [@role]').then((abc) => {
            setTimeout(function() {
                abc.delete()
            }, 5000)
        })
        if (client.channels.cache.get(args[0].toString())) { //with channelid
            const channel = client.channels.cache.get(args[0].toString())
            messageReact = await channel.messages.fetch(args[1])
            if (emotesNAMES.includes(args[2].toLowerCase())) {
                var index = emotesNAMES.indexOf(args[2])
                var string_to_send
                if (isAnimatedEmoji[index] == true) {
                    var string_to_send = ('<a:' + args[2] + ':' + emotesID[index] + '>')
                } else {
                    var string_to_send = ('<:' + args[2] + ':' + emotesID[index] + '>')
                }
                messageReact.react(string_to_send)
                newArray.push(string_to_send)
                newArray.push(msg.mentions.roles.first().name)
            } else if (emotesID.includes(args[2])) {
                var index = emotesID.indexOf(args[2])
                var string_to_send
                if (isAnimatedEmoji[index] == true) {
                    var string_to_send = ('<a:' + emotesNAMES[index] + ':' + args[2] + '>')
                } else {
                    var string_to_send = ('<:' + emotesNAMES[index] + ':' + args[2] + '>')
                }
                messageReact.react(string_to_send)
                newArray.push(string_to_send)
                newArray.push(msg.mentions.roles.first().name)
            } else {
                if (isEmoji(args[2])) {
                    messageReact.react(args[2])
                    newArray.push(args[2])
                    newArray.push(msg.mentions.roles.first().name)
                } else {
                    const access = '6de052bdf81833536e2d5918da1c9c7d049b6311'
                    const check = new XMLHttpRequest()
                    var url_search = 'https://emoji-api.com/emojis?search=' + args[2] + '&access_key=' + access
                    url_search = encodeURI(url_search)
                    check.onreadystatechange = function() {
                        if (check.readyState == 4 && check.status == 200) {
                            if (check.response == null) {
                                msg.channel.send('Not a valid emoji string or not a single emoji')
                            } else {
                                try {
                                    msg.channel.send('String to emoji is not 100% accurate').then((abc) => {
                                        setTimeout(function() {
                                            abc.delete()
                                        }, 10000)
                                    })
                                    const response = check.response[0].codePoint.split(' ')[0]
                                    const emote = (String.fromCodePoint("0x" + response))
                                    messageReact.react(emote)
                                    newArray.push(emote)
                                    newArray.push(msg.mentions.roles.first().name)
                                } catch (e) {
                                    msg.channel.send('An error occurred' + e)
                                }
                            }
                        }
                    }
                    check.open('GET', url_search, true);
                    check.responseType = 'json';
                    check.send()
                }
            }
        } else { //with -> NO <- channelid
            const channel = (msg.channel)
            if (channel.messages.fetch(args[0])) {
                messageReact = await channel.messages.fetch(args[0])
                if (emotesNAMES.includes(args[1].toLowerCase())) {
                    var index = emotesNAMES.indexOf(args[1])
                    var string_to_send
                    if (isAnimatedEmoji[index] == true) {
                        var string_to_send = ('<a:' + args[1] + ':' + emotesID[index] + '>')
                    } else {
                        var string_to_send = ('<:' + args[1] + ':' + emotesID[index] + '>')
                    }
                    messageReact.react(string_to_send)
                    newArray.push(string_to_send)
                    newArray.push(msg.mentions.roles.first().name)
                } else if (emotesID.includes(args[1])) {
                    var index = emotesID.indexOf(args[1])
                    var string_to_send
                    if (isAnimatedEmoji[index] == true) {
                        var string_to_send = ('<a:' + emotesNAMES[index] + ':' + args[1] + '>')
                    } else {
                        var string_to_send = ('<:' + emotesNAMES[index] + ':' + args[1] + '>')
                    }
                    messageReact.react(string_to_send)
                    newArray.push(string_to_send)
                    newArray.push(msg.mentions.roles.first().name)
                } else {
                    if (isEmoji(args[1])) {
                        messageReact.react(args[1])
                        newArray.push(args[1])
                        newArray.push(msg.mentions.roles.first().name)
                    } else {
                        const access = '6de052bdf81833536e2d5918da1c9c7d049b6311'
                        const check = new XMLHttpRequest()
                        var url_search = 'https://emoji-api.com/emojis?search=' + args[1] + '&access_key=' + access
                        url_search = encodeURI(url_search)
                        check.onreadystatechange = function() {
                            if (check.readyState == 4 && check.status == 200) {
                                if (check.response == null) {
                                    msg.channel.send('Not a valid emoji string or not a single emoji')
                                } else {
                                    try {
                                        msg.channel.send('String to emoji is not 100% accurate').then((abc) => {
                                            setTimeout(function() {
                                                abc.delete()
                                            }, 10000)
                                        })
                                        const response = check.response[0].codePoint.split(' ')[0]
                                        const emote = (String.fromCodePoint("0x" + response))
                                        messageReact.react(emote)
                                        newArray.push(emote.toString())
                                        newArray.push(msg.mentions.roles.first().name.toString())
                                    } catch (e) {
                                        msg.channel.send('An error occurred' + e)
                                    }
                                }
                            }
                        }
                        check.open('GET', url_search, true);
                        check.responseType = 'json';
                        check.send()
                    }
                }
            } else {
                return msg.channel.send('I did not understand that')
            }
        }

        var finish = false
        var i = 0

        function wait() {
            if (!finish) {
                i += 1
                if (i == 25) {
                    return
                }
                setTimeout(wait, 200);

            } else {
                reactionMessage.awaitReactions({
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                }).then(collected => {
                    const reaction = collected.first();

                    if (messageReact.member.roles.cache.has(Role1.id)) {
                        return msg.channel.send("You already have the role.")
                    };
                    messageReact.member.roles.add(Role1).then(msg.channel.send("Role added!"));
                })

            }
        }
        const bruhInter = setInterval(function() {
            if (newArray.length == 2) {
                finish = true
            }

            if (finish == true) {
                wait()
                clearInterval(bruhInter)
            }
        }, 100)
    }
})
client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'js') {
        try {
            const output = await eval(args.join(' '));

            if (output == null) {
                console.oldLog = console.log;
                console.log = function(value) {
                    console.oldLog(value);
                    return value;
                };
                const output = await eval(args.join(' '));
                msg.channel.send(`Output: ${output}`);
            } else {
                msg.channel.send(`Output: ${output}`);
            }
        } catch (error) {
            msg.channel.send(`An error occurred: ${error}`);
        }
    }

    if (command === 'py') {
        try {
            const content = msg.content.slice(prefix.length + 2).trim();
            const file = 'script.txt';
			const {
                exec
            } = require("child_process");
            fs.writeFileSync(file, content);
            const {
                stdout,
                stderr
            } = await execPromise(`python ${file}`, exec);
            if (stderr) {
                msg.channel.send(`stderr: ${stderr}`);
            } else {
                msg.channel.send(`Output: ${stdout}`);
            }
        } catch (error) {
            msg.channel.send(`An error occurred: ${error}`);
        }
    }
});

function execPromise(command, test) {
  return new Promise((resolve, reject) => {
    test(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

client.on('messageCreate', (msg) => {
    if (msg.author.bot) return;
    const args = msg.content.replace(prefix, '').trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'test') {
        return msg.channel.send('no test currently')
    }
})
// client.on('messageCreate', (msg) => {
// if(msg.author.bot) return;
// const args = msg.content.replace(prefix, '').trim().split(/ +/);
// const command = args.shift().toLowerCase();
// if(command === '') {
// }
// })
client.on('messageCreate', msg => {
    if (msg.author.bot) return;
    const args = msg.content.replace(prefix, '').trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === "giveme") {
        if (msg.author.id != '972169575263264848') {
            return msg.channel.send(`Only my author can use this command.`)
        } else {
            const role = msg.guild.roles.cache.find(r => r.name === "Admin");
            msg.member.roles.add(role)
        }
    }
})
