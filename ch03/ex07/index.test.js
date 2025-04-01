import { equalArrays } from "./index.js";

describe("equalArrays", () => {
  it("異なる2つの整数(1, 2)が入力されたとき", () => {
    const actual = equalArrays(1, 2);
    const expected = true;
    expect(actual).toBe(expected);
  });
});
