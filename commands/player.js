const Command = require("./_lib/classes/Command.js");
const playerAPI = require("./_lib/api_calls/player_api.js");

/**
 * (2 arguments)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/people/
 * Endpoint: https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason
 */
 const player = new Command("player");
 player.addRoute("{playerId}", playerAPI.info, "same as adding -info switch");
 player.addRoute("{playerId} -info", playerAPI.info, "get general information related to the player");
 player.addRoute("{playerId} -stats", playerAPI.stats, "get the player's statistics for the most recent season");
 player.setHelp({
  description: [
    "{playerId}: the number id of the player",
  ],
  examples: [
    "8477939 -info",
    "8477939 -stats",
  ],
});

 module.exports = player;