const padLeft = require("../_lib/format.js").padLeft;
const padRight = require("../_lib/format.js").padRight;
const getLongestString = require("../_lib/format.js").getLongestString;

const makeRound = (picks, draftYear, roundNum, teamIdMap) => {
  let text = `${draftYear} NHL Draft - Round ${roundNum}\n`;

  const numColsName = getLongestString(picks.map(p => p.prospect.fullName))[0];
  picks.forEach((p, i) => {
    const T_C = teamIdMap[p.team.id] || "***";
    const P_ID = p.prospect.id || "?";
    const F_N = padRight(p.prospect.fullName || "?", numColsName);
    const P_O = padLeft(p.pickOverall, 3);
    const P_R = padLeft(p.pickInRound, 2, "0");
    const R = p.round;

    const str = `  ${P_O} overall (R${R}-${P_R}) - ${T_C} - ${F_N} (prospect id: ${P_ID})\n`;

    text += str;
  });

  text += `  (*** = defunct team)`;

  return text;
};

module.exports = makeRound;