const splitMessageByLines = (text, MAX_LINES = 20, addGraves = true) => {
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

const splitMessage = (text, addGraves = true) => {
  let MAX_CHARS;
  if (addGraves) {
    MAX_CHARS = 2000 - 6;
  }

  const messages = [];

  if (text.length < MAX_CHARS) {
    return ["```" + text + "```"];
  }

  let whatsLeft = text;
  while (whatsLeft.length > 0) {
    let slice = whatsLeft.substring(0, MAX_CHARS);

    if (slice.length < MAX_CHARS) {
      messages.push(slice);
      break;
    }

    const sliceEnd = slice.lastIndexOf("\n");
    if (sliceEnd === -1) {
      messages.push(slice);
    } else {
      slice = whatsLeft.substring(0, sliceEnd);
      messages.push(slice);
    }
    whatsLeft = whatsLeft.substring(sliceEnd);
  }

  if (addGraves) {
    for (const i in messages) {
      messages[i] = "```" + messages[i] + "```";
    }
  }

  return messages;
};

module.exports = {
  splitMessage,
  splitMessageByLines,
};