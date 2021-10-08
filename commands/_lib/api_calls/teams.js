const getTeams = require("./_lib/teams/getTeams.js");

/**
 *
 * @param {object} param0 format
 * @returns
 */
const teams = async () => {
  return getTeams({
    format: "abbrev:name",
    raw: false,
  });
};

module.exports = teams;