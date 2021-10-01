const axios = require("axios");
const getTeams = require("./teams/getTeams.js");
const makeGame = require("./schedule/makeGame.js");
const makeSchedule = require("./schedule/makeSchedule.js");

const schedule = async (arg1, arg2) => {
  // Get team abbreviations
  const teamIdMap = await getTeams({ format: "id:abbrev", raw: true });

  let data = [];
  if (arg1) {
    if (arg1.length === 3) {
      // arg1 = team abbrev
      const teamAbbrev = arg1.toUpperCase();
      const teamIdAbbrev = Object.entries(teamIdMap).find(([id, abbrev]) => abbrev.toUpperCase() === teamAbbrev);
      const teamId = teamIdAbbrev[0];

      if (arg2) {
        // arg2 = date
        const date = arg2;
        let res = await axios.get("https://statsapi.web.nhl.com/api/v1/schedule", {
          params: {
            teamId: teamId,
            startDate: date,
            endDate: date,
          },
        });
        if (res.data.dates.length > 0) {
          data = res.data.dates[0].games;
        }
      } else {
        // no arg 2
        let res = await axios.get("https://statsapi.web.nhl.com/api/v1/schedule", {
          params: {
            teamId: teamId,
          },
        });
        if (res.data.dates.length > 0) {
          data = res.data.dates[0].games;
        }
      }
    } else {
      // arg1 = date
      const date = arg1;
      let res = await axios.get("https://statsapi.web.nhl.com/api/v1/schedule", {
        params: {
          startDate: date,
          endDate: date,
        },
      });
      if (res.data.dates.length > 0) {
        data = res.data.dates[0].games;
      }
    }
  } else {
    // assume today's date
    let res = await axios.get("https://statsapi.web.nhl.com/api/v1/schedule");
    if (res.data.dates.length > 0) {
      data = res.data.dates[0].games;
    }
  }

  // Package it up nice
  let games = [];
  data.forEach(game => {
    games.push(makeGame(game, teamIdMap[game.teams.home.team.id], teamIdMap[game.teams.away.team.id]));
  });
  const schedule = makeSchedule(games);
  return schedule;
};

module.exports = schedule;