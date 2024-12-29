const fs = require("fs");
const welcomeConfig = require("../welcomeConfig.json");
const Discord = require("discord.js");
//const https = require("https")

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("You don't have permission to use this command.");

  const guildId = message.guild.id;
  let bool = false;
  let channelId = message.channel.id;
	let image = null
  if (welcomeConfig[guildId]) {
    bool = welcomeConfig[guildId].enabled;
    channelId = welcomeConfig[guildId].id;
	image = welcomeConfig[guildId].url;
  }

  const zero = args[0];
  
  if (!zero) return message.reply("You need to specify what to do: [set/image/toggle]");
  
  if (zero.toLowerCase() == "set") {
    welcomeConfig[guildId] = { id: message.channel.id, enabled: true, url: image };
	message.reply(`Welcome message is **${ welcomeConfig[guildId].enabled ? "enabled" : "disabled"}** for the current channel: **${message.channel.name}**.`);
  } else if (zero.toLowerCase() == "image") {
    if (message.attachments.size > 0) {
      const attachment = message.attachments.first();

      //const guildId = message.guild.id;

      //const file = await downloadFile(attachment.url, guildId);

      //fs.renameSync(file, `./images/${guildId}`);
	  welcomeConfig[guildId] = { id: channelId, enabled: bool, url: attachment.url };
      message.reply(`File saved`);
    } else {
		return message.reply(`You didn't upload a valid file.`);
	}
  } else if (zero.toLowerCase() == "toggle") {
    welcomeConfig[guildId] = { id: channelId, enabled: !bool, url: image };
	const temp = client.guilds.cache.get(guildId).channels.cache.get(channelId);
	message.reply(`Inter messaging is now **${ welcomeConfig[guildId].enabled ? "enabled" : "disabled"}** for the channel: **${temp.name}**.`);
  }

  fs.writeFile("./welcomeConfig.json", JSON.stringify(welcomeConfig, null, 2), (err) => {
    if (err) return console.log(err);
  });
};

// function downloadFile(url, guildId) {
  // return new Promise((resolve, reject) => {
    // const file = fs.createWriteStream(`./images/${guildId}`);

    // const request = https.get(url, response => {
      // response.pipe(file);

      // file.on('finish', () => {
        // file.close();
        // resolve(`./images/${guildId}`);
      // });
    // });

    // request.on('error', err => {
      // fs.unlinkSync(`./images/${guildId}`);
      // reject(err);
    // });
  // });
// }

module.exports.help = {
  name: "Set the current as the channel for inter server messaging",
  description: "Sets the current channel as the channel for inter server messaging. If only the command is sent, without any options, it will toggle. If a new prefix is specified, it will be used as the new value (true/false).",
  category: "Settings",
  command: "welcome"
};
