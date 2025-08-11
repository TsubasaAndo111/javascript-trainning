export class TypeMap {
  constructor() {
    this.map = new Map();
  }

  // コンストラクタ関数かどうかを判定
  static isConstructor(func) {
    if (typeof func !== "function" || !func.prototype) {
      return false;
    }

    // 以下の処理を行うと、副作用なしでnewできるかチェックできるらしい
    try {
      new new Proxy(func, {
        construct() {
          return {};
        },
      })();
      return true;
    } catch (err) {
      return false;
    }
  }

  set(key, value) {
    if (!TypeMap.isConstructor(key)) {
      throw new TypeError("Key must be a valid constructor function");
    }

    // プリミティブラッパー（String, Number, Boolean）の判定
    // その他のプリミティブ型(BigInt,Symbol,null,undefined)はラッパーを持たない
    const isPrimitiveWrapper = [String, Number, Boolean].includes(key);

    if (isPrimitiveWrapper) {
      const typeMatches =
        (key === String && typeof value === "string") ||
        (key === Number && typeof value === "number") ||
        (key === Boolean && typeof value === "boolean");

      if (!typeMatches) {
        throw new TypeError(`Value must be a ${key.name}`);
      }
    } else {
      // valueがkeyのインスタンスであることを判定
      if (!(value instanceof key)) {
        throw new TypeError(`Value must be an instance of ${key.name}`);
      }
    }

    this.map.set(key, value);
  }

  get(key) {
    return this.map.get(key);
  }
}
