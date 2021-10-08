const axios = require("axios");
const api = require("../../../api_settings.js").api;
const getTeams = require("./_lib/teams/getTeams.js");
const makeInfo = require("./_lib/team/makeInfo.js");
const makeRoster = require("./_lib/team/makeRoster.js");
const makeStats = require("./_lib/team/makeStats.js");

const team = async (teamCode, option1) => {
  // Get team ID
  const teamIdMap = await getTeams({ format: "abbrev:id", raw: true });
  const teamId = teamIdMap[teamCode.toUpperCase()];

  if (!teamId) {
    return help;
  }

  switch (option1) {
    case "-roster": {
      const res = await axios.get(`${api}teams/${teamId}/roster`);
      const data = res.data.roster.sort((a, b) => (parseInt(a.jerseyNumber) > parseInt(b.jerseyNumber)) - (parseInt(a.jerseyNumber) < parseInt(b.jerseyNumber)));
      return makeRoster(data);
    } break;
    case "-stats": {
      const res = await axios.get(`${api}teams/${teamId}/stats`);
      const data = res.data.stats[0]?.splits?.[0]?.stat;
      if (data) {
        return makeStats(data);
      } else {
        return "```No team stats.```"
      }
    } break;
    case "-help": {
      return "help";
    } break;
    default: {
      const res = await axios.get(`${api}teams/${teamId}`);
      const data = res.data.teams?.[0];
      if (data) {
        return makeInfo(data);
      } {
        return "```No team info.```";
      }
    }
  }
};

module.exports = team;