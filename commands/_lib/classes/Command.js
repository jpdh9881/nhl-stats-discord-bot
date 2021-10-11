const Route = require("./Route.js");
const matchRoute = require("../match_route.js");

class Command {
  identifier;
  routes = [];
  prototype;

  // Instance methods
  constructor(identifier) {
    this.identifier = identifier;
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
}

module.exports = Command;