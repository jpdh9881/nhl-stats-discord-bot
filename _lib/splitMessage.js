const MAX_LINES = 20;

const splitMessage = (text, addGraves = true) => {
  const lines = text.split("\n");
  const messages = new Array(Math.ceil(lines.length / MAX_LINES));
  if (addGraves) {
    messages.fill("```");
  } else {
    messages.fill("");
  }

  for (const i in lines) {
    let line = lines[i];
    messages[Math.floor(i / MAX_LINES)] += line + "\n";
  }

  if (addGraves) {
    for (const i in messages) {
      messages[i] += "```";
    }
  }

  return messages;
};

module.exports = splitMessage;