// Modules
require("dotenv").config();
const { Client, Intents } = require('discord.js');
const commandRegister = require("./command_register.js");
const removeSwitchesFromArgs = require("./_lib/remove_switches_from_args.js");
const { splitMessage } = require("./_lib/splitMessage.js");

const ERROR_TAG = "	༼ ༎ຶ ෴ ༎ຶ༽ "; // monster - http://asciimoji.com/

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Initialize the command register, then create the bot
commandRegister
  .init()
  .then(() => {
    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`)
    });

    client.on('messageCreate', async message => {
      if (!message.author.bot) {
        const split = message.content.split(" ");
        const userCommand = split[0];

        if (commandRegister.isCommand(userCommand)) {
          const userArgs = split.slice(1);
          try {
            const command = commandRegister.getCommandFromLabel(userCommand);

            if (!command) {
              throw `${userCommand} is not a recognized command.`;
            }
            const route = command.matchRoute(userArgs.join(" "));
            if (Array.isArray(route)) {
              if (route[0] === "too-many-args") {
                throw `${userCommand} command doesn't support that many arguments.`;
              } else if (route[0] === "no-arg") {
                throw `${userCommand} command doesn't support zero arguments.`;
              } else if (route[0] === "arg") {
                throw `Problem with argument "${route[1]}"`;
              }
            }

            // Remove switches from args (i.e. -roster or -info is not needed by the api call methods)
            // Pass cleaned-up args as well as full args (so clearer console.log message can be written
            //  when the route is run)
            const text = await route.run(removeSwitchesFromArgs(userArgs), userArgs);

            // Split the text into pieces (2000 character limit for Discord messages)
            if (text) {
              const texts = splitMessage(text);
              for (const piece of texts) {
                await message.reply(piece);
              }
            }
          } catch (error) {
            console.log(error);
            await message.reply("```" + ERROR_TAG + " - " + error + "```");
          }
        }
      }
    });

  client.login(process.env.TOKEN);
});