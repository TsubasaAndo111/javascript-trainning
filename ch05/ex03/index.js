export const month = {
  ifelse: function (str) {
    if (str === "Jan") {
      return true;
    } else if (str === "Feb") {
      return false;
    } else if (str === "Mar") {
      return true;
    } else if (str === "Apr") {
      return false;
    } else if (str === "May") {
      return true;
    } else if (str === "Jun") {
      return false;
    } else if (str === "Jul") {
      return true;
    } else if (str === "Aug") {
      return true;
    } else if (str === "Sep") {
      return false;
    } else if (str === "Oct") {
      return true;
    } else if (str === "Nov") {
      return false;
    } else if (str === "Dec") {
      return true;
    }
    return false;
  },
  switch: function (str) {
    switch (str) {
      case "Jan":
        return true;
      case "Feb":
        return false;
      case "Mar":
        return true;
      case "Apr":
        return false;
      case "May":
        return true;
      case "Jun":
        return false;
      case "Jul":
        return true;
      case "Aug":
        return true;
      case "Sep":
        return false;
      case "Oct":
        return true;
      case "Nov":
        return false;
      case "Dec":
        return true;
      default:
        return false;
    }
  },
};

