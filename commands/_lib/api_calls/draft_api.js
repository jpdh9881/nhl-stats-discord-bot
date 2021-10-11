const axios = require("axios");
const api = require("../../../api_settings.js").api;
const makeProspect = require("./_lib/prospect/makeProspect");
const makeRound = require("./_lib/draft/makeRound");

const round = async (draftYear = (new Date()).getFullYear(), roundNum = 1) => {
  const res = await axios.get(`${api}draft/${draftYear}`);
  if (res.data.drafts.length <= 0) {
    throw new Error ("Draft not found!");
  }

  const year = res.data.drafts[0].draftYear;
  const rounds = res.data.drafts[0].rounds;
  const round = rounds.find(r => r.roundNumber === parseInt(roundNum));
  if (!round) {
    throw new Error ("Round not found!");
  }

  return makeRound(round.picks, year, roundNum);
};

const pick = async (draftYear = (new Date()).getFullYear(), pickOverallNum = 1) => {
  const res1 = await axios.get(`${api}draft/${draftYear}`);
  if (res1.data.drafts.length <= 0) {
    throw new Error ("Draft not found!");
  }
  const rounds = res1.data.drafts[0].rounds;

  let pick;
  for (const round of rounds) {
    pick = round.picks.find(p => p.pickOverall === parseInt(pickOverallNum));
    if (pick) {
      break;
    }
  }

  if (!pick) {
    throw new Error ("Invalid pick");
  }

  const prospectId = pick.prospect.id;
  let prospect = null;
  if (prospectId) {
    const res2 = await axios.get(`${api}draft/prospects/${prospectId}`);
    prospect = res2.data.prospects[0];
  } else {
    prospect = {
      fullName: pick.prospect.fullName,
    };
  }

  return makeProspect(prospect, pick);
};

module.exports = {
  round,
  pick,
};