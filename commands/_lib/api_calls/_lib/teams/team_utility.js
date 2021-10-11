const commandRegister = require("../../../../../command_register.js");

const getIdFromAbbrev = (abbrev) => {
  const teamMap = commandRegister.global.teams["id:teamCode"];

  const teamAbbrev = abbrev.toUpperCase();
  const teamIdAbbrev = Object.entries(teamMap).find(([id, abbrev]) => abbrev.toUpperCase() === teamAbbrev);
  const teamId = teamIdAbbrev[0];

  return teamId;
};

const getAbbrevFromId = (id) => {
  const teamMap = commandRegister.global.teams["id:teamCode"];
  const teamId = teamMap[teamCode.toUpperCase()];

  return teamId;
};

module.exports = {
  getIdFromAbbrev,
  getAbbrevFromId,
};