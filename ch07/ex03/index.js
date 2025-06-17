export function sum(array) {
  if (!Array.isArray(array)) {
    return 0;
  }

  if (array.length === 0) {
    return 0;
  }

  return array.reduce((x, y) => x + y);
}

export function join(array, separator = ",") {
  if (!Array.isArray(array)) {
    throw new Error("Input is not array.");
  }

  // ??でnullやundefinedのときに""に変換できる
  return array.reduce(
    (x, y, i) => x + (i === 0 ? "" : separator) + (y ?? ""),
    ""
  );
}

export function reverse(array) {
  if (!Array.isArray(array)) {
    throw new Error("Input is not array.");
  }
  // これまでの結果xの前に配列の要素yを順に挿入する
  return array.reduce((x, y) => [y, ...x], []);
}

export function every(array, func) {
  if (!Array.isArray(array)) {
    throw new Error("Input is not array.");
  }

  if (typeof func !== "function") {
    throw new Error("Input is not function");
  }

  return array.reduce((x, y, index, arr) => func(y, index, arr) && x, true);
}

export function some(array, func) {
  if (!Array.isArray(array)) {
    throw new Error("Input is not array.");
  }

  if (typeof func !== "function") {
    throw new Error("Input is not function");
  }

  return array.reduce((x, y, index, arr) => func(y, index, arr) || x, false);
}
