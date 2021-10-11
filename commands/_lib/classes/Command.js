const Route = require("./Route.js");
const matchRoute = require("../match_route.js");
const commandRegister = require("../../../command_register.js");

class Command {
  identifier = null;
  routes = [];

  prototype = null;
  help = null;

  // Instance methods
  constructor(identifier) {
    // This identifier will be mapped to a command label
    //  - label = what the user sees/uses
    //  - identifier = what the code sees/uses
    this.identifier = identifier;

    // Set the default routes
    this.routes.push(new Route("", this.getHelp));
    this.routes.push(new Route("-h", this.getHelp));
    this.routes.push(new Route("-help", this.getHelp));
  }

  getIdentifier = () => {
    return this.identifier;
  };
  matchRoute = (userArgs) => matchRoute(this.routes, userArgs);

  addRoute = (str, fn) => {
    this.routes.push(new Route(str, fn));
  };
  setPrototype = (prototype) => {
    this.prototype = prototype;
  };
  setHelp = (help) => {
    this.help = help;
  }
  getHelp = () => {
    const commandLabel = commandRegister.getLabelFromCommand(this.identifier)
    return `${this.prototype? "Prototype: " + commandLabel + ' ' + this.prototype + "\n" : ""}${this.help}`;
  }
}

module.exports = Command;