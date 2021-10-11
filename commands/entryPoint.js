const Command = require("./_lib/classes/Command.js");
const entryPointAPI = require("./_lib/api_calls/entry_point_api.js");

const entryPoint = new Command("entryPoint");
entryPoint.setHelp(
    "Description:\n" +
    "  Discord Bot serving up things from a public but officially-undocumented\n" +
    "  NHL API!\n" +
    "  Thanks to Drew Hynes for documenting the API.\n" +
    "    (Link: https://gitlab.com/dword4/nhlapi)\n" +
    "Commands:\n" +
    "  -list: list all the commands\n" +
    "  -help: show this help message\n" +
    "Help:\n" +
    "  Type 'command -help' for more info on each command\n"
);
entryPoint.addRoute("-list", entryPointAPI.list);

module.exports = entryPoint;