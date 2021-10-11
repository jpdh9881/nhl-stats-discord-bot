const Command = require("./_lib/classes/Command.js");
const teamAPI = require("./_lib/api_calls/team_api.js");

/**
 * (2 arguments)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/
 * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster
 * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/${teamId}/stats
 */
 const team = new Command("team");
 team.addRoute("{teamCode}", teamAPI.teamInfo);
 team.addRoute("{teamCode} -info", teamAPI.teamInfo);
 team.addRoute("{teamCode} -roster", teamAPI.teamRoster);
 team.addRoute("{teamCode} -stats", teamAPI.teamStats);
 team.setHelp({
  description: [
    "{teamCode}: three-letter team code",
    "  (type \"?teams -list\" for a list of team codes)",
  ],
  examples: [
    "TOR",
    "TOR -info",
  ],
});

 module.exports = team;