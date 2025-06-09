const adjectives = [
  "Silent",
  "Crimson",
  "Shadow",
  "Silver",
  "Stealthy",
  "Phantom",
  "Ghostly",
  "Dark",
  "Rapid",
  "Thunder",
  "Lone",
  "Icy",
  "Savage",
  "Blazing",
  "Night",
  "Covert",
  "Scarlet",
  "Atomic",
  "Feral",
  "Cunning",
];

const nouns = [
  "Falcon",
  "Kraken",
  "Wraith",
  "Viper",
  "Specter",
  "Eagle",
  "Wolf",
  "Jaguar",
  "Panther",
  "Dragon",
  "Hawk",
  "Nightingale",
  "Raven",
  "Ocelot",
  "Scorpion",
];

function getRandomCode() {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomCode = `${randomAdjective}${" "}${randomNoun}`;
  return randomCode;
}

module.exports = getRandomCode;
