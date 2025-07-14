// 引数が1つではないので () が必要
// return文だけではないため、returnと;、{}が必要
export const repeatChar = (n, c) => {
  if (!Number.isInteger(n) || n <= 0)
    throw new Error("n は 1 以上の自然数でなければなりません");

  // /^[a-zA-Z0-9]$は英小文字 (a〜z)、英大文字 (A〜Z)、および数字 (0〜9) のいずれか1文字を示す正規表現
  if (typeof c !== "string" || !/^[a-zA-Z0-9]$/.test(c))
    throw new Error("c は英数字1文字でなければなりません");

  const array = [];
  for (let i = 0; i < n; i++) {
    console.log(c);
    array[i] = c;
  }
  return array;
};

// 引数が1つなので()を省略可能
// return文だけなので、returnと;、{}が省略可能
export const square = (x) => x * x;

// 引数がないときは()が必要
// 戻り値がオブジェクトリテラルなので(オブジェクトリテラル)にする必要あり
export const getNow = () => ({ now: new Date() });

console.log(getNow().now)