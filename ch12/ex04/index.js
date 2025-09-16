// 整数列を返すジェネレータ
function* integers(start = 2) {
  let i = start;
  while (true) {
    yield i++;
  }
}

// p363のfilter関数
function filter(iterable, predicate) {
  let iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      for (;;) {
        let v = iterator.next();
        if (v.done || predicate(v.value)) {
          return v;
        }
      }
    },
  };
}

// 呼出しごとに素数を順番に返す無限ジェネレータ
// エラトステネスのふるい(整数倍の数をふるい落とす方法)
// まず一番最初の数を返す = 2
// 2で割り切れる数をふるい落とし、primesを再帰的に呼出し
// 再帰的に呼び出された一番最初の数を返す = 3
// 3で割り切れる数をふるい落とし、primesを再帰的に呼出しを繰り返して素数だけを返す
export function* primes(seq = integers()) {
  let prime = seq.next().value;
  yield prime;

  // 再帰的に、prime の倍数を除いたシーケンスから次の素数を得る
  yield* primes(filter(seq, (n) => n % prime !== 0));
}
