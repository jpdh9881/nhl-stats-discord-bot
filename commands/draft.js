const Command = require("./_lib/classes/Command.js");
const draftAPI = require("./_lib/api_calls/draft_api.js");
const entryPoint = require("./entryPoint.js");

/**
 * (2 arguments)
 * Endpoint: https://statsapi.web.nhl.com/api/v1/draft
 * Endpoint: https://statsapi.web.nhl.com/api/v1/draft/prospects/
 */
const draft = new Command("draft");
draft.addRoute("{draftYear} -round", draftAPI.round, "first-round draft picks from given year");
draft.addRoute("{draftYear} -round {roundNum}", draftAPI.round, "draft picks from given year for given round");
draft.addRoute("{draftYear} -pick", draftAPI.pick, "first-overall draft pick from given year");
draft.addRoute("{draftYear} -pick {pickNum}", draftAPI.pick, "nth-overall draft pick from given year");
draft.setHelp({
  description: [
    "{draftYear}: YYYY",
    "{roundNum}: 1 - 7 for modern drafts",
    "  (earlier drafts could have more than 7 rounds)",
    "{pickNum}: 1 - whatever the last overall pick is in the given year"
  ],
  examples: [
    "2010 -round 5",
    "2021 -pick 124",
  ],
});

module.exports = draft;