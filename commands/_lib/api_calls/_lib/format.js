/**
 * Adds characters to the left of a value so it takes up a certain number of characters
 * @param {string/number} value value to be displayed
 * @param {number} columns the total number of columns/chars that the value + padding should take up
 * @param {string/number} padChar the character that will "pad" the value
 * @returns
 */
const padLeft = (value, columns = 2, padChar = " ") => {
  if (value === undefined) {
    return "?".repeat(columns);
  } else if (value.toString().length < columns) {
    return padChar.repeat(columns - value.toString().length) + value;
  } else {
    return value;
  }
};

/**
 * Adds characters to the right of a value so it takes up a certain number of characters
 * @param {*} value value to be displayed
 * @param {*} columns the total number of columns/chars that the value + padding should take up
 * @param {*} padChar the character that will "pad" the value
 * @returns
 */
const padRight = (value, columns = 2, padChar = " ") => {
  if (value === undefined) {
    return "?".repeat(columns);
  } else if (value.toString().length < columns) {
    return value.toString() + padChar.repeat(columns - value.toString().length);
  } else {
    return value.toString();
  }
};

/**
 * Return the longest string in an array of strings
 * @param {array} strings
 * @returns
 */
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