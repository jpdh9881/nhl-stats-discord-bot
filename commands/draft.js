const axios = require("axios");
const teams = require("../helpers/teams");

const draft = async (arg1, arg2, arg3 = 1) => {
  // Get team abbreviations
  const teamIdMap = await teams({ format: "id:abbrev", raw: true });

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
    console.log(roundIndex, indexInRound);
    if (!pick) {
      throw new Error ("Invalid pick");
    }
    const prospectId = pick.prospect.id;

    const res2 = await axios.get(`https://statsapi.web.nhl.com/api/v1/draft/prospects/${prospectId}`);
    data = res2.data.prospects[0];
    console.log(data.amateurTeam);
    text =
`
__${data.lastName}, ${data.firstName} - ${pick.year} Draft - R${pick.round}-${pick.pickInRound} (overall: ${pick.pickOverall})__
**Birth Date**: ${data.birthDate ? data.birthDate : ""}
**Place of Birth**: ${data.birthCity ? data.birthCity : ""}, ${data.birthStateProvince? data.birthStateProvince : "" }, ${data.birthCountry}
**Height**: ${data.height ? data.height : ""}
**Weight**: ${data.weight ? data.weight : ""}lbs
**Position**: ${data.primaryPosition.abbreviation ? data.primaryPosition.abbreviation : ""}
**Shoots/Catches**: ${data.shootsCatches ? data.shootsCatches : ""}
**Amateur Team**: ${data.amateurTeam.name ? data.amateurTeam.name : ""} (${data.amateurLeague.name ? data.amateurLeague.name : ""})
**Prospect Category**: ${data.prospectCategory.name ? data.prospectCategory.name : ""}
**Draft Status**: ${data.draftStatus ? data.draftStatus : ""}
(player id: ${data.nhlPlayerId? data.nhlPlayerId : ""})
(prospect id: ${data.id ? data.id : ""})
`;
  }
  return text;
};

module.exports = draft;