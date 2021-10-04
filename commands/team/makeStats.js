const makeStats = (teamStats) => {
  const ts = teamStats;

  const GP = ts.gamesPlayed;
  const W = ts.wins;
  const L = ts.losses;
  const OT = ts.ot;
  const P = ts.pts;
  const P_P = ts.ptPctg;

  const GF_G = ts.goalsPerGame;
  const GA_G = ts.goalsAgainstPerGame;
  const EV_GGA_R = ts.evGGARatio;

  const PP_P = ts.powerPlayPercentage;
  const PP_G = ts.powerPlayGoals;
  const PP_GA = ts.powerPlayGoalsAgainst;
  const PP_OPP = ts.powerPlayOpportunities;
  const PK_P = ts.penaltyKillPercentage;

  const SH_G = ts.shotsPerGame;
  const SH_A = ts.shotsAllowed;
  const SH_P = ts.shootingPctg;
  const S_P = ts.savePctg;

  const W_S_F = ts.winScoreFirst;
  const W_O_S_F = ts.winOppScoreFirst;
  const W_L_F_P = ts.winLeadFirstPer;
  const W_L_S_P = ts.winLeadSecondPer;
  const W_O_O = ts.winOutshootOpp;
  const W_O_B_O = ts.winOutshotByOpp;

  const FO_T = ts.faceOffsTaken;
  const FO_W = ts.faceOffsWon;
  const FO_L = ts.faceOffsLost;
  const FO_WP = ts.faceOffWinPercentage;


  const text =
    `GP ${GP} | W ${W} | L ${L} | OT ${OT} | P ${P} | P% ${P_P}\n` +
    `GF/GP ${GF_G} | GA/GP ${GA_G} | EV GF/GA ${EV_GGA_R}\n` +
    `PP% ${PP_P} | PP GF ${PP_G} | PP GA ${PP_GA} | PP OPP ${PP_OPP} | PK% ${PK_P}\n` +
    `Shots/GP ${SH_G} | SA/GP ${SH_A} | SH% ${SH_P} | S% ${S_P}\n` +
    `W% Score 1st ${W_S_F} | W% OPP Score 1st ${W_O_S_F} | W% Lead 1P ${W_L_F_P} | W% Lead 2P ${W_L_S_P} | W% Outshoot OPP ${W_O_O} | W% Outshot by OPP ${W_O_B_O}\n` +
    `FO ${FO_T} | FOW ${FO_W} | FOL ${FO_L} | FOW% ${FO_WP}`;
  return text;
};

module.exports = makeStats;