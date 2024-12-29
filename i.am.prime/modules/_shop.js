const fs = require('fs');

class csgoCase {
  constructor(moneyCost, gemsCost, imageUrl, items, rarity, special, probabilities) {
    this.moneyCost = moneyCost;
    this.gemsCost = gemsCost;
    this.imageUrl = imageUrl;
    this.items = items;
	this.rarity = rarity;
    this.special = special;
    this.probabilities = probabilities;
  }
}

let data = {}

const loadShop = () => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync('shop.json')) {
      try {
        const fileContents = fs.readFileSync('shop.json', 'utf-8');
        resolve(JSON.parse(fileContents));
      } catch(e) {
        reject(e);
      }
    } else {
      fs.writeFileSync('shop.json', "{}");
    }
  });
};


const insertCase = async () => {
  data = await loadShop();
  let caseName = 'Snakebite Case';
  if (data[caseName]) {
    console.log(`Case '${caseName}' already exists in the shop.`);
    return;
  }
  let toAdd = new csgoCase(
    5,
    0.5,
	'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU4naLOJzgUuYqyzIaIxa6jMOLXxGkHvcMjibmU99Sg3Qaw-hA_ZWrzLISLMlhpgJJUhGE/360fx360f',
    ["Special", "USP-S | The Traitor", "M4A4 | In Living Color", "Galil AR | Chromatic Aberration", "MP9 | Food Chain", "XM1014 | XOXO", "AK-47 | Slate", "Desert Eagle | Trigger Discipline", "P250 | Cyber Shell", "Negev | dev_texture", "MAC-10 | Button Masher", "Glock-18 | Clear Polymer", "CZ75-Auto | Circaetus", "SG 553 | Heavy Metal", "R8 Revolver | Junk Yard", "DM249 | O.S.I.P.R.", "Nova | Windblown", "UMP-45 | Oscillator"],
	["#FFD700","#EB4B4B","#EB4B4B","#D32EE6","#D32EE6","#D32EE6","#8847FF","#8847FF","#8847FF","#8847FF","#8847FF","#4B69FF","#4B69FF","#4B69FF","#4B69FF","#4B69FF","#4B69FF","#4B69FF"],
	["★ Broken Fang Gloves | Yellow-banded","★ Broken Fang Gloves | Needle Point","★ Broken Fang Gloves | Jade","★ Broken Fang Gloves | Unhinged","★ Driver Gloves | Snow Leopard","★ Driver Gloves | Black Tie","★ Driver Gloves | Rezan the Red","★ Driver Gloves | Queen Jaguar","★ Hand Wraps | CAUTION!","★ Hand Wraps | Constrictor","★ Hand Wraps | Desert Shamagh","★ Hand Wraps | Giraffe","★ Moto Gloves | Smoke Out","★ Moto Gloves | Blood Pressure","★ Moto Gloves | Finish Line","★ Moto Gloves | 3rd Commando Company","★ Specialist Gloves | Field Agent","★ Specialist Gloves | Tiger Strike","★ Specialist Gloves | Lt. Commander","★ Specialist Gloves | Marble Fade","★ Sport Gloves | Slingshot","★ Sport Gloves | Scarlet Shamagh","★ Sport Gloves | Nocts","★ Sport Gloves | Big Game"],
    [0.23576,0.329695,0.329695,1.06564333333,1.06564333333,1.06564333333,3.19693,3.19693,3.19693,3.19693,3.19693,11.41761,11.41761,11.41761,11.41761,11.41761,11.41761,11.41761],
  );
  data[caseName] = toAdd;
  writeShop(data);
  console.log(`Case '${caseName}' added to the shop.`);
};

const writeShop = (shop) => {
  fs.writeFileSync('shop.json', JSON.stringify(shop));
};

module.exports = {
  loadShop,
  insertCase,
  writeShop,
};
