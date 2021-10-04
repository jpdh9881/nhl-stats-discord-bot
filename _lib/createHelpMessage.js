const COMMAND_LABELS = require("../command_labels.js");
const COMMAND_MODELS = require("../models/commands.js");
const { getArguments, getDescriptions } = require("./help_message.js");

const createHelpMessage = (command) => {
  const label = COMMAND_LABELS[command];

  const pre = "```";
  const post = "```";

  const model = COMMAND_MODELS[command];

  // build "Command:"" piece
  let commandPiece = "Command:\n";
  commandPiece += ` ${label}${getArguments(model)}\n`;
  commandPiece += `${getDescriptions(model)}`;

  let helpPiece =
    `Help:\n` +
    `  ${label} -help\n`;

  let notePiece =
    `Note:\n` +
    `  ${model.help.note || "(none)"}`;

  let examplesPiece = `\nExamples:\n`;
  for (const ex of model.help.examples) {
    examplesPiece += `  ${label} ${ex}\n`
  }

  const help = pre + commandPiece + helpPiece + notePiece + examplesPiece + post;

  return help;
};

module.exports = createHelpMessage;