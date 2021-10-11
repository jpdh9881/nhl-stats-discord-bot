const axios = require("axios");
const { api } = require("../../../api_settings.js");
const { today, getDateRange } = require("./_lib/date_utility.js");
const { getIdFromAbbrev } = require("./_lib/teams/team_utility.js");
const makeSchedule = require("./_lib/schedule/makeSchedule.js");

const byDateAllTeams = async (date = today(true)) => {
  let res = await axios.get(`${api}schedule`, {
    params: {
      startDate: date,
      endDate: date,
    },
  });
  if (res.data.dates.length > 0) {
    const data = res.data.dates[0].games;
    return makeSchedule(data);
  } else {
    return "No games :(";
  }
};

const byDateTeam = async (teamCode, date = today(true)) => {
  const teamId = getIdFromAbbrev(teamCode.toUpperCase());

  let res = await axios.get(`${api}schedule`, {
    params: {
      teamId: teamId,
      startDate: date,
      endDate: date,
    },
  });

  if (res.data.dates.length > 0) {
    const data = res.data.dates[0].games;
    return makeSchedule(data);
  } else {
    return "No games :(";
  }
};

const byDateRangeTeam = async (teamCode, range = "currentMonth") => {
  const [dateStart, dateEnd] = getDateRange(range);
  const teamId = getIdFromAbbrev(teamCode.toUpperCase());

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
    return makeSchedule(data);
  } else {
    return "No games :(";
  }
};

const byTeamNext = async (teamCode) => {
  const [dateStart, dateEnd] = getDateRange("monthFromToday");
  const teamId = getIdFromAbbrev(teamCode.toUpperCase());

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
    return makeSchedule(next.games);
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