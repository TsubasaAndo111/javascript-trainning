export const escape = {
  ifelse: function (str) {
    let result = "";
    for (let c of str) {
      if (c === "0") {
        result = result + "\\" + c;
      } else if (c === "b") {
        result = result + "\\" + c;
      } else if (c === "t") {
        result = result + "\\" + c;
      } else if (c === "n") {
        result = result + "\\" + c;
      } else if (c === "v") {
        result = result + "\\" + c;
      } else if (c === "f") {
        result = result + "\\" + c;
      } else if (c === "r") {
        result = result + "\\" + c;
      } else if (c === '"') {
        result = result + "\\" + c;
      } else if (c === "'") {
        result = result + "\\" + c;
      } else if (c === "\\") {
        result = result + "\\" + c;
      } else {
        result += c;
      }
    }

    return result;
  },
  switch: function (str) {
    let result = "";
    for (let c of str) {
      switch (c) {
        case "0":
          result = result + "\\" + c;
          break;
        case "b":
          result = result + "\\" + c;
          break;
        case "t":
          result = result + "\\" + c;
          break;
        case "n":
          result = result + "\\" + c;
          break;
        case "v":
          result = result + "\\" + c;
          break;
        case "f":
          result = result + "\\" + c;
          break;
        case "r":
          result = result + "\\" + c;
          break;
        case '"':
          result = result + "\\" + c;
          break;
        case "'":
          result = result + "\\" + c;
          break;
        case "\\":
          result = result + "\\" + c;
          break;
        default:
          result += c;
      }
    }
    return result;
  },
};
