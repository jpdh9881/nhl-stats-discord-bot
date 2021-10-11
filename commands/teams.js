const Command = require("./_lib/classes/Command.js");
const teamsAPI = require("./_lib/api_calls/teams_api.js");

/**
 * (0 arguments)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/
 */
 const teams = new Command("teams");
 teams.addRoute("", teamsAPI.teamList, "list of teams (with teamCodes)");
 teams.addRoute("-list", teamsAPI.teamList, "list of teams (with teamCodes)");
 teams.setHelp({
  examples: [
    "",
    "-list",
  ],
});

 module.exports = teams;