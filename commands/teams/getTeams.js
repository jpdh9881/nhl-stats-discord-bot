const axios = require("axios");
const api = require("../../api.js").api;

/**
 *
 * @param {object} param0 format = "abbrev:id"/"id:abbrev"/"abbrev:name", raw = true/false
 * @returns
 */
const getTeams = async ({ format, raw }) => {
  let res = await axios.get(`${api}teams`);

  const teams = {};
  res.data.teams.forEach(team => {
    switch(format) {
      case "abbrev:id":
        teams[team.abbreviation] = team.id;
        break;
      case "id:abbrev":
        teams[team.id] = team.abbreviation;
        break;
      default:
        // "abbrev:name"
        teams[team.abbreviation] = team.name;
    };
  });

  if (raw) {
    // Just return the object
    return teams;
  } else {
    // Make it nice
    const arr = Object.entries(teams).sort((a, b) => (a > b) - (a < b)); // sorting help from here: https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values
    let text = "```";
    arr.forEach(([key, value]) => {
      text += `${key}: ${value}\n`;
    });
    text += "(teamCode: teamName)```";
    return text;
  }
};

module.exports = getTeams;