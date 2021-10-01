const makeSchedule = (games) => {
  let schedule = [];

  let text = "";
  games.forEach((g, i) => {
    if ((i + 1) % 4 === 0) {
      text += g;
      schedule.push(text);
      text = "";
    } else {
      text += g;
    }
  });

  return schedule;
};

module.exports = makeSchedule;