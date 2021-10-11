const Command = require("./_lib/classes/Command.js");
const teamsAPI = require("./_lib/api_calls/teams.js");

/**
 * (0 arguments)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/
 */
 const teams = new Command("teams");
 teams.addRoute("", teamsAPI.teamList);

 module.exports = teams;