const Command = require("./_lib/classes/Command.js");
const scheduleAPI = require("./_lib/api_calls/schedule_api.js");

/**
 * (1 argument)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/schedule
 */
const schedule = new Command("schedule");
schedule.addRoute("", scheduleAPI.byDateAllTeams, "all teams schedule for current day");
schedule.addRoute("-today", scheduleAPI.byDateAllTeams, "all teams schedule for current day");
schedule.addRoute("{YYYY-MM-DD}", scheduleAPI.byDateAllTeams, "all teams schedule for given day");
schedule.addRoute("{teamCode}", scheduleAPI.byDateTeam, "given team's schedule for current day");
schedule.addRoute("{teamCode} {YYYY-MM-DD}", scheduleAPI.byDateTeam, "given team's schedule for given date");
schedule.addRoute("{teamCode} {YYYY-MM}", (teamCode, yearMonth) => scheduleAPI.byDateRangeTeam(teamCode, yearMonth), "given team's schedule for given month");
schedule.addRoute("{teamCode} -next", (teamCode) => scheduleAPI.byTeamNext(teamCode, "monthFromToday"), "given team's next game");
schedule.addRoute("{teamCode} -today", scheduleAPI.byDateTeam, "given team's schedule for current day");
schedule.addRoute("{teamCode} -month", (teamCode) => scheduleAPI.byDateRangeTeam(teamCode, "currentMonth"), "given team's schedule for current month");

schedule.setHelp({
  description: [
    "{teamCode}: three-letter team code",
    "  (type \"?teams -list\" for a list of team codes)",
  ],
  examples: [
    "-today",
    "TOR",
    "TOR 2021-10-28",
    "TOR -today",
    "2021-10-29",
  ],
});

module.exports = schedule;