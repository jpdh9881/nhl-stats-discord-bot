const axios = require("axios");
const getTeams = require("./teams/getTeams.js");
const makeGame = require("./schedule/makeGame.js");
const makeSchedule = require("./schedule/makeSchedule.js");

const help =
  `\`\`\`` +
  `Command:\n` +
  `  ?schedule teamCode? date?\n` +
  `     teamCode: (optional) 3-letter teamCode\n` +
  `       (if absent: schedule for all teams)\n` +
  `     date: (optional) YYYY-MM-DD\n` +
  `       (if absent: today's date)\n` +
  `Help:\n` +
  `  ?schedule -help\n` +
  `Examples:\n` +
  `  ?schedule (today's games for all teams)\n` +
  `  ?schedule TOR (today's schedule for Toronto)\n` +
  `  ?schedule MTL 2021-10-28 (Montreal's schedule for Oct. 28, 2021)\n` +
  `\`\`\``;
const schedule = async (option1, option2) => {
  // Get team abbreviations
  const teamIdMap = await getTeams({ format: "id:abbrev", raw: true });

  let data = [];
  if (option1) {
    if (option1 === "-help") {
      return [ help ];
    } else if (option1.length === 3) {
      // option1 = team abbrev
      const teamAbbrev = option1.toUpperCase();
      const teamIdAbbrev = Object.entries(teamIdMap).find(([id, abbrev]) => abbrev.toUpperCase() === teamAbbrev);
      const teamId = teamIdAbbrev[0];

      if (option2) {
        // option2 = date
        const date = option2;
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
      // option1 = date
      const date = option1;
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