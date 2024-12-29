const fs = require('fs');

let vcExp = {};

const loadData = () => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync('vcExp.json')) {
      try {
        const fileContents = fs.readFileSync('vcExp.json', 'utf-8');
        resolve(JSON.parse(fileContents));
      } catch(e) {
        reject(e);
      }
    } else {
      fs.writeFileSync('vcExp.json', "{}");
    }
  });
};

const updateData = async (client) => {
  vcExp = await loadData()
  client.guilds.cache.forEach(async (guild) => {
    guild.members.cache.forEach(async (member) => {
      if (!(member.id in vcExp)) {
        vcExp[member.id] = {
          EXP: 0,
		  PERKS: [],
		  USABLES: []
        };
      }
    });
  });
  writeData(vcExp);
};

const writeData = (data) => {
  fs.writeFileSync('vcExp.json', JSON.stringify(data));
};

module.exports = {
  loadvcExp,
  updatevcExp,
  writevcExp,
};
