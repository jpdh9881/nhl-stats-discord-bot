const makeGame = require("./makeGame.js");

const makeSchedule = (data) => {
  let games = [];

  data.forEach(game => {
    games.push(makeGame(game));
  });

  let text = "";
  games.forEach((g, i) => {
    text += g;
    if (i < games.length - 1) {
      text += "\n";
    }
  });

  if (text === "") {
    text = "No games :( Find something else to do"
  }

  return text;
};

module.exports = makeSchedule;