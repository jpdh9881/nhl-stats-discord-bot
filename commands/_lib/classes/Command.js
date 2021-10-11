const Route = require("./Route.js");
const matchRoute = require("../match_route.js");

class Command {
  identifier = null;
  routes = [];

  prototype = null;
  help = null;

  // Instance methods
  constructor(identifier) {
    this.identifier = identifier;
  }

  getIdentifier = () => {
    return this.identifier;
  };
  getHelp = () => {
    return this.help;
  }
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
}

module.exports = Command;