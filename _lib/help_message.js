const getArguments = (model) => {
  let arguments = "";

  let placeInModel = model.next;
  while (true) {
    let arg = Object.keys(placeInModel)[0];
    arguments += " " + arg;

    if (placeInModel[arg].next) {
      placeInModel = placeInModel[arg].next;
    } else if (Object.values(placeInModel[arg])[0].next) {
      placeInModel = Object.values(placeInModel[arg])[0].next;
    } else {
      break;
    }
  }

  return arguments;
};

const getDescriptions = (model) => {
  const indent = "    ";
  let descriptions = "";

  const getDs = (place, indents) => {
    if (!place) {
      return;
    }
    const arg = Object.keys(place)[0];
    if (place[arg].descr) {
      descriptions += `${indents}${arg}: ${place[arg].descr}\n`;
      if (place[arg].next) {
        getDs(place[arg].next, indents + "  ");
      }
    } else if (Object.keys(place[arg]).length > 0) {
      const options = Object.keys(place[arg]);
      const optionsFormatted = options.map(opt => opt === "undefined" ? "(none)" : opt);
      descriptions += `${indents}${arg}: ${optionsFormatted.join(", ")}\n`;
      options.forEach((opt, i) => {
        const optDescription = place[arg][opt].descr? ": " + place[arg][opt].descr : "";
        descriptions += `${indents + "  "}[${optionsFormatted[i]}]${optDescription}\n`;
        getDs(place[arg][opt].next, indents + "    ");
      });
    }
  };

  getDs(model.next, indent);

  return descriptions;
};

module.exports = {
  getArguments,
  getDescriptions,
};