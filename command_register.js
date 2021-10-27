const getTeams = require("./commands/_lib/api_calls/_lib/teams/getTeams.js");

/**
 * Where all commands are registered and made available to the bot
 * - this module exports an instantiated CommandRegister object
 */
class CommandRegister {
  commands = {};
  global = {
    teams: {},
  };

  /**
   * (Constructors cannot be async)
   * Having an init() method helps get around a circular dependency issue re: modules
   *  plus allows for asynchronously initializing global variables
   */
  init = async () => {
    console.log("Registering commands...");

    // Get the team map (id:teamCode) so we don't have to continually re-fetch it
    this.global.teams["id:teamCode"] = await getTeams({ format: "id:teamCode", raw: true });

    // Initialize the commands
    //  - putting the *requires* here (instead of at top of page) gets around a circular
    //    dependency thing
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
    console.log("Commands registered.");

    // Code to console.log all routes

    // Object.entries(this.commands).forEach(([lbl, cmd]) => {
    //   cmd.routes.forEach(r => {
    //     console.log(lbl + " " + r.getString());
    //   });
    // });
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