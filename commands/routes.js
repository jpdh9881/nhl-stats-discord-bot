/**
 * Contains all valid routes for a command, mapped to a function which makes an API call
 */
// const matchRoute = require("./_lib/match_route.js");

// const entryPointAPI = require("../commands/entry_point.js");
// const draftAPI = require("../commands/draft.js");
const playerAPI = require("./_lib/api_calls/player.js");
// const prospectAPI = require("../commands/prospect.js");
// const scheduleAPI = require("../commands/schedule.js");
// const teamAPI = require("../commands/team.js");
// const teamsAPI = require("../commands/teams.js");

const routes = {
  /**
   * (2 arguments)
   * Endpoint: https://statsapi.web.nhl.com/api/v1/draft
   * Endpoint: https://statsapi.web.nhl.com/api/v1/draft/prospects/
   */
  draft: {
    "": {},
    "{draftYear} -round": {},
    "{draftYear} -round {roundNum}": {},
    "{draftYear} -pick": {},
    "{draftYear} -pick {pickNum}": {},
  },

  /**
   * (2 arguments)
   * Endpoint: https://statsapi.web.nhl.com/api/v1/people/
   * Endpoint: https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason
   */
  player: {
    "{playerId}": playerAPI.info,
    "{playerId} -info": playerAPI.info,
    "{playerId} -stats": playerAPI.stats,
  },

  /**
   * (1 argument)
   * Endpoint: https://statsapi.web.nhl.com/api/v1/draft/prospects/
   */
  prospect: {
    "{prospectId}": {},
  },

  /**
   * (1 argument)
   * Endpoint: https://statsapi.web.nhl.com/api/v1/schedule
   */
  schedule: {
    "": {},
    "{teamCode}": {},
    "{teamCode} {YYYY-MM-DD}": {},
    "{YYYY-MM-DD}": {},
  },

  /**
   * (2 arguments)
   * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/
   * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster
   * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/${teamId}/stats
   */
  team: {
    "{teamCode}": {},
    "{teamCode} -info": {},
    "{teamCode} -roster": {},
    "{teamCode} -stats": {},
  },

  /**
   * (0 arguments)
   * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/
   */
  teams: {
    "": {},
  },
};

// const getRoutes = (command) => {
//   return routes[command];
// };
function getRoutes(command) {
  return routes[command];
}

const runRoute = (command, route) => {
  return routes[command][route];
}

module.exports = {
  getRoutes: getRoutes,
  // matchRoute: matchRoute,
  runRoute: runRoute,
};