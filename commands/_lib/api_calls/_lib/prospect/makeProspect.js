const commandRegister = require("../../../../../command_register.js");
const makeProspect = (prospect, pick) => {
  const p = pick, pr = prospect;

  // pick object will only be passed if this makeProspect call came from draft command
  //  - no route to it through prospect command
  let T_C, R, P_O, Y;
  if (p) {
    T_C = commandRegister.global.teams["id:teamCode"][pick.team.id];
    R = p?.round;
    P_O = p?.pickOverall;
    Y = p?.year;
  }

  let text;
  let name = pr?.fullName;
  let age = "";
  // Prospects from old drafts don't have prospect records
  if (pr) {
    const diff = new Date(Math.abs(Date.now() - (new Date(pr.birthDate))));
    age = diff.getFullYear() - 1970 || ""; // https://stackoverflow.com/questions/11346069/how-to-get-difference-in-year-where-dates-are-in-yyyy-mm-dd
  }

  // prospect object
  const POS = pr?.primaryPosition?.abbreviation ? pr?.primaryPosition?.abbreviation : "";
  const SH_CA = pr?.shootsCatches ? pr?.shootsCatches : "";
  const B_D = pr?.birthDate ? pr?.birthDate : "";
  const B_C = pr?.birthCity ? pr?.birthCity : "";
  const B_SP = pr?.birthStateProvince? pr?.birthStateProvince : "";
  const B_CO = pr?.birthCountry ? pr?.birthCountry : "";
  const H = pr?.height ? pr?.height : "";
  const W = pr?.weight ? pr?.weight : "";
  const A_T = pr?.amateurTeam?.name ? pr?.amateurTeam?.name : "";
  const A_L = pr?.amateurLeague?.name ? pr?.amateurLeague?.name : "";
  const P_C = pr?.prospectCategory?.name ? pr?.prospectCategory?.name : "";
  const D_S = pr?.draftStatus ? pr?.draftStatus : "";
  const PL_ID = pr?.nhlPlayerId? pr?.nhlPlayerId : "";
  const PR_ID = pr?.id ? pr?.id : "";

  text =
    `${name}\n` +
    `  ${POS} -- shoots/catches ${SH_CA}\n` +
    `  Born ${B_D} -- ${B_C}, ${B_SP}, ${B_CO}\n` +
    `  [${age} yrs. ago]\n` +
    `  Height ${H} -- Weight ${W}\n`;

  if (pick) {
    text +=
      `  -----\n` +
      `  Drafted by ${T_C}\n` +
      `    round ${R} -- ${P_O} overall -- ${Y} NHL Entry Draft\n`;
  }

  text +=
    `  -----\n` +
    `  Amateur Team: ${A_T} (${A_L})\n` +
    `  Prospect Category: ${P_C}\n` +
    `  Draft Status: ${D_S}\n` +
    `  -----\n` +
    `  (player id: ${PL_ID}, prospect id: ${PR_ID})\n`;

  return text;
};

module.exports = makeProspect;