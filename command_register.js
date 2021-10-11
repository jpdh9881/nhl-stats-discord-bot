const entryPoint = require("./commands/entryPoint.js");
const draft = require("./commands/draft.js");
const player = require("./commands/player.js");
const prospect = require("./commands/prospect.js");
const schedule = require("./commands/schedule.js");
const team = require("./commands/team.js");
const teams = require("./commands/teams.js");

class CommandRegister {
  static commands = {
    // label: command
    //  - label: what the user types to access the command
    //  - command: a Command object

    "?": entryPoint,
    "?draft": draft,
    "?player": player,
    "?prospect": prospect,
    "?schedule": schedule,
    "?team": team,
    "?teams": teams,
  }

  static isCommand = (label) => {
    return CommandRegister.commands[label]? true : false;
  };
  static commandFromLabel = (label) => {
    return CommandRegister.commands[label];
  };
  static labelFromCommand = (commandId) => {
    const [label, command] = Object.entries(CommandRegister.commands).find(([lbl, cmd]) => cmd.getIdentifier() === commandId);
    return label;
  };
};

module.exports = CommandRegister;