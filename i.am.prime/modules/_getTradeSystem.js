const fs = require('fs');

let data = {}
let count

const loadTrades = () => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync('tradings.json')) {
      try {
        const fileContents = fs.readFileSync('tradings.json', 'utf-8');
        resolve(JSON.parse(fileContents));
		count = Object.keys(data).length || 0;
      } catch(e) {
        reject(e);
      }
    } else {
      fs.writeFileSync('tradings.json', "{}");
    }
  });
};


const insertTrade = async (thing) => {
  data = await loadTrades();
  data[count] = thing;
  count++;
  writeTrade(data);
};


const writeTrade = (data) => {
  fs.writeFileSync('tradings.json', JSON.stringify(data));
};

module.exports = {
  loadTrades,
  insertTrade,
  writeTrade,
};
