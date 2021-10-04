const MAX_LINES = 20;

const splitMessage = (text) => {
  const lines = text.split("\n");
  const messages = new Array(Math.floor(lines.length / MAX_LINES) + 1);
  messages.fill("```");

  for (const i in lines) {
    let line = lines[i];
    messages[Math.floor(i / MAX_LINES)] += line + "\n";
  }

  for (const i in messages) {
    messages[i] += "```";
  }

  return messages;
};

module.exports = splitMessage;