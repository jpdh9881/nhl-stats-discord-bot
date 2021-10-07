const config = require("../maps/command_models").entryPoint;

const entryPoint = () => {
  return config.help;
};

module.exports = entryPoint;