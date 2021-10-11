const commandRegister = require("../../../../../command_register.js");
const { padLeft, padRight, getLongestString } = require("../format.js");

const makeRound = (picks, draftYear, roundNum) => {
  const teamIdMap = commandRegister.global.teams["id:teamCode"];
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