import { fibFor, fibDoWhile, fibWhile } from "./index.js";

describe("fibWhile", () => {
  it("fibWhile", () => {
    const expected = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    expect(fibWhile()).toEqual(expected);
  });
});
describe("fibDoWhile", () => {
  it("fibDoWhile", () => {
    const expected = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    expect(fibDoWhile()).toEqual(expected);
  });
});

describe("fibFor", () => {
  it("fibFor", () => {
    const expected = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    expect(fibFor()).toEqual(expected);
  });
});
