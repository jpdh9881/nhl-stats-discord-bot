const axios = require("axios");
const api = require("../../../api_settings.js").api;
const makeProspect = require("./_lib/prospect/makeProspect");

const info = async (prospectId) => {
  try {
    const res = await axios.get(`${api}draft/prospects/${prospectId}`);
    if (res.data.prospects[0]) {
      return makeProspect(res.data.prospects[0]);
    } else {
      throw "";
    }
  } catch (e) {
    return "Prospect not found";
  }
};

module.exports = {
  info
};