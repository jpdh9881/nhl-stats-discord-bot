const axios = require("axios");
const makePlayer = require("./player/makePlayer.js");

const player = async (arg1, arg2) => {
  if (arg1) {
    const playerId = arg1;
    if (arg2 === "stats") {
      // return stats
      const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason`);
      if (res.data.stats.length > 0) {
        const data = res.data.stats[0].splits[0];
        const text = makePlayer({ stats: data.stat, season: data.season });
        return text;
      } else {
        return "No data found.";
      }
    } else {
      // no stats
      const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerId}`);
      if (res.data.people.length > 0) {
        const data = res.data.people[0];
        const text = makePlayer({ info: data })
        return text;
      } else {
        return "No player found.";
      }
    }
  }
  return "Command: player arg1 arg2? (arg1 = player code, arg2 = info/stats)";
};

module.exports = player;