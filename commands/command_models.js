const COMMAND_LABELS = require("../command_labels.js");
const verify = require("./_lib/arg_type_verification.js");

// Format for commands
/**
 *
 * const command_identifier = {
 *    next: {
 *        "arg1_name": {
 *            descr: "description for user",
 *            ---
 *            [if argument requires a verification function]
 *            verify: verification_function,
 *            next: {
 *                "arg2_name": {
 *                    ...etc.
 *                }
 *            }
 *            [else if argument has several verification functions]
 *            "option1": {
 *              verify: ...
 *              descr: ...
 *              next: ...
 *            },
 *            "option2": {
 *              verify: ...
 *            }
 *            [else if argument has discrete/switch values (options preceded by "-")]
 *            "-option1": {
 *                "arg2_name": {
 *                    ...etc.
 *                }
 *            },
 *            "-option2": {
 *                "arg2_name": {
 *                    ...etc.
 *                }
 *            }
 *            ---
 *        }
 *    },
 *    // for generating the help message
 *    help: {
 *        note?: "...note",
 *        examples: [ "", "", etc. ],
 *    }
 * }
 *
 * Notes: all argument labels at the same level should have the same name (i.e.
 *  arg2_name above should have the same label; otherwise, the help message
 *  won't be generated correctly)
 *
 */

const entryPoint = {
  help:
    "```" +
    "Description:\n" +
    "  Discord Bot serving up things from a public but officially-undocumented\n" +
    "  NHL API!\n" +
    "  Thank you to Drew Hynes for documenting the API.\n" +
    "    (Link: https://gitlab.com/dword4/nhlapi)\n" +
    "Commands:\n" +
    "  " + Object.values(COMMAND_LABELS).join("\n  ") +
    "\nHelp:\n" +
    "  Type 'command -help' for more info on each command\n" +
    "    (some commands don't have -help messages)" +
    "```",
};

const draft = {
  next: {
    "draftYear": {
      descr: "an NHL Draft year",
      verify: verify.draft.year,
      next: {
        "-option1": {
          // - no first class verify function: option must be either "-round" or "-pick"
          "-round": {
            descr: "display all players selected in a particular round",
            next: {
              "-option2": {
                verify: verify.draft.round,
                descr: "(default: 1) the number of the round",
              },
            },
          },
          "-pick": {
            descr: "display the player selected nth overall",
            next: {
              "-option2": {
                verify: verify.draft.pick,
                descr: "(default: 1) the draft position",
              },
            },
          },
        },
      },
    },
  },
  help: {
    note: "# of rounds and # of players drafted can change year to year!",
    examples: [
      "2010 -round 5",
      "2021 -pick 124",
    ],
  }
};

const player = {
  next: {
    "playerId": {
      descr: "the id of the player",
      verify: verify.player.id,
      next: {
        "-option1": {
          [undefined]: {
            descr: "equivalent to -info",
          },
          "-info": {
            descr: "get general information related to the player",
          },
          "-stats": {
            descr: "get the player's statistics for the most recent season",
          },
        },
      },
    }
  },
  help: {
    examples: [
      "8477939 -info",
      "8477939 -stats",
    ],
  },
};

const prospect = {
  next: {
    "prospectId": {
      descr: "the id of the prospect",
      verify: verify.player.id,
    },
  },
  help: {
    examples: [
      "24111",
    ],
  },
};

const schedule = {
  next: {
    "option1": {
      [undefined]: {
        descr: "today's schedule for all teams"
      },
      "teamCode": {
        descr: "3-letter team code",
        verify: verify.team.teamCode,
        next: {
          "+ option2": {
            [undefined]: {
              descr: "(today's date)"
            },
            date: {
              descr: "YYYY-MM-DD",
              verify: verify.schedule.YYYY_MM_DD,
            },
          },
        },
      },
      "date": {
        descr: "YYYY-MM-DD",
        verify: verify.schedule.YYYY_MM_DD,
      },
    },
  },
  help: {
    examples: [
      "",
      "2021-10-29",
      "TOR",
      "TOR 2021-10-28",
    ],
  },
};

const team = {
  next: {
    teamCode: {
      descr: "3-letter team code",
      verify: verify.team.teamCode,
      next: {
        "-option1": {
          [undefined]: {
            descr: "equivalent to -info",
          },
          "-info": {
            descr: "general info about the team",
          },
          "-roster": {
            descr: "the team's current roster",
          },
          "-stats": {
            descr: "team stats for the most current year",
          },
        },
      },
    },
  },
  help: {
    examples: [
      "TOR",
      "TOR -stats",
      "TOR -roster",
    ],
  },
};

const teams = {
  // no arguments for teams command
};

module.exports = {
  entryPoint,
  draft,
  player,
  prospect,
  schedule,
  team,
  teams,
};