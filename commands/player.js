const axios = require("axios");
const makePlayer = require("./player/makePlayer.js");

const help =
  `\`\`\`` +
  `Command: ?player playerId -option1\n` +
  `           playerId: the id of the player\n` +
  `           -option1: -info, -stats\n` +
  `             1) -info: (default) get general information related to the player\n` +
  `             2) -stats: get the player's statistics for the most recent season\n` +
  `Help:\n` +
  `  ?player -help\n` +
  `Examples:\n` +
  `  ?player 8477939 -info\n` +
  `  ?player 8477939 -stats\n` +
  `\`\`\``;
const player = async (playerId, option1 = "-info") => {
  if (!playerId || playerId === "-help") {
    return help;
  }
  switch (option1) {
    case "-info": {
      // no stats
      const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerId}`);
      if (res.data.people.length > 0) {
        const data = res.data.people[0];
        const text = makePlayer({ info: data })
        return text;
      } else {
        return "No player found.";
      }
    } break;
    case "-stats": {
      const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason`);
      if (res.data.stats.length > 0) {
        const data = res.data.stats[0].splits[0];
        const text = makePlayer({ stats: data.stat, season: data.season });
        return text;
      } else {
        return "No data found.";
      }
    } break;
    default: {
      return help;
    }
  }
};

module.exports = player;