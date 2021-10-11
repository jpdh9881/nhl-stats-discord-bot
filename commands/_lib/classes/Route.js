class Route {
  str;
  arr;
  fn;

  constructor(str, fn) {
    this.str = str;
    this.arr = str.split(" ");
    this.fn = fn;
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
  length = () => {
    return this.arr.length;
  }

  run = (args) => {
    return this.fn(...args);
  };
}

module.exports = Route;