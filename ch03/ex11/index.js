let obj1 = { x: 1 };
obj1.y = 2; // obj1にプロパティを追加
console.log(obj1); // { x: 1, y: 2 }

let obj2 = { x: 1, y: 2 };
console.log(obj2); // { x: 1, y: 2 }

console.log(obj1 === obj2); // false

// ２つのオブジェクトの値が同じならtrueを返す関数
export function equals(obj1, obj2) {
  //  厳密等価
  if (obj1 === obj2) {
    console.log(1);
    return true;
  }
  console.log(typeof obj1);

  // nullではないか
  if (obj1 === null || obj2 === null) {
    return false;
  }

  // 引数がオブジェクトか
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return false;
  }

  // プロパティの長さ
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  // オブジェクトの値同士の比較
  for (let key in obj1) {
    if (!equals(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}
