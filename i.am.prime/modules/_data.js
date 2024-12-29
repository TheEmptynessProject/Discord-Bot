const fs = require('fs');

let data = {};

const loadData = () => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync('data.json')) {
      try {
        const fileContents = fs.readFileSync('data.json', 'utf-8');
        resolve(JSON.parse(fileContents));
      } catch(e) {
        reject(e);
      }
    } else {
      fs.writeFileSync('data.json', "{}");
    }
  });
};

const updateData = async (client) => {
  data = await loadData()
  client.guilds.cache.forEach(async (guild) => {
    guild.members.cache.forEach(async (member) => {
      if (!(member.id in data)) {
        data[member.id] = {
          INV: [],
          MONEY: 0,
          EXP: 0,
          GEMS: 0,
          GETMONEY_TIME: 0,
          GETGEMS_TIME: 0,
          FREECASE_TIME: 0,
        };
      }
    });
  });
  writeData(data);
};

const writeData = (data) => {
  fs.writeFileSync('data.json', JSON.stringify(data));
};

module.exports = {
  loadData,
  updateData,
  writeData,
};
