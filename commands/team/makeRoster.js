const padLeft = require("../_lib/format.js").padLeft;
const padRight = require("../_lib/format.js").padRight;
const getLongestString = require("../_lib/format").getLongestString;

const makeRoster = (roster) => {

  const colsFullName = getLongestString(roster.map(pl => pl.person.fullName))[0];

  const MAX_LINES = 21;
  let players = new Array(Math.floor(roster.length / MAX_LINES) + 1);
  players.fill("```");

  roster.forEach((pl, i) => {

    const N = padLeft(pl.jerseyNumber);
    const P = padRight(pl.position.abbreviation);
    const F_N = padRight(pl.person.fullName, colsFullName);
    const ID = pl.person.id;

    players[Math.floor(i / MAX_LINES)] += `${N} - ${P} - ${F_N} (player id: ${ID})\n`;
  });

  for (let i in players) {
    players[i] += "```";
  }
  return players;
};

module.exports = makeRoster;