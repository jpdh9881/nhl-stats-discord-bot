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
/**
 * (2 arguments)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/draft
 * Endpoint: https://statsapi.web.nhl.com/api/v1/draft/prospects/
 */
const draft = new Command("draft");
draft.addRouteAndFunction("", null);
draft.addRouteAndFunction("{draftYear} -round", null);
draft.addRouteAndFunction("{draftYear} -round {roundNum}", null);
draft.addRouteAndFunction("{draftYear} -pick", null);
draft.addRouteAndFunction("{draftYear} -pick {pickNum}", null);

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
prospect.addRouteAndFunction("{prospectId}", null);

/**
 * (1 argument)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/schedule
 */
const schedule = new Command("schedule");
schedule.addRouteAndFunction("", null);
schedule.addRouteAndFunction("{teamCode}", null);
schedule.addRouteAndFunction("{teamCode} {YYYY-MM-DD}", null);
schedule.addRouteAndFunction("{YYYY-MM-DD}", null);

/**
 * (2 arguments)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/
 * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster
 * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/${teamId}/stats
 */
const team = new Command("team");
team.addRouteAndFunction("{teamCode}", null);
team.addRouteAndFunction("{teamCode} -info", null);
team.addRouteAndFunction("{teamCode} -roster", null);
team.addRouteAndFunction("{teamCode} -stats", null);

/**
 * (0 arguments)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/
 */
const teams = new Command("teams");
teams.addRouteAndFunction("", null);

// "Register" commands so they're accessible
const commands = [];
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