const getTeams = require("./_lib/teams/getTeams.js");

const teamList = async () => {
  return getTeams({
    format: "abbrev:name",
    raw: false,
  });
};

module.exports = {
  teamList,
};