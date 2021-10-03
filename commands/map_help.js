const help = {
  draft:
    `\`\`\`` +
    `Command:\n` +
    `  ?draft draftYear -option1 -option2\n` +
    `    draftYear: an NHL Draft Year\n` +
    `    -option1: -round, -pick\n` +
    `      1) -round: display all players selected in a particular round\n` +
    `        -option2 becomes the number of the round (default: 1)\n` +
    `      2) -pick: display the player selected nth overall\n` +
    `        -option2 becomes the draft position (default: 1)\n` +
    `Help:` +
    `  ?draft -help` +
    `Note:\n` +
    `  # of rounds and # of players drafted changes year to year!\n` +
    `Examples:\n` +
    `  ?draft 2010 -round 5\n` +
    `  ?draft 2021 -pick 124\n` +
    `\`\`\``,
  player:
    `\`\`\`` +
    `Command: ?player playerId -option1\n` +
    `           playerId: the id of the player\n` +
    `           -option1: -info, -stats\n` +
    `             1) -info: (default) get general information related to the player\n` +
    `             2) -stats: get the player's statistics for the most recent season\n` +
    `Help:\n` +
    `  ?player -help\n` +
    `Examples:\n` +
    `  ?player 8477939 -info\n` +
    `  ?player 8477939 -stats\n` +
    `\`\`\``,
  prospect:
    `\`\`\`` +
    `Command:\n` +
    `  ?prospect prospectId \n` +
    `     prospectId: the id of the prospect` +
    `Help:\n` +
    `  ?prospect -help\n` +
    `Examples:\n` +
    `  ?prospect 24111` +
    `\`\`\``,
  schedule:
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
    `\`\`\``,
  team:
    `\`\`\`` +
    `Command:\n` +
    `  ?team teamCode -option1?\n` +
    `     teamCode: (optional) 3-letter teamCode\n` +
    `     -option1: -roster, -stats, -info (default)` +
    `Help:\n` +
    `  ?team -help\n` +
    `Examples:\n` +
    `  ?team TOR -roster` +
    `  ?team NSH -stats` +
    `  ?team WSH` +
    `\`\`\``,
  teams: null,
};

module.exports = help;