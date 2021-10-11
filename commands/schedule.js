const Command = require("./_lib/classes/Command.js");
const scheduleAPI = require("./_lib/api_calls/schedule_api.js");

/**
 * (1 argument)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/schedule
 */
const schedule = new Command("schedule");
schedule.addRoute("", scheduleAPI.byDateAllTeams);
schedule.addRoute("-today", scheduleAPI.byDateAllTeams);
schedule.addRoute("{teamCode}", scheduleAPI.byDateTeam);
schedule.addRoute("{teamCode} {YYYY-MM-DD}", scheduleAPI.byDateTeam);
schedule.addRoute("{teamCode} {YYYY-MM}", (teamCode, yearMonth) => scheduleAPI.byDateRangeTeam(teamCode, yearMonth));
schedule.addRoute("{teamCode} -today", scheduleAPI.byDateTeam);
schedule.addRoute("{teamCode} -next", (teamCode) => scheduleAPI.byTeamNext(teamCode));
schedule.addRoute("{teamCode} -month", (teamCode) => scheduleAPI.byDateRangeTeam(teamCode, "currentMonth"));
schedule.addRoute("{YYYY-MM-DD}", scheduleAPI.byDateAllTeams);

module.exports = schedule;