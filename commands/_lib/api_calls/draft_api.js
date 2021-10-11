const axios = require("axios");
const api = require("../../../api_settings.js").api;
const getTeams = require("./_lib/teams/getTeams");
const makeProspect = require("./_lib/prospect/makeProspect");
const makeRound = require("./_lib/draft/makeRound");

const round = async (draftYear = (new Date()).getFullYear(), roundNum = 1) => {
  // Get team abbreviations
  const teamIdMap = await getTeams({ format: "id:abbrev", raw: true });

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
};

const pick = async (draftYear = (new Date()).getFullYear(), pickOverallNum = 1) => {
  // Get team abbreviations
  const teamIdMap = await getTeams({ format: "id:abbrev", raw: true });

  const res1 = await axios.get(`${api}draft/${draftYear}`);
  if (res1.data.drafts.length <= 0) {
    throw new Error ("Draft not found!");
  }
  const rounds = res1.data.drafts[0].rounds;
  const numPicksPerRound = rounds[0].picks.length;
  const roundIndex = Math.floor(pickOverallNum / numPicksPerRound);
  const indexInRound = pickOverallNum - (roundIndex * numPicksPerRound);

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

  return makeProspect(prospect, pick, teamIdMap[pick.team.id]);
};

module.exports = {
  round,
  pick,
};