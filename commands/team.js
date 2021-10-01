const axios = require("axios");
const getTeams = require("./teams/getTeams.js");

const team = async (arg1, arg2) => {
  // Get team ID
  const teamIdMap = await getTeams({ format: "abbrev:id", raw: true });
  const teamId = teamIdMap[arg1.toUpperCase()];

  if (arg2 === "roster") {
    const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster`);
    const data = res.data.roster.sort((a, b) => (parseInt(a.jerseyNumber) > parseInt(b.jerseyNumber)) - (parseInt(a.jerseyNumber) < parseInt(b.jerseyNumber)));
    let info = "";
    data.forEach(player => {
      info += `${player.jerseyNumber? player.jerseyNumber : "??"} - ${player.position.abbreviation} - ${player.person.fullName} (id: ${player.person.id})\n`;
    });
    return info;
  } else if (arg2 === "stats") {
    const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}/stats`);
    const data = res.data.stats[0]?.splits?.[0]?.stat;
    let info = "";
    if (data) {
      info =
`
**Games Played**: ${data.gamesPlayed}
**Wins**: ${data.wins}
**Losses**: ${data.losses}
**OT**: ${data.ot}
**Points**: ${data.pts}
**Points %**: ${data.ptPctg}
`;
    } else {
      console.log(data);
      info =
`
**Games Played**: none
**Wins**: none
**Losses**: none
**OT**: none
**Points**: none
**Points %**: none
`;
    }
    return info;
  } else {
    const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}`);
    const data = res.data.teams?.[0];
    const info =
      `
__${data.name} (${data.firstYearOfPlay} - now)__
**Division**: ${data.division.name}
**Conference**: ${data.conference.name}
**Home Arena**: ${data.venue.name}
**Official Website**: ${data.officialSiteUrl}
    `;
    return info;
  }
};

module.exports = team;