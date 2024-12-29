const fs = require('fs');

let data = {};

const loadData = () => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync('idle.json')) {
      try {
        const fileContents = fs.readFileSync('idle.json', 'utf-8');
			resolve(JSON.parse(fileContents));
      } catch(e) {
        reject(e);
      }
    } else {
      fs.writeFileSync('idle.json', "{}");
    }
  });
};

const updateData = async (client, message) => {
  data = await loadData()
  const member = message.member;
  if (!(member.id in data)) {
    data[member.id] = {
	  TIME_SINCE_COLLECT: Date.now(),
TIME_SINCE_ATK: 0,
TIME_FOR_REST_ATK: 0,
	  ATTACK_UPGRADES: 0,
TIME_SINCE_DEF: 0,
TIME_FOR_REST_DEF: 0,
	  DEFENSE_UPGRADES: 0,
TIME_SINCE_MANA: 0,
TIME_FOR_REST_MANA: 0,
	  MANA_UPGRADES: 0,
TIME_SINCE_HEALTH: 0,
TIME_FOR_REST_HEALTH: 0,
	  HEALTH_UPGRADES: 0,
      MONEY_UPGRADES: 0,
      TIMES_COLLECTED: 0,
	  REBIRTH: 0,
	  ATTACK: 0,
	  DEFENSE: 0,
	  MANA: 0,
	  HEALTH: 100,
      MONEY: 0,
    };
  }
  writeData(data);
};
const writeData = (data) => {
  fs.writeFileSync('idle.json', JSON.stringify(data));
};

module.exports = {
  loadData,
  updateData,
  writeData,
};
