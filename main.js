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
            message.reply(text[0]);
            message.reply(text[1]);
          } else {
            message.reply(text);
          }
        } break;
        case "player": {
          const text = await command_map["player"](...args);
          message.reply(text);
        } break;
        case "schedule": {
          const schedule = await command_map["schedule"](...args);
          schedule.forEach(piece => {
            message.reply(piece);
          })
        } break;
        case "teams": {
          const text = await command_map["teams"]();
          message.reply(text);
        } break;
        case "team": {
          const text = await command_map["team"](...args);
          message.reply(text);
        } break;
      }
    } catch (error) {
      console.log(error);
      message.reply(ERROR_TAG + " - " + error);
    }
  }
})

client.login(process.env.TOKEN);