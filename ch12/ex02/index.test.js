import { fibonacciSequence } from "./index.js";

describe("fibonacciSequence", () => {
  test("forループで10個の要素に対して出力", () => {
    const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    const iterator = fibonacciSequence();

    const result = [];
    for (let i = 0; i < 10; i++) {
      const { value, done } = iterator.next();
      expect(done).toBe(false);
      result.push(value);
    }

    expect(result).toEqual(expected);
  });
});
