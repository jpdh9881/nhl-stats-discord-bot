const makeGame = (game) => {
  const teamIdMap = commandRegister.global.teams["id:teamCode"];
  const teamCodeHome = teamIdMap[game.teams.home.team.id];
  const teamCodeAway = teamIdMap[game.teams.away.team.id];
  const g = game;

  const date = (new Date(g.gameDate)).toLocaleDateString();
  const time = (new Date(g.gameDate)).toLocaleTimeString();
  const seasonSplit = `${g.season.substring(0, 4)} - ${g.season.substring(4)}`;

  const A_TM = g.teams.away.team.name ? g.teams.away.team.name : "";
  const A_SC = g.teams.away.score ? g.teams.away.score : "0";
  const A_W = g.teams.away.leagueRecord.wins ? g.teams.away.leagueRecord.wins : "0";
  const A_L = g.teams.away.leagueRecord.losses ? g.teams.away.leagueRecord.losses : "0";
  const A_OT = g.teams.away.leagueRecord.ot ? g.teams.away.leagueRecord.ot : "0";
  const H_TM = g.teams.home.team.name ? g.teams.home.team.name : "0";
  const H_SC = g.teams.home.score ? g.teams.home.score : "0";
  const H_W = g.teams.home.leagueRecord.wins ? g.teams.home.leagueRecord.wins : "0";
  const H_L = g.teams.home.leagueRecord.losses ? g.teams.home.leagueRecord.losses : "0";
  const H_OT = g.teams.home.leagueRecord.ot ? g.teams.home.leagueRecord.ot : "0";

  const V = g.venue.name? g.venue.name : "";

  const text =
    `${date} - ${time} (${seasonSplit} season)\n` +
    `  ${teamCodeAway} (${A_SC}) @ ${teamCodeHome} (${H_SC})\n` +
    `  ${A_TM}: W ${A_W}, L ${A_L}, OT ${A_OT}\n` +
    `  ${H_TM}: W ${H_W}, L ${H_L}, OT ${H_OT}\n` +
    `  Venue: ${V}`;

  return text;
};

module.exports = makeGame;