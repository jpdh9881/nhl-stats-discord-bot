const axios = require("axios");
const getTeams = require("./teams/getTeams");
const makeProspect = require("./prospect/makeProspect");

const help =
  `\`\`\`` +
  `Command:\n` +
  `  ?draft draftYear -option1 -option2\n` +
  `    draftYear: an NHL Draft Year\n` +
  `    -option1: -round, -pick\n` +
  `      1) -round: display all players selected in a particular round\n` +
  `        -option2 becomes the number of the round (default: 1)\n` +
  `      2) -pick: display the player selected nth overall\n` +
  `        -option2 becomes the draft position (default: 1)\n` +
  `Note:\n` +
  `  # of rounds and # of players drafted changes year to year!\n` +
  `Examples:\n` +
  `  ?draft 2010 -round 5\n` +
  `  ?draft 2021 -pick 124\n` +
  `\`\`\``;
const draft = async (draftYear, option1, option2 = 1) => {
  // Get team abbreviations
  const teamIdMap = await getTeams({ format: "id:abbrev", raw: true });

  if (!draftYear) {
    return help;
  }

  switch (option1) {
    case "-round": {
      const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/draft/${draftYear}`);
      if (res.data.drafts.length <= 0) {
        throw new Error ("Draft not found!");
      }

      const year = res.data.drafts[0].draftYear;
      const rounds = res.data.drafts[0].rounds;
      const text = [
        `__Draft Year: ${year}__ - Round ${option2}\n`,
        "",
      ];
      const round = rounds[option2 - 1];
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

      return text;
    } break;
    case "-pick": {
      const overallPick = option2;

      const res1 = await axios.get(`https://statsapi.web.nhl.com/api/v1/draft/${draftYear}`);
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
      const text = makeProspect(pick, prospect, teamIdMap[pick.team.id]);

      return text;
    } break;
    default: {
      return help;
    }
  }
};

module.exports = draft;