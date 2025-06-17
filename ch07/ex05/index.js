export function pop(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("Input is not array");
  }
  // 末尾を除いた配列のコピーを返す
  return array.slice(0, -1);
}

export function push(array, ...items) {
  if (!Array.isArray(array)) {
    throw new TypeError("Input is not array");
  }
  // 配列の末尾に...itemsを追加して返す
  return [...array, ...items];
}

export function shift(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("Input is not array");
  }
  // 先頭を除いた配列のコピーを返す
  return array.slice(1);
}

export function unshift(array, ...items) {
  if (!Array.isArray(array)) {
    throw new TypeError("Input is not array");
  }
  // 配列の先頭に...itemsを追加して返す
  return [...items, ...array];
}

export function sort(array, func) {
  if (!Array.isArray(array)) {
    throw new TypeError("Input is not array");
  }
  // コピーした配列に対してソートして返す(sortの返り値はもとの配列の参照）
  return [...array].sort(func);
}

const seq = [1, 2, 3, 4, 5];
const a = [6, 7];
console.log(pop(seq)); // [1, 2, 3, 4]
console.log(push(seq, 6)); // [ 1, 2, 3, 4, 5, 6 ]
console.log(push(seq, a)); // [ 1, 2, 3, 4, 5, [ 6, 7 ] ]
console.log(shift(seq)); // [2, 3, 4, 5]
console.log(unshift(seq, 0)); // [0, 1, 2, 3, 4, 5]
console.log(sort(seq, (a, b) => b - a)); // [5, 4, 3, 2, 1]
console.log(seq); // [1, 2, 3, 4, 5]
