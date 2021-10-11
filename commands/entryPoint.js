const Command = require("./_lib/classes/Command.js");
const entryPointAPI = require("./_lib/api_calls/entry_point_api.js");

const entryPoint = new Command("entryPoint");
entryPoint.addRoute("-list", entryPointAPI.list);
entryPoint.setHelp({
  description: [
    "Discord Bot serving up things from a public but officially-undocumented\n" +
    "NHL API!\n" +
    "Thanks to Drew Hynes for documenting the API.\n" +
    "  (Link: https://gitlab.com/dword4/nhlapi)\n"
  ],
});

module.exports = entryPoint;