class Command {
  identifier;
  routes = {};
  prototype;

  constructor(identifier) {
    this.identifier = identifier;
  }

  getIdentifier = () => {
    return this.identifier;
  };
  getRoutes = () => {
    return this.routes;
  };
  runRoute = (route, args) => {
    return this.routes[route](...args);
  };

  addRouteAndFunction = (route, fn) => {
    this.routes[route] = fn;
  };
  setPrototype = (prototype) => {
    this.prototype = prototype;
  };
}

module.exports = Command;