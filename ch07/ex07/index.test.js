import { bubbleSort } from "./index.js";

describe("bubbleSort", () => {
  test("配列が入力されたとき", () => {
    const a = [1, 4, 8, 10, 11, 12, 3, 2];
    const expected = [1, 2, 3, 4, 8, 10, 11, 12];
    expect(expected).toEqual(bubbleSort(a));
  });

  test("配列以外が入力されたとき", () => {
    const a = 1;
    expect(() => bubbleSort(a).toThrow());
  });
});
