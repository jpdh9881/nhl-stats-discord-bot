const makeRoster = (roster) => {

  let players = "";
  roster.forEach(pl => {
    players += `${pl.jerseyNumber? pl.jerseyNumber : "??"} - ${pl.position.abbreviation} - ${pl.person.fullName} (player id: ${pl.person.id})\n`;
  });

  const text =
    `\`\`\`` +
    `${players}` +
    `\`\`\``;
  return text;
};

module.exports = makeRoster;