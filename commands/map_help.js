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