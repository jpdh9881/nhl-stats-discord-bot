const makeRound = (picks, draftYear, roundNum, teamIdMap) => {
  const text = [
    `\`\`\`${draftYear} NHL Draft - Round ${roundNum}\n`,
    "```",
  ];
  picks.forEach((p, i) => {
    const teamCode = teamIdMap[p.team.id];
    if (i <= Math.floor(picks.length / 2)) {
      text[0] += `  ${p.pickOverall} overall (R${p.round}-${p.pickInRound}) - ${teamCode} - ${p.prospect.fullName} (prospect id: ${p.prospect.id})\n`;
    } else {
      text[1] += `  ${p.pickOverall} overall (R${p.round}-${p.pickInRound}) - ${teamCode} - ${p.prospect.fullName} (prospect id: ${p.prospect.id})\n`;
    }
  });

  text[0] += "```";
  text[1] += "```";

  return text;
};

module.exports = makeRound;