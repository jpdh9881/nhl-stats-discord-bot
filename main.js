// Modules
require("dotenv").config();
const { Client, Intents } = require('discord.js')
const command_map = require("./commands/command_map");

const ERROR_TAG = "Umm, something went wrong. Guess what it was...";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('messageCreate', async message => {
  if (!message.author.bot) {
    const split = message.content.split(" ");
    const command = split[0];
    const args = split.slice(1);

    try {
      switch(command) {
        case "draft": {
          const text = await command_map["draft"](...args);
          if (Array.isArray(text)) {
            await message.reply(text[0]);
            await message.reply(text[1]);
          } else {
            await message.reply(text);
          }
        } break;
        case "player": {
          const text = await command_map["player"](...args);
          await message.reply(text);
        } break;
        case "schedule": {
          const schedule = await command_map["schedule"](...args);
          for (const piece of schedule) {
            await message.reply(piece);
          }
        } break;
        case "teams": {
          const text = await command_map["teams"]();
          await message.reply(text);
        } break;
        case "team": {
          const text = await command_map["team"](...args);
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