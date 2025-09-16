export function fibonacciSequence() {
  let x = 0,
    y = 1;

  const iterator = {
    next() {
      const current = y;
      [x, y] = [y, x + y];
      return { value: current, done: false };
    },
    [Symbol.iterator]() {
      return this;
    },
  };

  return iterator;
}
