export function any(...funcs) {
    return function(arg) {
      return funcs.some(fn => fn(arg)); // どれかひとつでもtrueがあればtrueを返す
    };
  }

export function catching(fn, errorHandler) {
    return function (...args) {
      try {
        return fn(...args);
      } catch (e) {
        return errorHandler(e); // エラーが発生すれば、2つ目の関数にエラー内容を渡して実行
      }
    };
  }
