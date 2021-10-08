const command = {
  // Format:
  //  [command identifier]: command label
  //    command identifier: what the command is referred to in the code
  //    command label: what the user types to access that command

  entryPoint: "?",

  draft: "?draft",
  player: "?player",
  prospect: "?prospect",
  schedule: "?schedule",
  team: "?team",
  teams: "?teams"
};

const isCommand = (cmd) => {
  if (commandFromLabel(cmd)) {
    return true;
  }
  return false;
};
const commandFromLabel = (lbl) => {
  const match = Object.entries(command).find(([c, l]) => l === lbl? true : false);
  return match? match[0] : undefined;
};
const labelFromCommand = (cmd) => {
  return command[cmd];
};

module.exports = {
  isCommand,
  commandFromLabel,
  labelFromCommand,
};