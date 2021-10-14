const Route = require("./Route.js");
const matchRoute = require("../match_route.js");
const commandRegister = require("../../../command_register.js");

/**
 * Command objects contain:
 *  - the internal identifier (id) of the command (as opposed to the label, which is what
 *    the user sees)
 *  - the routes which belong to the command
 *  - a help object, which a help method converts into a help message
 */
class Command {
  identifier = null;
  routes = [];
  help;

  // Instance methods
  constructor(identifier) {
    // This identifier will be mapped to a command label
    //  - label = what the user sees/uses
    //  - identifier = what the code sees/uses
    this.identifier = identifier;
    this.help = {
      description: [],
      examples: [],
    }

    // Set the default routes
    //  - these can be overriden by this.addRoute()
    this.routes.push(new Route(this.identifier, "", this.getHelp, "this help message"));
    this.routes.push(new Route(this.identifier, "-h", this.getHelp, "this help message"));
    this.routes.push(new Route(this.identifier, "-help", this.getHelp, "this help message"));

    console.log(` - created command "${this.identifier}"`);
  }

  getIdentifier = () => {
    return this.identifier;
  };
  matchRoute = (userArgs) => matchRoute(this.routes, userArgs);

  addRoute = (str, fn, help) => {
    const existingIndex = this.routes.findIndex(r => r.str === str);
    if (existingIndex > -1) {
      this.routes[existingIndex] = new Route(this.identifier, str, fn, help);
    } else {
      this.routes.push(new Route(this.identifier, str, fn, help));
    }
  };
  setHelp = ({description, examples}) => {
    if (description) {
      this.help.description = description;
    }
    if (examples) {
      this.help.examples = examples;
    }
  }
  getHelp = () => {
    const lbl = commandRegister.getLabelFromCommand(this.identifier)
    let help = "";
    if (this.routes.length > 0) {
      help += `"${lbl}" Command:\n`;
      this.routes.forEach(r => {
        if (r.getString() === "") {
          help += `  ${lbl} (none)\n`;
        } else {
          help += `  ${lbl} ${r.getString()}\n`;
        }
        if (r.getHelp()) {
          help += `  ${" ".repeat(lbl.length)} (${r.getHelp()})\n`;
        }
      });
    }
    if (this.help.description.length > 0) {
      help += "Description:\n";
      this.help.description.forEach(d => {
        help += `  ${d}\n`;
      });
    }
    if (this.help.examples.length > 0) {
      help += "Examples:\n";
      this.help.examples.forEach(e => {
        help += `  ${lbl} ${e}\n`;
      });
    }

    return help;
  }
}

module.exports = Command;