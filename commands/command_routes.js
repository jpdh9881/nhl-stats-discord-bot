// Contains all valid routes for a command, mapped to a function which makes an API call

const entryPointAPI = require("../commands/entry_point.js");
const draftAPI = require("../commands/draft.js");
const playerAPI = require("../commands/player.js");
const prospectAPI = require("../commands/prospect.js");
const scheduleAPI = require("../commands/schedule.js");
const teamAPI = require("../commands/team.js");
const teamsAPI = require("../commands/teams.js");

/**
 * (2 arguments)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/draft
 * Endpoint: https://statsapi.web.nhl.com/api/v1/draft/prospects/
 */
const draft = {
  routes: {
    "": {},
    "{draftYear} -round": {},
    "{draftYear} -round {roundNum}": {},
    "{draftYear} -pick": {},
    "{draftYear} -pick {pickNum}": {},
  },
};

/**
 * (2 arguments)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/people/
 * Endpoint: https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason
 */
const player = {
  routes: {
    "{playerId}": playerAPI.info,
    "{playerId} -info": playerAPI.info,
    "{playerId} -stats": playerAPI.stats,
  },
};

/**
 * (1 argument)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/draft/prospects/
 */
const prospect = {
  routes: {
    "{prospectId}": {},
  },
};

/**
 * (1 argument)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/schedule
 */
const schedule = {
  routes: {
    "": {},
    "{teamCode}": {},
    "{teamCode} {YYYY-MM-DD}": {},
    "{YYYY-MM-DD}": {},
  },
};

/**
 * (2 arguments)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/
 * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster
 * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/${teamId}/stats
 */
const team = {
  routes: {
    "{teamCode}": {},
    "{teamCode} -info": {},
    "{teamCode} -roster": {},
    "{teamCode} -stats": {},
  },
};

/**
 * (0 arguments)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/
 */
const teams = {
  routes: {
    "": {},
  },
};

module.exports = {
  draft,
  player,
  prospect,
  schedule,
  team,
  teams,
};