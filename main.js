// Modules
require("dotenv").config();
const { Client, Intents } = require('discord.js')
const verifyCommand = require("./commands/_verify_command.js");
const COMMAND_LABEL = require("./command_labels.js");
const FN = require("./map_fn.js");
const splitMessage = require("./_lib/splitMessage.js");

const ERROR_TAG = "Umm, something went wrong. Try interpreting this cryptique message: ";

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

    try {
      switch(userCommand) {
        case COMMAND_LABEL["entryPoint"]: {
          const text = FN["entryPoint"]();
          await message.reply(text);
        } break;
        case COMMAND_LABEL["draft"]: {
          const valid = verifyCommand("draft", args);
          if (valid) {
            const text = await FN["draft"](...args);
            const texts = splitMessage(text);
            for (const piece of texts) {
              await message.reply(piece);
            }
          } else {
            await message.reply("Invalid command");
          }
        } break;
        case COMMAND_LABEL["player"]: {
          const text = await FN["player"](...args);
          const texts = splitMessage(text);
          for (const piece of texts) {
            await message.reply(piece);
          }
        } break;
        case COMMAND_LABEL["prospect"]: {
          const text = await FN["prospect"](...args);
          const texts = splitMessage(text);
          for (const piece of texts) {
            await message.reply(piece);
          }
        } break;
        case COMMAND_LABEL["schedule"]: {
          const text = await FN["schedule"](...args);
          const texts = splitMessage(text);
          for (const piece of texts) {
            await message.reply(piece);
          }
        } break;
        case COMMAND_LABEL["team"]: {
          const text = await FN["team"](...args);
          const texts = splitMessage(text);
          for (const piece of texts) {
            await message.reply(piece);
          }
        } break;
        case COMMAND_LABEL["teams"]: {
          const text = await FN["teams"]();
          const texts = splitMessage(text);
          for (const piece of texts) {
            await message.reply(piece);
          }
        } break;
      }
    } catch (error) {
      console.log(error);
      await message.reply(ERROR_TAG + " - " + error);
    }
  }
})

client.login(process.env.TOKEN);