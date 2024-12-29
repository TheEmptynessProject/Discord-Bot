const fs = require('fs');

class editMessage {
  constructor(oldMessage, newMessage) {
    this.oldMessage = oldMessage;
    this.newMessage = newMessage;
  }
}

let cache = {};

const loadCache = () => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync('deleteCache.json')) {
      try {
        const fileContents = fs.readFileSync('deleteCache.json', 'utf-8');
        resolve(JSON.parse(fileContents));
      } catch(e) {
        reject(e);
      }
    } else {
      fs.writeFileSync('deleteCache.json', "{}");
    }
  });
};

const setCache = async (message, edited, newer) => {
  cache = await loadCache();
  if (edited) {
	  const toAdd = new editMessage(message,newer)
	  cache.edited = toAdd;
  } else {
	  cache.deleted = message;
  }
  writeCache(cache);
};

const writeCache = (data) => {
  fs.writeFileSync('deleteCache.json', JSON.stringify(data));
};

module.exports = {
	loadCache,
  setCache,
};
