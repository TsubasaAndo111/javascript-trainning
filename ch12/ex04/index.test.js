import { primes } from "./index.js";

describe("primes generator", () => {
  test("最初の10個の素数を返すこと", () => {
    const expected = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
    const p = primes();
    const result = [];

    for (let i = 0; i < expected.length; i++) {
      result.push(p.next().value);
    }

    expect(result).toEqual(expected);
  });

  test("50番目の素数が229であること", () => {
    const p = primes();
    let val;
    for (let i = 0; i < 50; i++) {
      val = p.next().value;
    }
    expect(val).toBe(229);
  });
});
