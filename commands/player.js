const axios = require("axios");
const api = require("../api_settings.js").api;
const help = require("./map_help.js")["player"];
const makePlayer = require("./player/makePlayer.js");

const player = async (playerId, option1 = "-info") => {
  if (!playerId || playerId === "-help") {
    return help;
  }
  switch (option1) {
    case "-info": {
      // no stats
      const res = await axios.get(`${api}people/${playerId}`);
      if (res.data.people.length > 0) {
        const data = res.data.people[0];
        const text = makePlayer({ info: data })
        return text;
      } else {
        return "No player found.";
      }
    } break;
    case "-stats": {
      const res = await axios.get(`${api}people/${playerId}/stats?stats=statsSingleSeason`);
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