const draft = require("./commands/draft.js");
const player = require("./commands/player.js");
const prospect = require("./commands/prospect.js");
const schedule = require("./commands/schedule.js");
const team = require("./commands/team.js");
const teams = require("./commands/teams.js");

const fn = {
  /**
   * (2 arguments)
   * Endpoint: https://statsapi.web.nhl.com/api/v1/draft
   * Endpoint: https://statsapi.web.nhl.com/api/v1/draft/prospects/
   */
  draft,

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
   * (0 arguments)
   * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/
   */
  teams,
};

module.exports = fn;