/**
 * Routes have
 *  - the command it belongs to (commandId)
 *  - a string which defines the arguments
 *  - a function which is called when the route is matched
 *  - a help message, which explains/describes the route string
 */
class Route {
  commandId;
  str;
  arr;
  fn;
  help;

  constructor(commandId, str, fn, help = null) {
    this.commandId = commandId;
    this.str = str;
    this.arr = str.split(" ");
    this.fn = fn;
    this.help = help;
  }

  getString = () => {
    return this.str;
  }
  getArray = () => {
    return this.arr;
  }
  getArg = (index) => {
    return this.arr[index];
  }
  getHelp = () => {
    return this.help;
  }
  length = () => {
    return this.arr.length;
  }

  run = (argsCleaned, argsFull) => {
    console.log(` >>> Running Route "_${this.commandId} ${this.getString()}" - "_${this.commandId} ${argsFull.join(" ")}"`);
    return this.fn(...argsCleaned);
  };
}

module.exports = Route;