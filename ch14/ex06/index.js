export function createLoggingProxy(targetObj) {
  const callHistory = [];

  const handler = {
    get(target, name, receiver) {
      const orgMethod = target[name];

      // メソッド（関数）の場合、ラップして履歴を記録
      if (typeof orgMethod === "function") {
        return function (...args) {
          // 実行ログ
          callHistory.push({
            timestamp: new Date(),
            method: name,
            arguments: args,
          });

          return orgMethod.apply(this, args); //元のメソッドの処理を実行
        };
      }

      // メソッドでないプロパティはそのまま返す
      return orgMethod;
    },
  };

  const proxy = new Proxy(targetObj, handler);

  return { proxy, callHistory };
}
