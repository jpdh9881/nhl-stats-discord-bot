const draft = require("./draft.js");
const player = require("./player.js");
const schedule = require("./schedule.js");
const team = require("./team.js");
const teams = require("./teams.js");

const command_map = {
  /**
   * (2 arguments)
   * Endpoint: https://statsapi.web.nhl.com/api/v1/draft
   * Command: draft arg1 arg2 arg3?
   *    arg1 = 4-digit year
   *    arg2
   *      = round
   *        arg3 = 1(default)/2/3/4/5/6/7
   *      = pick
   *        arg3 = 1(default)-final draft position (final draft position changes based on year)
   */
   draft,

  /**
   * (1 argument)
   * Endpoint: https://statsapi.web.nhl.com/api/v1/schedule
   * Command: schedule arg1
   *    arg1 = three-letter team code
   * Description: Returns
   */
  schedule,

  /**
   * (2 arguments)
   * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/
   * Command: team arg1 arg2?
   *    arg1 = a three-letter team code
   *    arg2 (optional) = roster / stats / info(default)
   * Description: Gets data related to a team
   */
  team,

  /**
   * (2 arguments)
   * Endpoint: https://statsapi.web.nhl.com/api/v1/person/
   * Command: player arg1 arg2?
   *    arg1 = player's id
   *    arg2 (optional) = stats / info(default)
   * Description: Gets data related to a team
   */
  player,

  // utility commands (don't count towards assignment count)
  /**
   * Endpoint: https://statsapi.web.nhl.com/api/v1/teams/
   * Command: teams
   * Description: Gets a list of team codes and teams
   */
  teams,
};

module.exports = command_map;