export async function retryWithExponentialBackoff(func, maxRetry) {
  let retryNum = 0;

  while (true) {
    try {
      const result = await func(); // func が成功すればその結果を返す
      return result;
    } catch (err) {
      if (retryNum >= maxRetry) {
        throw err; // リトライ上限を超えたらエラーを投げる
      }

      const delay = Math.pow(2, retryNum) * 1000;
      await wait(delay);
      retryNum++;
    }
  }
}

// 指定ミリ秒待つためのユーティリティ関数
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
