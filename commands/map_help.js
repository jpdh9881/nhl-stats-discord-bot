const COMMAND_MAP = require("../command_labels.js");

const help = {
  entryPoint:
    `\`\`\`` +
    `Commands:\n` +
    `  ${Object.values(COMMAND_MAP).join("\n  ")}\n` +
    `Help:\n` +
    `  Type "command -help" for more info on each command\n` +
    `    (commands without options don't have -help docs)` +
    `\`\`\``,

  draft:
    `\`\`\`` +
    `Command:\n` +
    `  ${COMMAND_MAP["draft"]} draftYear -option1 -option2\n` +
    `    draftYear: an NHL Draft Year\n` +
    `    -option1: -round, -pick\n` +
    `      1) -round: display all players selected in a particular round\n` +
    `        -option2 becomes the number of the round (default: 1)\n` +
    `      2) -pick: display the player selected nth overall\n` +
    `        -option2 becomes the draft position (default: 1)\n` +
    `Help:` +
    `  ${COMMAND_MAP["draft"]} -help` +
    `Note:\n` +
    `  # of rounds and # of players drafted can change year to year!\n` +
    `Examples:\n` +
    `  ${COMMAND_MAP["draft"]} 2010 -round 5\n` +
    `  ${COMMAND_MAP["draft"]} 2021 -pick 124\n` +
    `\`\`\``,

  player:
    `\`\`\`` +
    `Command: ${COMMAND_MAP["player"]} playerId -option1\n` +
    `           playerId: the id of the player\n` +
    `           -option1: -info, -stats\n` +
    `             1) -info: (default) get general information related to the player\n` +
    `             2) -stats: get the player's statistics for the most recent season\n` +
    `Help:\n` +
    `  ${COMMAND_MAP["player"]} -help\n` +
    `Examples:\n` +
    `  ${COMMAND_MAP["player"]} 8477939 -info\n` +
    `  ${COMMAND_MAP["player"]} 8477939 -stats\n` +
    `\`\`\``,

  prospect:
    `\`\`\`` +
    `Command:\n` +
    `  ${COMMAND_MAP["prospect"]} prospectId \n` +
    `     prospectId: the id of the prospect` +
    `Help:\n` +
    `  ${COMMAND_MAP["prospect"]} -help\n` +
    `Examples:\n` +
    `  ${COMMAND_MAP["prospect"]} 24111` +
    `\`\`\``,

  schedule:
    `\`\`\`` +
    `Command:\n` +
    `  ${COMMAND_MAP["schedule"]} teamCode? date?\n` +
    `     teamCode: (optional) 3-letter teamCode\n` +
    `       (if absent: schedule for all teams)\n` +
    `     date: (optional) YYYY-MM-DD\n` +
    `       (if absent: today's date)\n` +
    `Help:\n` +
    `  ${COMMAND_MAP["schedule"]} -help\n` +
    `Examples:\n` +
    `  ${COMMAND_MAP["schedule"]} (today's games for all teams)\n` +
    `  ${COMMAND_MAP["schedule"]} TOR (today's schedule for Toronto)\n` +
    `  ${COMMAND_MAP["schedule"]} MTL 2021-10-28 (Montreal's schedule for Oct. 28, 2021)\n` +
    `\`\`\``,

  team:
    `\`\`\`` +
    `Command:\n` +
    `  ${COMMAND_MAP["team"]} teamCode -option1?\n` +
    `     teamCode: (optional) 3-letter teamCode\n` +
    `     -option1: -roster, -stats, -info (default)` +
    `Help:\n` +
    `  ${COMMAND_MAP["team"]} -help\n` +
    `Examples:\n` +
    `  ${COMMAND_MAP["team"]} TOR -roster\n` +
    `  ${COMMAND_MAP["team"]} NSH -stats\n` +
    `  ${COMMAND_MAP["team"]} WSH` +
    `\`\`\``,

  teams: null,
};

module.exports = help;