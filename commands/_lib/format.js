const padLeft = (value, columns = 2, padChar = " ") => {
  if (value === undefined) {
    return "?".repeat(columns);
  } else if (value.toString().length < columns) {
    return padChar.repeat(columns - value.toString().length) + value;
  } else {
    return value;
  }
};
const padRight = (value, columns = 2, padChar = " ") => {
  if (value === undefined) {
    return "?".repeat(columns);
  } else if (value.toString().length < columns) {
    return value.toString() + padChar.repeat(columns - value.toString().length);
  } else {
    return value.toString();
  }
};
const getLongestString = (strings = []) => {
  let longestLength = 0;
  let stringValue;

  strings.forEach(str => {
    if (str.length > longestLength) {
      longestLength = str.length;
      stringValue = str;
    }
  });

  return [longestLength, stringValue];
};

module.exports = {
  padLeft,
  padRight,
  getLongestString
}