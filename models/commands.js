const verify = require("./_lib/verify_args.js");

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
 *            [else if argument has discrete values]
 *            "discrete_option1": {
 *                "arg2_name": {
 *                    ...etc.
 *                }
 *            },
 *            "discrete_option2": {
 *                "arg2_name": {
 *                    ...etc.
 *                }
 *            }
 *            ---
 *        }
 *    }
 * }
 *
 */

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
                descr: "the number of the round (default: 1)",
              },
            },
          },
          "-pick": {
            descr: "display the player selected nth overall",
            next: {
              "-option2": {
                verify: verify.draft.pick,
                descr: "the draft position (default: 1)",
              },
            },
          },
        },
      },
    },
  },
};

module.exports = {
  draft,
};