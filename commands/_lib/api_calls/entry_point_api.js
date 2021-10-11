const commandRegister = require("../../../command_register.js");

const list = () => {
  return commandRegister.getCommandsList().join("\n") + "\n\nType \"? -help\" for general help.";
};

module.exports = {
  list,
};