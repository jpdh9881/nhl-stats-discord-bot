const axios = require("axios");
const api = require("../api_settings.js").api;
const help = require("./map_help.js")["draft"];
const getTeams = require("./teams/getTeams");
const makeProspect = require("./prospect/makeProspect");
const makeRound = require("./draft/makeRound");

const draft = async (draftYear, option1, option2 = 1) => {
  // Get team abbreviations
  const teamIdMap = await getTeams({ format: "id:abbrev", raw: true });

  switch (option1) {
    case "-round": {
      const roundNum = option2;
      const res = await axios.get(`${api}draft/${draftYear}`);
      if (res.data.drafts.length <= 0) {
        throw new Error ("Draft not found!");
      }

      const year = res.data.drafts[0].draftYear;
      const rounds = res.data.drafts[0].rounds;
      const round = rounds[roundNum - 1];
      if (!round) {
        throw new Error ("Round not found!");
      }

      return makeRound(round.picks, year, roundNum, teamIdMap);
    } break;
    case "-pick": {
      const overallPick = option2;

      const res1 = await axios.get(`${api}draft/${draftYear}`);
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

      const prospectId = pick.prospect.id;
      let prospect = null;
      if (prospectId) {
        const res2 = await axios.get(`${api}draft/prospects/${prospectId}`);
        prospect = res2.data.prospects[0];
      }
      const text = makeProspect(prospect, pick, teamIdMap[pick.team.id]);

      return text;
    } break;
    default: {
      return [ help ];
    }
  }
};

module.exports = draft;