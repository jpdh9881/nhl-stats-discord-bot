// Contains all valid routes for a command, mapped to a function which makes an API call

const Command = require("./_lib/command.js");

const entryPointAPI = require("./_lib/api_calls/entry_point.js");
const draftAPI = require("./_lib/api_calls/draft.js");
const playerAPI = require("./_lib/api_calls/player.js");
const prospectAPI = require("./_lib/api_calls/prospect.js");
const scheduleAPI = require("./_lib/api_calls/schedule.js");
const teamAPI = require("./_lib/api_calls/team.js");
const teamsAPI = require("./_lib/api_calls/teams.js");

// Route Definitions
const entryPoint = new Command("entryPoint");
entryPoint.addRouteAndFunction("", entryPointAPI.help);

/**
 * (2 arguments)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/draft
 * Endpoint: https://statsapi.web.nhl.com/api/v1/draft/prospects/
 */
const draft = new Command("draft");
draft.addRouteAndFunction("", draftAPI.round);
draft.addRouteAndFunction("{draftYear} -round", draftAPI.round);
draft.addRouteAndFunction("{draftYear} -round {roundNum}", draftAPI.round);
draft.addRouteAndFunction("{draftYear} -pick", draftAPI.pick);
draft.addRouteAndFunction("{draftYear} -pick {pickNum}", draftAPI.pick);

/**
 * (2 arguments)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/people/
 * Endpoint: https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason
 */
const player = new Command("player");
player.addRouteAndFunction("{playerId}", playerAPI.info);
player.addRouteAndFunction("{playerId} -info", playerAPI.info);
player.addRouteAndFunction("{playerId} -stats", playerAPI.stats);

/**
 * (1 argument)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/draft/prospects/
 */
const prospect = new Command("prospect");
prospect.addRouteAndFunction("{prospectId}", prospectAPI.info);

/**
 * (1 argument)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/schedule
 */
const schedule = new Command("schedule");
schedule.addRouteAndFunction("", scheduleAPI.byDateAllTeams);
schedule.addRouteAndFunction("{teamCode}", scheduleAPI.byDateTeam);
schedule.addRouteAndFunction("{teamCode} {YYYY-MM-DD}", scheduleAPI.byDateTeam);
schedule.addRouteAndFunction("{teamCode} -next", (teamCode) => scheduleAPI.byTeamNext(teamCode));
schedule.addRouteAndFunction("{teamCode} -month", (teamCode) => scheduleAPI.byDateRangeTeam(teamCode, "month"));
schedule.addRouteAndFunction("{YYYY-MM-DD}", scheduleAPI.byDateAllTeams);

/**
 * (2 arguments)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/
 * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster
 * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/${teamId}/stats
 */
const team = new Command("team");
team.addRouteAndFunction("{teamCode}", teamAPI.teamInfo);
team.addRouteAndFunction("{teamCode} -info", teamAPI.teamInfo);
team.addRouteAndFunction("{teamCode} -roster", teamAPI.teamRoster);
team.addRouteAndFunction("{teamCode} -stats", teamAPI.teamStats);

/**
 * (0 arguments)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/
 */
const teams = new Command("teams");
teams.addRouteAndFunction("", teamsAPI.teamList);

// "Register" commands so they're accessible
const commands = [];
commands.push(entryPoint);
commands.push(draft);
commands.push(player);
commands.push(prospect);
commands.push(schedule);
commands.push(team);
commands.push(teams);

// Helper functions
function getCommand(command) {
  const index = commands.findIndex(cmd => cmd.getIdentifier() === command);
  return commands[index];
}

module.exports = {
  getCommand,
};