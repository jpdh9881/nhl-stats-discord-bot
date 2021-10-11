const Command = require("./_lib/classes/Command.js");
const draftAPI = require("./_lib/api_calls/draft.js");

/**
 * (2 arguments)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/draft
 * Endpoint: https://statsapi.web.nhl.com/api/v1/draft/prospects/
 */
 const draft = new Command("draft");
 draft.addRoute("", draftAPI.round);
 draft.addRoute("{draftYear} -round", draftAPI.round);
 draft.addRoute("{draftYear} -round {roundNum}", draftAPI.round);
 draft.addRoute("{draftYear} -pick", draftAPI.pick);
 draft.addRoute("{draftYear} -pick {pickNum}", draftAPI.pick);

 module.exports = draft;