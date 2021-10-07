const padLeft = require("../_lib/format.js").padLeft;
const padRight = require("../_lib/format.js").padRight;
const getLongestString = require("../_lib/format").getLongestString;

const makeRoster = (roster) => {

  const colsFullName = getLongestString(roster.map(pl => pl.person.fullName))[0];

  let text = "";

  roster.forEach((pl, i) => {

    const N = padLeft(pl.jerseyNumber);
    const P = padRight(pl.position.abbreviation);
    const F_N = padRight(pl.person.fullName, colsFullName);
    const ID = pl.person.id;

    text += `${N} - ${P} - ${F_N} (player id: ${ID})`;
    if (i < roster.length - 1) {
      text += "\n";
    } else {
      text += "\n";
    }
  });

  return text;
};

module.exports = makeRoster;