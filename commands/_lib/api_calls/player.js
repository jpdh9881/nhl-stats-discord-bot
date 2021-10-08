const axios = require("axios");
const api = require("../../../api_settings.js").api;
const makePlayer = require("./_lib/player/makePlayer.js");

const info = async (playerId) => {
  const res = await axios.get(`${api}people/${playerId}`);
  if (res.data.people.length > 0) {
    const data = res.data.people[0];
    const text = makePlayer({ info: data })
    return text;
  } else {
    return "No player found.";
  }
};

const stats = async (playerId) => {
  const res = await axios.get(`${api}people/${playerId}/stats?stats=statsSingleSeason`);
  if (res.data.stats.length > 0) {
    const data = res.data.stats[0].splits[0];
    const text = makePlayer({ stats: data.stat, season: data.season });
    return text;
  } else {
    return "No data found.";
  }
};

module.exports = {
  info,
  stats,
};