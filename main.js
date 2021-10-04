// Modules
require("dotenv").config();
const { Client, Intents } = require('discord.js')
const COMMAND_LABEL = require("./command_labels.js");
const verifyCommand = require("./commands/_verify_command.js");
const runCommand = require("./command_functions.js");
const createHelpMessage = require("./_lib/createHelpMessage.js");
const splitMessage = require("./_lib/splitMessage.js");

const ERROR_TAG = ":o";
const ERROR_FORMAT = "Something wrong with your command. Use the -help switch for help.";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('messageCreate', async message => {
  if (!message.author.bot) {
    const split = message.content.split(" ");
    const userCommand = split[0];
    const args = split.slice(1);

    let text;
    let helpCommand;
    try {
      switch(userCommand) {
        case COMMAND_LABEL["entryPoint"]: {
          const text = runCommand["entryPoint"]();
          await message.reply(text);
        } break;
        case COMMAND_LABEL["draft"]: {
          const valid = verifyCommand("draft", args);
          if (valid === "help") {
            helpCommand = "draft";
          } else if (valid) {
            text = await runCommand["draft"](...args);
          } else {
            throw new Error (ERROR_FORMAT);
          }
        } break;
        case COMMAND_LABEL["player"]: {
          const valid = verifyCommand("player", args);
          if (valid === "help") {
            helpCommand = "player";
          } else if (valid) {
            text = await runCommand["player"](...args);
          } else {
            throw new Error (ERROR_FORMAT);
          }
        } break;
        case COMMAND_LABEL["prospect"]: {
          const valid = verifyCommand("prospect", args);
          if (valid === "help") {
            helpCommand = "prospect";
          } else if (valid) {
            text = await runCommand["prospect"](...args);
          } else {
            throw new Error (ERROR_FORMAT);
          }
        } break;
        case COMMAND_LABEL["schedule"]: {
          const valid = verifyCommand("schedule", args);
          if (valid === "help") {
            helpCommand = "schedule";
          } else if (valid) {
            text = await runCommand["schedule"](...args);
          } else {
            throw new Error (ERROR_FORMAT);
          }
        } break;
        case COMMAND_LABEL["team"]: {
          const valid = verifyCommand("team", args);
          if (valid === "help") {
            helpCommand = "team";
          } else if (valid) {
            text = await runCommand["team"](...args);
          } else {
            throw new Error (ERROR_FORMAT);
          }
        } break;
        case COMMAND_LABEL["teams"]: {
          const text = await runCommand["teams"]();
          const texts = splitMessage(text);
          for (const piece of texts) {
            await message.reply(piece);
          }
        } break;
      }

      if (text) {
        const texts = splitMessage(text);
        for (const piece of texts) {
          await message.reply(piece);
        }
      } else if (helpCommand) {
        const help = createHelpMessage(helpCommand);
        await message.reply(help);
      }
    } catch (error) {
      console.log(error);
      await message.reply(ERROR_TAG + " - " + error);
    }
  }
})

client.login(process.env.TOKEN);