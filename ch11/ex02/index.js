export function cache(f) {
  if (typeof f !== "function") {
    throw new TypeError("f must be a function");
  }

  const cacheMap = new WeakMap(); // WeakMapを使うとガベージコレクションの対象となる

  return function cachedSlowFn(arg) {
    if (cacheMap.has(arg)) {
      return cacheMap.get(arg);
    }
    const result = f(arg);
    cacheMap.set(arg, result);
    return result;
  };
}

function slowFn(obj) {
  return Object.keys(obj).length; // オブジェクトのキーの数を返す
}
