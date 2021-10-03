// Modules
require("dotenv").config();
const { Client, Intents } = require('discord.js')
const COMMAND = require("./map_command.js");
const FN = require("./map_fn.js");

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
        case COMMAND["entryPoint"]: {
          const text = FN["entryPoint"]();
          await message.reply(text);
        } break;
        case COMMAND["draft"]: {
          const text = await FN["draft"](...args);
          if (Array.isArray(text)) {
            await message.reply(text[0]);
            await message.reply(text[1]);
          } else {
            await message.reply(text);
          }
        } break;
        case COMMAND["player"]: {
          const text = await FN["player"](...args);
          await message.reply(text);
        } break;
        case COMMAND["prospect"]: {
          const text = await FN["prospect"](...args);
          await message.reply(text);
        } break;
        case COMMAND["schedule"]: {
          const schedule = await FN["schedule"](...args);
          for (const piece of schedule) {
            await message.reply(piece);
          }
        } break;
        case COMMAND["team"]: {
          const text = await FN["team"](...args);
          if (Array.isArray(text)) {
            for (const piece of text) {
              await message.reply(piece);
            }
          } else {
            await message.reply(text);
          }
        } break;
        case COMMAND["teams"]: {
          const text = await FN["teams"]();
          await message.reply(text);
        } break;
      }
    } catch (error) {
      console.log(error);
      await message.reply(ERROR_TAG + " - " + error);
    }
  }
})

client.login(process.env.TOKEN);