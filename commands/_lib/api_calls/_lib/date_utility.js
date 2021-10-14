const dateFormat = require("dateformat");

const format = "yyyy-mm-dd";

const today = (formatted) => {
  if (formatted) {
    return dateFormat(new Date(), format);
  } else {
    return new Date();
  }
};

/**
 * Returns formatted (yyyy-mm-dd) date a week or month from today's date
 * @param {string} plusAmount week or month
 * @returns
 */
const todayPlusFormatted = (plusAmount = "week") => {
  if (plusAmount === "week") {
    const add = today().getDate() + 7;
    return dateFormat(today().setDate(add), format);
  } else if (plusAmount === "month") {
    const add = today().getDate() + 31;
    return dateFormat(today().setDate(add), format);
  }
};

const getDateRange = (yearMonth = "currentMonth") => {
  // https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript

  if (yearMonth === "currentMonth") {
    const year = today().getFullYear();
    const month = today().getMonth() + 1;
    const start = `${year}-${month}-01`;
    const endDay = (new Date(year, month, 0)).getDate();
    const end = `${year}-${month}-${endDay}`;
    return [start, end];
  } else if (yearMonth === "monthFromToday") {
    const now = today();
    const start = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    // add 30 days to date
    const then = new Date(now.setDate(now.getDate() + 30));
    const end = `${then.getFullYear()}-${then.getMonth()}-${then.getDate()}`;
    return [start, end];
  } else {
    const [year, month] = yearMonth.split("-");
    const start = `${year}-${month}-01`;
    const endDay = (new Date(year, month, 0)).getDate();
    const end = `${year}-${month}-${endDay}`;
    return [start, end];
  }
};

module.exports = {
  today,
  todayPlusFormatted,
  getDateRange,
};