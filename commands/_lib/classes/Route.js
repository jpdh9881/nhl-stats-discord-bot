class Route {
  str;
  arr;
  fn;
  help;

  constructor(str, fn, help = null) {
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

  run = (args) => {
    return this.fn(...args);
  };
}

module.exports = Route;