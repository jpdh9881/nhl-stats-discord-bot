const axios = require("axios");

const player = async (arg1, arg2) => {
  if (arg1) {
    const playerId = arg1;
    if (arg2 === "stats") {
      // return stats
      const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason`);
      if (res.data.stats.length > 0) {
        const data = res.data.stats[0].splits[0];
        const info =
`
__Most Recent Season: ${data.season.substring(0, 4)} - ${data.season.substring(4)}__
**Goals**: ${data.stat.goals}
**Assists**: ${data.stat.assists}
**Points**: ${data.stat.points}
**Plus/Minus**: ${data.stat.plusMinus}
**Games**: ${data.stat.games}
**Time on Ice**: ${data.stat.timeOnIce}
**Time on Ice (avg)**: ${data.stat.timeOnIcePerGame}
**PIMs**: ${data.stat.pim}
**Hits**: ${data.stat.hits}
**Shooting %**: ${data.stat.shotPct}
`;
        return info;
      } else {
        return "No data found.";
      }
    } else {
      // no stats
      const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerId}`);
      if (res.data.people.length > 0) {
        const data = res.data.people[0];
        const info =
`
__${data.lastName}, ${data.firstName}__
**Birth Date**: ${data.birthDate} (${data.currentAge})
**Place of Birth**: ${data.birthCity}, ${data.birthCountry}
**Nationality**: ${data.nationality}
**Height**: ${data.height}
**Weight**: ${data.weight}lbs
**Number**: ${data.primaryNumber}
**Position**: ${data.primaryPosition.abbreviation}
**Shoots/Catches**: ${data.shootsCatches}
**Current Team**: ${data.currentTeam.name}
(player id: ${data.id})
`;
        return info;
      } else {
        return "No player found.";
      }
    }
  }
  return "Command: player arg1 arg2? (arg1 = player code, arg2 = info/stats)";
};

module.exports = player;