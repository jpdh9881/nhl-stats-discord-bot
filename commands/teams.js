const teamsQuery = require("../helpers/teams.js");

/**
 *
 * @param {object} param0 format
 * @returns
 */
const teams = async () => {
  return teamsQuery({
    format: "abbrev:name",
    raw: false,
  });
};

module.exports = teams;