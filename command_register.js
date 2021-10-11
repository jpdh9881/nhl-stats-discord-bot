const getTeams = require("./commands/_lib/api_calls/_lib/teams/getTeams.js");

class CommandRegister {
  commands = {};
  global = {
    teams: {},
  };

  init = async () => {
    // Get the team map (id:teamCode) so we don't have to continually re-fetch it
    this.global.teams["id:teamCode"] = await getTeams({ format: "id:teamCode", raw: true });

    // Initialize the commands
    //  - putting the *requires* here gets around a circular dependency thing I don't understand yet
    this.commands = {
      // label: command
      //  - label: what the user types to access the command
      //  - command: a Command object

      "?": require("./commands/entryPoint.js"),
      "?draft": require("./commands/draft.js"),
      "?player": require("./commands/player.js"),
      "?prospect": require("./commands/prospect.js"),
      "?schedule": require("./commands/schedule.js"),
      "?team": require("./commands/team.js"),
      "?teams": require("./commands/teams.js"),
    };
  };

  isCommand = (label) => {
    return this.commands[label]? true : false;
  };
  getCommandsList = () => {
    return Object.keys(this.commands);
  };
  getCommandFromLabel = (label) => {
    return this.commands[label];
  };
  getLabelFromCommand = (commandId) => {
    const [label, command] = Object.entries(this.commands).find(([lbl, cmd]) => cmd.getIdentifier() === commandId);
    return label;
  };
};

module.exports = new CommandRegister ();