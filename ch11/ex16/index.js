export function retryWithExponentialBackoff(func, maxRetry, callback) {
  // setTimeoutでtryFuncを呼び出すことでretryWithExponentialBackoffを即時終了できる
  // setTimeoutは第一引数の関数の実行が終了する前に即時に戻るため
  setTimeout(() => {
    let retryNum = 0;

    function tryFunc() {
      const result = func();

      if (result === true) {
        // 成功時にはcallbackを呼び出して終了
        callback(true);
      } else {
        if (retryNum >= maxRetry) {
          // 最大リトライ回数を超えた場合は失敗としてcallback
          callback(false);
        } else {
          // 待ち時間を計算（2^retryNum 秒）
          const delay = Math.pow(2, retryNum) * 1000;
          retryNum++;

          // 指定時間後に再度 tryFunc を呼び出す
          setTimeout(tryFunc, delay);
        }
      }
    }

    tryFunc();
  }, 0);
}
