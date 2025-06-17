function fizzbuzz(n) {
  // 配列の初期化(Array.from()の第一引数で配列のサイズを指定、第二引数でインデックスを配列の値として格納)
  const array = Array.from({ length: n }, (_, i) => i + 1);

  // map()を使って、条件に合致する文字列を格納した配列を作成
  // 作成した配列に対して、forEach()を使って、各要素を出力
  array
    .map(
      (i) =>
        (i % 15 === 0 && "FizzBuzz") ||
        (i % 3 === 0 && "Fizz") ||
        (i % 5 === 0 && "Buzz") ||
        i
    )
    .forEach((x) => console.log(x));
}

function sumOfSquaredDifference(f, g) {
  let result = 0;
  f.forEach((x, i, array) => {
    result += (f[i] - g[i]) ** 2;
  });
  return result;
}

function sumOfEvensIsLargerThan42(array) {
  let sum = 0;
  array.filter((x) => x % 2 == 0).forEach((x) => (sum += x));
  return sum >= 42;
}