const Command = require("./_lib/classes/Command.js");
const playerAPI = require("./_lib/api_calls/player_api.js");

/**
 * (2 arguments)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/people/
 * Endpoint: https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason
 */
 const player = new Command("player");
 player.addRoute("{playerId}", playerAPI.info);
 player.addRoute("{playerId} -info", playerAPI.info);
 player.addRoute("{playerId} -stats", playerAPI.stats);

 module.exports = player;