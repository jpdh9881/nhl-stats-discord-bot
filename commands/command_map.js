const draft = require("./draft.js");
const player = require("./player.js");
const prospect = require("./prospect.js");
const schedule = require("./schedule.js");
const team = require("./team.js");
const teams = require("./teams.js");

const command_map = {
  /**
   * (2 arguments)
   * Endpoint: https://statsapi.web.nhl.com/api/v1/draft
   * Endpoint: https://statsapi.web.nhl.com/api/v1/draft/prospects/
   */
   draft,

  /**
   * (1 argument)
   * Endpoint: https://statsapi.web.nhl.com/api/v1/schedule
   */
  schedule,

  /**
   * (2 arguments)
   * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/
   * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster
   * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/${teamId}/stats
   */
  team,

  /**
   * (2 arguments)
   * Endpoint: https://statsapi.web.nhl.com/api/v1/people/
   * Endpoint: https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason
   */
  player,

  /**
   * (1 argument)
   * Endpoint: https://statsapi.web.nhl.com/api/v1/draft/prospects/
   */
  prospect,

  /**
   * (0 arguments)
   * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/
   */
  teams,
};

module.exports = command_map;