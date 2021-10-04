const padLeft = require("../_lib/format.js").padLeft;

const makePlayer = ({ stats, info, season }) => {
  if (stats) {
    const s = stats;
    const seasonSplit = `${season.substring(0, 4)} - ${season.substring(4)}`;

    const GP = s.games;
    const G = s.goals;
    const A = s.assists;
    const P = G + A;
    const PM = s.plusMinus;
    const PIM = s.pim;
    const PGP = (s.points / s.games).toFixed(2);
    const PPG = s.powerPlayGoals;
    const PPP = s.powerPlayPoints;
    const PP_TOI = s.powerPlayTimeOnIce;
    const SHG = s.shortHandedGoals;
    const SHP = s.shortHandedPoints;
    const SH_TOI = s.shortHandedTimeOnIce;
    const EVG = G - PPG - SHG;
    const EVP = P - PPP - SHP;
    const EV_TOI = s.evenTimeOnIce;
    const TOI = s.timeOnIce;
    const TOI_GP = s.timeOnIcePerGame;
    const EV_TOI_GP = s.evenTimeOnIcePerGame;
    const SH_TOI_GP = s.shortHandedTimeOnIcePerGame;
    const PP_TOI_GP = s.powerPlayTimeOnIcePerGame;
    const Shifts = s.shifts;
    const Shifts_GP = (s.shifts / GP).toFixed(2);
    const OTG = s.overTimeGoals;
    const GWG = s.gameWinningGoals;
    const S = s.shots;
    const S_P = s.shotPct;
    const BkS = s.blocked;
    const Hits = s.hits;
    const FOW_P = s.faceOffPct;

    const text =
    `Season: ${seasonSplit}\n` +
    `-----\n` +
    `GP ${GP} | G ${G} | A ${A} | P ${P} | +/- ${PM} | PIM ${PIM} | P/GP ${PGP}\n` +
    `EVG ${EVG} | EVP ${EVP} | PPG ${PPG} | PPP ${PPP} | SHG ${SHG} | SHP ${SHP} | OTG ${OTG} | GWG ${GWG}\n` +
    `S ${S} | S% ${S_P} | Bks ${BkS} | Hits ${Hits} | FOW% ${FOW_P}\n` +
    `TOI ${TOI} | PP TOI ${PP_TOI} | SH TOI ${SH_TOI} | EV TOI ${EV_TOI}\n` +
    `TOI/GP ${TOI_GP} | PP TOI/GP ${PP_TOI_GP} | SH TOI/GP ${SH_TOI_GP} | EV TOI/GP ${EV_TOI_GP}\n` +
    `Shifts ${Shifts} | Shifts/GP ${Shifts_GP}`;

    return text;
  } else if (info) {
    const i = info;

    const F_N = i?.fullName ? i.fullName : "";
    const POS = i?.primaryPosition?.abbreviation ? i?.primaryPosition?.abbreviation : "";
    const NUM = padLeft(i?.primaryNumber, 2);
    const SH_CA = i?.shootsCatches ? i?.shootsCatches : "";
    const B_D = i?.birthDate ? i?.birthDate : "";
    const C_A = i?.currentAge ? i.currentAge : "";
    const B_C = i?.birthCity ? i?.birthCity : "";
    const B_SP = i?.birthStateProvince? i?.birthStateProvince : "";
    const B_CO = i?.birthCountry ? i?.birthCountry : "";
    const NAT = i?.nationality ? i.nationality : "";
    const H = i?.height ? i?.height : "";
    const W = i?.weight ? i?.weight : "";
    const C_T = i?.currentTeam?.name ? i.currentTeam.name : "";
    const PL_ID = i?.id? i?.id : "";
    // conditional
    const CAP = i.captain;
    const ALT_CAP = i.alternateCaptain;
    const RK = i.rookie;

    let text =
      `${F_N} (#${NUM})\n` +
      `  ${POS} -- shoots/catches ${SH_CA}\n` +
      `  Born ${B_D} -- ${B_C}, ${B_SP}, ${B_CO}\n` +
      `  Nationality ${NAT}\n` +
      `  [${C_A} yrs. ago]\n` +
      `  Height ${H} -- Weight ${W}\n` +
      `  -----\n`;

    if (C_T) {
      text += `  ${C_T}\n`;
    } else {
      text += `  (no team data)\n`;
    }

    if (CAP) {
      text += "  Captain\n"
    }
    if (ALT_CAP) {
      text += "  Alternate Captain\n"
    }
    if (RK) {
      text += "  Rookie\n"
    }

    text +=
      `  -----\n` +
      `  (player id: ${PL_ID})\n`;

    return text;
  }
};

module.exports = makePlayer;