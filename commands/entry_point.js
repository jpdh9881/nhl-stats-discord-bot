const config = require("../models/commands").entryPoint;

const entryPoint = () => {
  return config.help;
};

module.exports = entryPoint;