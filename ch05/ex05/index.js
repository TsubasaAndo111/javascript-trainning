export function f(obj) {
  let objEven = {}; // 偶数のみ格納するオブジェクト
  for (let key of Object.keys(obj)) {
    if (obj[key] % 2 == 0) {
      objEven[key] = obj[key];
    }
  }
  return objEven;
}
