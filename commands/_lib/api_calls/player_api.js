const axios = require("axios");
const api = require("../../../api_settings.js").api;
const makePlayer = require("./_lib/player/makePlayer.js");

const info = async (playerId) => {
  try {
    const res = await axios.get(`${api}people/${playerId}`);
    if (res.data.people.length > 0) {
      const data = res.data.people[0];
      const text = makePlayer({ info: data })
      return text;
    } else {
      throw "";
    }
  } catch (e) {
    return "Player not found.";
  }
};

const stats = async (playerId) => {
  try {
    const res = await axios.get(`${api}people/${playerId}/stats?stats=statsSingleSeason`);
    if (res.data.stats.length > 0) {
      console.log(res.data.stats);
      const data = res.data.stats[0].splits[0];
      const text = makePlayer({ stats: data.stat, season: data.season });
      return text;
    } else {
      throw "";
    }
  } catch (e) {
    console.log(e)
    return "Player data not found.";
  }
};

module.exports = {
  info,
  stats,
};