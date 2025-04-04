let obj1 = { x: 1 };
obj1.y = 2; // obj1にプロパティを追加
console.log(obj1); // { x: 1, y: 2 }

let obj2 = { x: 1, y: 2 };
console.log(obj2); // { x: 1, y: 2 }

console.log(obj1 === obj2); // false


// ２つのオブジェクトの値が同じならtrueを返す関数
export function equals(obj1, obj2) {
  
  if (Object.keys(obj1).length === 0) {
    if (Object.keys(obj2).length === 0) {
        return true; // 両方とも空オブジェクトの場合
    }else{
        return false;// 片方だけ空オブジェクトの場合
    }
  }

  // オブジェクトの値同士の比較
  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
