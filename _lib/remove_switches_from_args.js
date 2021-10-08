const removeSwitchesFromArgs = (args) => {
  const cleanedArgs = [];

  for (arg of args) {
    if (!arg.startsWith("-")) {
      cleanedArgs.push(arg);
    }
  }

  return cleanedArgs;
};

module.exports = removeSwitchesFromArgs;