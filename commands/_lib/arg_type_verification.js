// Contains functions used to verify whether a user's argument meets the requirements
//  of an argument in a route

const draft = {
  draftYear: (value) => {
    // https://en.wikipedia.org/wiki/NHL_Entry_Draft#Selection_order_and_draft_lottery
    //  - 1963 was first draft
    if (value.length === 4 && value.match(/(\d\d\d\d)/) && Number.parseInt(value) >= 1963) {
      return true;
    }
    return false;
  },
  roundNum: (value) => {
    if (value.match(/^[0-9]{1,2}$/) && Number.parseInt(value) > 0 && Number.parseInt(value) <= 25) {
      return true;
    }
    return false;
  },
  pickNum: (value) => {
    if (value.match(/^[0-9]{1,3}$/) && Number.parseInt(value) > 0 && Number.parseInt(value) <= 293) {
      return true;
    }
    return false;
  }
};

const teamCode = (value) => {
  if (value.match(/^([a-z]|[A-Z]){3}$/)) {
    return true;
  }
  return false;
};

const personId = (value) => {
  if (value.match(/^\d{1,}$/)) {
    return true;
  }
  return false;
};

const datetime = {
  YYYY_MM_DD: (value) => {
    if (value.match(/^\d\d\d\d-\d\d-\d\d$/)) {
      return true;
    }
    return false;
  },
  YYYY_MM: (value) => {
    if (value.match(/^\d\d\d\d-\d\d$/)) {
      return true;
    }
    return false;
  },
};

module.exports = {
  "{draftYear}": draft.draftYear,
  "{roundNum}": draft.roundNum,
  "{pickNum}": draft.pickNum,
  "{playerId}": personId,
  "{prospectId}": personId,
  "{teamCode}": teamCode,
  "{YYYY-MM-DD}": datetime.YYYY_MM_DD,
  "{YYYY-MM}": datetime.YYYY_MM,
};