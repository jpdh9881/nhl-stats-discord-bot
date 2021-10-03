const axios = require("axios");
const makeProspect = require("./prospect/makeProspect");

const help =
  `\`\`\`` +
  `Command:\n` +
  `  ?prospect prospectId \n` +
  `     prospectId: the id of the prospect` +
  `Help:\n` +
  `  ?prospect -help\n` +
  `Examples:\n` +
  `  ?prospect 24111` +
  `\`\`\``;
const prospect = async (prospectId) => {
  const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/draft/prospects/${prospectId}`);

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