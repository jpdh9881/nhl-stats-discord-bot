const draft = {
  // https://en.wikipedia.org/wiki/NHL_Entry_Draft#Selection_order_and_draft_lottery
  //  - 25 rounds in 1974
  round: (value) => {
    if (!value) {
      return false;
    }
    if (value.match(/^[0-9]{1,2}$/) && Number.parseInt(value) > 0 && Number.parseInt(value) <= 25) {
      return true;
    }
    return false;
  },
  // https://en.wikipedia.org/wiki/NHL_Entry_Draft#Selection_order_and_draft_lottery
  //  - 293 total picks in 2000
  pick: (value) => {
    if (!value) {
      return false;
    }
    if (value.match(/^[0-9]{1,3}$/) && Number.parseInt(value) > 0 && Number.parseInt(value) <= 293) {
      return true;
    }
    return false;
  },
  year: (value) => {
    if (!value) {
      return false;
    }
    // https://en.wikipedia.org/wiki/NHL_Entry_Draft#Selection_order_and_draft_lottery
    //  - 1963 was first draft
    if (value.length === 4 && value.match(/(\d\d\d\d)/) && Number.parseInt(value) >= 1963) {
      return true;
    }
    return false;
  }
};

const player = {
  id: (value) => {
    if (!value) {
      return false;
    }

    if (value.match(/^\d{1,}$/)) {
      return true;
    }
    return false;
  },
};

const team = {
  teamCode: (value) => {
    if (!value) {
      return false;
    }

    if (value.match(/^([a-z]|[A-Z]){3}$/)) {
      return true;
    }
    return false;
  },
};

const schedule = {
  YYYY_MM_DD: (value) => {
    if (!value) {
      return false;
    }

    if (value.match(/^\d\d\d\d-\d\d-\d\d$/)) {
      return true;
    }
    return false;
  },
};

module.exports = {
  draft,
  player,
  team,
  schedule,
};