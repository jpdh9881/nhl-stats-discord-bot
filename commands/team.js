const axios = require("axios");
const getTeams = require("./teams/getTeams.js");
const makeInfo = require("./team/makeInfo.js");
const makeRoster = require("./team/makeRoster.js");
const makeStats = require("./team/makeStats.js");

const help =
  `\`\`\`` +
  `Command:\n` +
  `  ?team teamCode -option1?\n` +
  `     teamCode: (optional) 3-letter teamCode\n` +
  `     -option1: -roster, -stats, -info (default)` +
  `Help:\n` +
  `  ?team -help\n` +
  `Examples:\n` +
  `  ?team TOR -roster` +
  `  ?team NSH -stats` +
  `  ?team WSH` +
  `\`\`\``;
const team = async (teamCode, option1) => {
  // Get team ID
  const teamIdMap = await getTeams({ format: "abbrev:id", raw: true });
  const teamId = teamIdMap[teamCode.toUpperCase()];

  if (!teamId) {
    return help;
  }

  switch (option1) {
    case "-roster": {
      const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster`);
      const data = res.data.roster.sort((a, b) => (parseInt(a.jerseyNumber) > parseInt(b.jerseyNumber)) - (parseInt(a.jerseyNumber) < parseInt(b.jerseyNumber)));
      return makeRoster(data);
    } break;
    case "-stats": {
      const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}/stats`);
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
      const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}`);
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