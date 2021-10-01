const axios = require("axios");
const getTeams = require("./teams/getTeams");
const makeProspect = require("./prospect/makeProspect");

const draft = async (arg1, arg2, arg3 = 1) => {
  // Get team abbreviations
  const teamIdMap = await getTeams({ format: "id:abbrev", raw: true });

  let text;
  if (arg2 === "round") {
    const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/draft/${arg1}`);
    if (res.data.drafts.length <= 0) {
      throw new Error ("Draft not found!");
    }

    const year = res.data.drafts[0].draftYear;
    const rounds = res.data.drafts[0].rounds;
    text = [
      `__Draft Year: ${year}__ - Round ${arg3}\n`,
      "",
    ];
    const round = rounds[arg3 - 1];
    if (!round) {
      throw new Error ("Round not found!");
    }
    round.picks.forEach((p, i) => {
      if (i <= Math.floor(round.picks.length / 2)) {
        text[0] += `R${p.round}-${p.pickInRound} (overall: ${p.pickOverall}) - ${teamIdMap[p.team.id]} - **${p.prospect.fullName}** (prospect id: ${p.prospect.id})\n`;
      } else {
        text[1] += `R${p.round}-${p.pickInRound} (overall: ${p.pickOverall}) - ${teamIdMap[p.team.id]} - **${p.prospect.fullName}** (prospect id: ${p.prospect.id})\n`;
      }
    });
  } else if (arg2 === "pick") {
    const overallPick = arg3;

    const res1 = await axios.get(`https://statsapi.web.nhl.com/api/v1/draft/${arg1}`);
    if (res1.data.drafts.length <= 0) {
      throw new Error ("Draft not found!");
    }
    const rounds = res1.data.drafts[0].rounds;
    const numPicksPerRound = rounds[0].picks.length;
    const roundIndex = Math.floor(overallPick / numPicksPerRound);
    const indexInRound = overallPick - (roundIndex * numPicksPerRound);

    const pick = rounds[roundIndex]?.picks[indexInRound - 1];
    if (!pick) {
      throw new Error ("Invalid pick");
    }
    console.log(pick);
    const prospectId = pick.prospect.id;
    let prospect = null;
    if (prospectId) {
      const res2 = await axios.get(`https://statsapi.web.nhl.com/api/v1/draft/prospects/${prospectId}`);
      prospect = res2.data.prospects[0];
    }
    text = makeProspect(pick, prospect, teamIdMap[pick.team.id]);

  }
  return text;
};

module.exports = draft;