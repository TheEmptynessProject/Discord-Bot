const fs = require('fs');

const emotesID = [];
const emotesNAMES = [];
const isAnimatedEmoji = [];

const updateEmotes = async (client) => {

  emotesID.splice(0, emotesID.length);
  emotesNAMES.splice(0, emotesNAMES.length);
  isAnimatedEmoji.splice(0, isAnimatedEmoji.length);

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

  const data = {
    emotesID,
    emotesNAMES,
    isAnimatedEmoji,
  };

  fs.writeFileSync('emotes.json', JSON.stringify(data));
};

module.exports = {
  emotesID,
  emotesNAMES,
  isAnimatedEmoji,
  updateEmotes,
};
