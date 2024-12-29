const fs = require('fs');

class csgoItemCache {
  constructor(price, imageUrl) {
    this.price = price;
    this.imageUrl = imageUrl;
  }
}

let cache = {};

const loadCache = () => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync('skinPricesCache.json')) {
      try {
        const fileContents = fs.readFileSync('skinPricesCache.json', 'utf-8');
        resolve(JSON.parse(fileContents));
      } catch(e) {
        reject(e);
      }
    } else {
      fs.writeFileSync('skinPricesCache.json', "{}");
    }
  });
};


const insertCache = async (name,price,imageUrl) => {
  cache = await loadCache();
  if (cache[name]) {
	  return console.log(`Item ${name} already is cached.`)
  }
  let toAdd = new csgoItemCache(price,imageUrl)
  cache[name] = toAdd;
  writeCache(cache);
  console.log(`Item '${name}' added to cache.`);
};

const writeCache = (data) => {
  fs.writeFileSync('skinPricesCache.json', JSON.stringify(data));
};

module.exports = {
  loadCache,
  insertCache,
  writeCache,
};
