const axios = require("axios");
const api = require("../../../api_settings.js").api;
const { getIdFromAbbrev } = require("./_lib/teams/team_utility.js");
const makeInfo = require("./_lib/team/makeInfo.js");
const makeRoster = require("./_lib/team/makeRoster.js");
const makeStats = require("./_lib/team/makeStats.js");

const teamInfo = async (teamCode) => {
  const teamId = getIdFromAbbrev(teamCode.toUpperCase());

  if (!teamId) {
    throw new Error ("Invalid team code.");
  }

  const res = await axios.get(`${api}teams/${teamId}`);
  const data = res.data.teams?.[0];
  return makeInfo(data);
};

const teamRoster = async (teamCode) => {
  const teamId = getIdFromAbbrev(teamCode.toUpperCase());

  if (!teamId) {
    throw new Error ("Invalid team code.");
  }

  const res = await axios.get(`${api}teams/${teamId}/roster`);
  const data = res.data.roster.sort((a, b) => (parseInt(a.jerseyNumber) > parseInt(b.jerseyNumber)) - (parseInt(a.jerseyNumber) < parseInt(b.jerseyNumber)));
  return makeRoster(data);
};

const teamStats = async (teamCode) => {
  const teamId = getIdFromAbbrev(teamCode.toUpperCase());

  if (!teamId) {
    throw new Error ("Invalid team code.");
  }

  const res = await axios.get(`${api}teams/${teamId}/stats`);
  const data = res.data.stats[0]?.splits?.[0]?.stat;
  return makeStats(data);
};

module.exports = {
  teamInfo,
  teamRoster,
  teamStats,
};