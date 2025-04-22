import { bitCount } from "./index.js";

describe("bitCount", () => {
  it("0b111", () => {
    const actual = bitCount(0b111);
    const expected = 3;
    expect(actual).toBe(expected);
  });

  it("0b1111111111111111111111111111111", () => {
    const actual = bitCount(0b1111111111111111111111111111111);
    const expected = 31;
    expect(actual).toBe(expected);
  });
});
