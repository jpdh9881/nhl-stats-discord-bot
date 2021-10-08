const axios = require("axios");
const dateFormat = require("dateformat");

const { api } = require("../../../api_settings.js");
const { today, getDateRange } = require("./_lib/utility.js");
const getTeams = require("./_lib/teams/getTeams.js");
const makeSchedule = require("./_lib/schedule/makeSchedule.js");

const byDateAllTeams = async (date = today()) => {
  // Get team abbreviations
  const teamIdMap = await getTeams({ format: "id:abbrev", raw: true });

  let res = await axios.get(`${api}schedule`, {
    params: {
      startDate: date,
      endDate: date,
    },
  });
  if (res.data.dates.length > 0) {
    const data = res.data.dates[0].games;
    return makeSchedule(data, teamIdMap);
  } else {
    return "No games :(";
  }


};

const byDateTeam = async (teamCode, date = today()) => {
  // Get team abbreviations
  const teamIdMap = await getTeams({ format: "id:abbrev", raw: true });

  const teamAbbrev = teamCode.toUpperCase();
  const teamIdAbbrev = Object.entries(teamIdMap).find(([id, abbrev]) => abbrev.toUpperCase() === teamAbbrev);
  const teamId = teamIdAbbrev[0];

  let res = await axios.get(`${api}schedule`, {
    params: {
      teamId: teamId,
      startDate: date,
      endDate: date,
    },
  });

  if (res.data.dates.length > 0) {
    const data = res.data.dates[0].games;
    return makeSchedule(data, teamIdMap);
  } else {
    return "No games :(";
  }
};

const byDateRangeTeam = async (teamCode, range = "month") => {
  const [dateStart, dateEnd] = getDateRange(range);

  // Get team abbreviations
  const teamIdMap = await getTeams({ format: "id:abbrev", raw: true });

  const teamAbbrev = teamCode.toUpperCase();
  const teamIdAbbrev = Object.entries(teamIdMap).find(([id, abbrev]) => abbrev.toUpperCase() === teamAbbrev);
  const teamId = teamIdAbbrev[0];

  let res = await axios.get(`${api}schedule`, {
    params: {
      teamId: teamId,
      startDate: dateStart,
      endDate: dateEnd,
    },
  });

  if (res.data.dates.length > 0) {
    let data = [];
    const gamesArrays = res.data.dates.map(d => d.games);
    data = data.concat(...gamesArrays);
    return makeSchedule(data, teamIdMap);
  } else {
    return "No games :(";
  }
};

const byTeamNext = async (teamCode) => {
  const [dateStart, dateEnd] = getDateRange("custom");

  console.log(dateStart, dateEnd);

  // Get team abbreviations
  const teamIdMap = await getTeams({ format: "id:abbrev", raw: true });

  const teamAbbrev = teamCode.toUpperCase();
  const teamIdAbbrev = Object.entries(teamIdMap).find(([id, abbrev]) => abbrev.toUpperCase() === teamAbbrev);
  const teamId = teamIdAbbrev[0];

  let res = await axios.get(`${api}schedule`, {
    params: {
      teamId: teamId,
      startDate: dateStart,
      endDate: dateEnd,
    },
  });

  const todayFormatted = today(true);
  const next = res.data.dates.find(gm => gm.date > todayFormatted);
  if (next) {
    return makeSchedule(next.games, teamIdMap);
  } else {
    return "No game within the next month :(";
  }
}

module.exports = {
  byDateAllTeams,
  byDateTeam,
  byDateRangeTeam,
  byTeamNext,
};