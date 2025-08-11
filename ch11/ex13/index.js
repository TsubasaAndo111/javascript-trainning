export function stringifyJSON(json) {
  // null
  if (json === null) return "null";
  // boolean
  if (typeof json === "boolean") return json ? "true" : "false";
  // number(Infinity, -Infinity, NaNはnull)
  if (typeof json === "number") {
    return isFinite(json) ? String(json) : "null";
  }
  // string(エスケープ処理を行う)
  if (typeof json === "string") {
    return '"' + escapeString(json) + '"';
  }
  // array(各要素に対して、再帰的に呼び出す)
  if (Array.isArray(json)) {
    return "[" + json.map((v) => stringifyJSON(v)).join(",") + "]";
  }

  // object(undefinedのプロパティは無視される)
  if (typeof json === "object") {
    const keys = Object.keys(json);
    const obj = keys
      .map((key) => {
        const val = stringifyJSON(json[key]);
        if (val !== undefined) {
          return stringifyJSON(key) + ":" + val;
        }
        return null;
      })
      .filter((v) => v !== null);
    return "{" + obj.join(",") + "}";
  }
  return undefined; // function,Symbol,undefinedはundefinedが返る
}

// 文字列として扱うためにエスケープ処理
// u0000～u001FはASCII制御文字
function escapeString(str) {
  return str.replace(/[\\"\u0000-\u001F]/g, (c) => {
    switch (c) {
      case '"':
        return '\\"';
      case "\\":
        return "\\\\";
      case "\b":
        return "\\b";
      case "\f":
        return "\\f";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "\t":
        return "\\t";
      default:
        return "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0");
    }
  });
}
