const Command = require("./_lib/classes/Command.js");
const entryPointAPI = require("./_lib/api_calls/entry_point.js");

const entryPoint = new Command("entryPoint");
entryPoint.addRoute("", entryPointAPI.help);

module.exports = entryPoint;