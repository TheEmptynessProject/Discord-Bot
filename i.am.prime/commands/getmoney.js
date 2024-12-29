const Discord = require("discord.js");
const { loadData, writeData } = require("../modules/_data.js");

// Array of funny phrases
const funnyPhrases = [
    "You wanted to steal a bank, but found 20 money on the way there, and went back home.",
    "You stole a homeless person while he was sleeping, you got 20 money. Hope you're happy now.",
    "You were chasing a leprechaun, and it dropped 20 money while running away.",
    "You found a lost sock. Cha-ching! It had 20 money inside!",
    "You sold an ordinary rock as modern art and earned 20 money. Genius!",
    "You found a genie lamp and made a wish for unlimited money. Instead he gave you 20!",
    "You discovered a secret cheat code in the real world that granted you 20 money.",
    "You dropped your phone in the sewers and lost it. But hey, you found 20 money while looking for it.",

    "You went fishing and caught a talking fish. It gave you 20 money as a bribe to release it.",
    "You accidentally clicked on a suspicious pop-up ad and received 20 money as a computer virus compensation.",
    "You accidentally dropped your phone in a puddle, but when you picked it up, it disintegrated turned into 20 money.",
    "You helped an elderly lady cross the street, and as a token of gratitude, she gave you 20 money. She had just robbed a jewelry shop.",
    "You found a lost dog with a note attached to its collar. The note read, 'Reward: 20 money for returning my dog safely.'. You just took the money with no remorse.",
    "You went to a wishing well with your granpa and made a wish for 20 money. Moments later, your grandpa died, and he had 20 money in their pocket. At least your wish was granted.",
    "You found a magical wand in the attic and accidentally turned your pet hamster into 20 money. Oops!",

"You embarked on a quest to find a legendary treasure chest. After a long journey, you found it, but it was empty. However, a passing bird dropped 20 money into your hand as a consolation prize.",
    "You joined a secret society of magicians to learn the art of illusion. During your training, you accidentally turned one of the teachers into 20 money.",
    "You decided to become a superhero to fight crime. While patrolling the city, you stumbled upon a crime scene where a villain had dropped 20 money while escaping. Nobody noticed.",
    "You entered a cooking competition with the hopes of winning the grand prize. No one else joined, so you got the grand prize of 20 money.",
    "You volunteered to be a test subject for a new teleportation device. The experiment went awry, and you ended up in a parallel universe with lots of rubber ducks. You found 20 rubber ducks and brought them back, just to sell them for 20 money.",
    "You discovered a secret portal to a dimension filled with adorable kittens. While playing with the kittens, one of them gave you a playful boop and magically transformed into 20 money.",
    "You decided to become a professional wrestler to fulfill your childhood dream. In your first match, your opponent accidentally dropped 20 money from their pocket, and your opponent slipped on it. He broke his neck and is now paralyzed, but at least you are 20 money richer."
]

module.exports.run = async (client, message, args) => {
  const data = await loadData();
  const userId = message.member.id;
  const currentTime = Date.now();
  const lastMoneyTime = data[userId]["GETMONEY_TIME"];
  const timeSinceLastMoney = currentTime - lastMoneyTime;
  const cooldown = 1 * 60 * 60 * 1000;

  if (timeSinceLastMoney >= cooldown) {
    data[userId]["MONEY"] += 20;
    data[userId]["GETMONEY_TIME"] = currentTime;
    writeData(data);

    const randomIndex = Math.floor(Math.random() * funnyPhrases.length);
    const randomPhrase = funnyPhrases[randomIndex];

    return message.reply(`${randomPhrase} **+20 money**`);
  } else {
    const remainingTime = cooldown - timeSinceLastMoney;
    const hours = Math.floor(remainingTime / (60 * 60 * 1000));
    const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
    message.reply(`You are on cooldown. Try again in ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);
  }
};

module.exports.help = {
  name: "Get money",
  description: "Gets money if the cooldown has passed",
  category: "Fun",
  command: "get.money;get.m"
};
