console.log('Starting up...');
const Discord = require('discord.js');
const botConfig = require('./botconfig.json');
const fs = require('fs');

const active = new Map();
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Discord.Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
    ],
});

const {
    updateEmotes
} = require('./modules/_emotes.js');
const {
    updateData
} = require('./modules/_data.js');
const {
    insertCase
} = require('./modules/_shop.js');
const {
    sendMessage
} = require('./modules/_interMessaging.js');
const {
    setCache
} = require("./modules/_notSkinCache.js")
const welcomeConfig = require("./welcomeConfig.json");
fs.readdir('./commands/', (err, files) => {
    if (err) return console.error(err);
    const commandFiles = files.filter((file) => file.endsWith('.js'));
    client.commands = new Discord.Collection();
    const promises = commandFiles.map(async (file) => {
        const command = require(`./commands/${file}`);
        console.log(`> ${file} loaded in`);
        if (command.help.command.includes(";")) {
            const commandPrefixes = command.help.command.split(";");
            for (x in commandPrefixes) {
                client.commands.set(commandPrefixes[x], command);
            }
        } else {
            client.commands.set(command.help.command, command);
        }
    });
    Promise.all(promises).catch(console.error);
});


client.on('ready', async () => {
    console.log(`${client.user.tag} is now alive`);
    updateEmotes(client);
    updateData(client);
    //insertCase()
});

client.on('guildCreate', async (guild) => {
    console.log(`Joined guild: ${guild.name} (${guild.id})`);
    updateEmotes(client);
});

client.on('emojiCreate', async (emoji) => {
    console.log(`Emoji added: ${emoji.guild.name} + ${emoji.name}`);
    updateEmotes(client);
});

client.on('emojiDelete', async (emoji) => {
    console.log(`Emoji deleted: ${emoji.guild.name} + ${emoji.name}`);
    updateEmotes(client);
});

client.on('emojiUpdate', async (oldEmoji, newEmoji) => {
    if (oldEmoji.name !== newEmoji.name) {
        console.log(`Emoji "${oldEmoji.name}" was renamed to "${newEmoji.name}" in guild "${newEmoji.guild.name}"`);
        updateEmotes(client);
    }
});

client.on("guildDelete", async guild => {
    console.log(`Left guild: ${guild.name} (${guild.id})`);
    updateEmotes(client);
});

client.on('guildMemberAdd', async (member) => {
    console.log(`Member joined: ${member.guild.name} + ${member.user.tag}`);
	if (welcomeConfig[member.guild.id]?.enable) {
		const welcomeEmbed = new Discord.MessageEmbed().setColor("#FFFFFF").setTitle(`Welcome ${member.user.tag}`);
		if (welcomeConfig[member.guild.id].url) {
			welcomeEmbed.setImage(welcomeConfig[member.guild.id].url.toString())
			const channel = member.guild.cache.filter(chan => chan.id === welcomeConfig[member.guild.id])
			channel.send({ embeds: [welcomeEmbed]})
		}
	}
    updateData(client);
});

client.on('guildMemberRemove', async (member) => {
    console.log(`Member left: ${member.guild.name} - ${member.user.tag}`);
	if (welcomeConfig[member.guild.id]?.enable) {
		const welcomeEmbed = new Discord.MessageEmbed().setColor("#FFFFFF").setTitle(`Goodbye ${member.user.tag}`);
		if (welcomeConfig[member.guild.id].url) {
			welcomeEmbed.setImage(welcomeConfig[member.guild.id].url.toString())
			const channel = member.guild.cache.filter(chan => chan.id === welcomeConfig[member.guild.id])
			channel.send({ embeds: [welcomeEmbed]})
		}
	}
    updateData(client);
});
client.on('messageDelete', (message) => {
    setCache(message, false, null)
});
client.on('messageUpdate', (oldMessage, newMessage) => {
    setCache(oldMessage, true, newMessage)
});
client.on("messageCreate", async message => {
    const {
        author,
        content,
        guild,
        channel
    } = message;

    if (author.bot) return;
    if (channel.type === "dm") return;

    const guildPrefix = botConfig.guildPrefixes[guild.id] || botConfig.prefix;

    var [command, ...arguments] = content.slice(guildPrefix.length).split(" ");
    var commands = client.commands.get(command);

    var options = {
        active
    };

    if (commands) return commands.run(client, message, arguments, options);

    if (botConfig.guildInter[guild.id]) {
        if (message.channel.id === botConfig.guildInter[guild.id]?.id) {
            if (!content.startsWith(guildPrefix)) {
                sendMessage(client, message, guildPrefix);
            }
        }
    }

});

client.login(botConfig.token);