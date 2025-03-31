export function substring(str, indexStart, indexEnd) {
  let results = "";

  // 引数にindexEndが含まれないとき
  if (indexEnd === undefined) {
    indexEnd = str.length;
  }

  // NaNが入力されたとき
  if (Number.isNaN(indexStart)) {
    indexStart = 0;
  }
  if (Number.isNaN(indexEnd)) {
    indexEnd = 0;
  }

  // indexStartの方が大きいとき
  if (indexStart > indexEnd) {
    let tmp = indexStart;
    indexStart = indexEnd;
    indexEnd = tmp;
  }

  // 入力文字数の範囲を超えないように
  indexStart = Math.min(str.length, indexStart);
  indexEnd = Math.min(str.length, indexEnd);

  indexStart = Math.max(0, indexStart); // indexStartが負の場合

  // 小数が入力されたとき
  indexStart = Math.floor(indexStart);
  indexEnd = Math.floor(indexEnd);

  // 文字列の切り出し処理
  for (let i = indexStart; i < indexEnd; i++) {
    results += str[i];
  }
  return results;
}

export function slice(str, indexStart, indexEnd) {
  let results = "";

  // 引数にindexEndが含まれないとき
  if (indexStart === undefined) {
    indexStart = 0;
  }

  // 引数にindexEndが含まれないとき
  if (indexEnd === undefined) {
    indexEnd = str.length;
  }

  // NaNが入力されたとき
  if (Number.isNaN(indexStart)) {
    indexStart = 0;
  }
  if (Number.isNaN(indexEnd)) {
    indexEnd = 0;
  }

  // 引数が負の値のとき
  if (indexStart < 0) {
    indexStart += str.length;
  }
  if (indexEnd < 0) {
    indexEnd += str.length;
  }

  // 入力文字数の範囲を超えないように
  indexStart = Math.min(str.length, indexStart);
  indexEnd = Math.min(str.length, indexEnd);

  indexStart = Math.max(0, indexStart); // indexStartが負の場合

  // 小数が入力されたとき
  indexStart = Math.floor(indexStart);
  indexEnd = Math.floor(indexEnd);

  // 文字列の切り出し処理
  for (let i = indexStart; i < indexEnd; i++) {
    results += str[i];
  }
  return results;
}

export function padStart(str, targetLength, padString) {
  // 入力した文字列の長さが、指定した長さより大きい場合
  if (str.length > targetLength) {
    return str;
  }

  if (padString === undefined) {
    padString = " ";
  }

  // 指定した長さになるまで、指定した文字で埋める
  let results = "";
  let i = str.length;
  while (i < targetLength) {
    // 埋めると指定の長さを超えてしまうとき
    if (targetLength < i + padString.length) {
      let num = targetLength - i; // 指定の長さまで必要な文字数
      padString = padString.slice(0, num); // 必要な分だけ切り出し
    }
    results += padString;
    i += padString.length;
  }

  results += str;

  return results;
}

export function trim(str) {
  let results = str.replace(/^\s+|\s+$/g, "");

  return results;
}
