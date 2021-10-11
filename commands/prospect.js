const Command = require("./_lib/classes/Command.js");
const prospectAPI = require("./_lib/api_calls/prospect_api.js");

/**
 * (1 argument)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/draft/prospects/
 */
 const prospect = new Command("prospect");
 prospect.addRoute("{prospectId}", prospectAPI.info);

 module.exports = prospect;