const axios = require("axios");
const api = require("../api.js").api;
const help = require("./map_help.js")["prospect"];
const makeProspect = require("./prospect/makeProspect");

const prospect = async (prospectId) => {
  const res = await axios.get(`${api}prospects/${prospectId}`);

  if (prospectId === "-help") {
    return help;
  }

  if (res.data.prospects[0]) {
    return makeProspect(res.data.prospects[0]);
  } else {
    return "Invalid prospect id";
  }
};

module.exports = prospect;