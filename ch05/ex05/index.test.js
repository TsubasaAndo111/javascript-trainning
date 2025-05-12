import { f } from "./index.js";

describe("f", () => {
  it("空のオブジェクト", () => {
    const o = {};
    const expected = {};
    expect(f(o)).toEqual(expected);
  });
  it("0", () => {
    const o = { x: 0 };
    const expected = { x: 0 };
    expect(f(o)).toEqual(expected);
  });
  it("奇数のみ", () => {
    const o = { x: 1, y: 3, z: 5 };
    const expected = {};
    expect(f(o)).toEqual(expected);
  });
  it("偶数のみ", () => {
    const o = { x: 2, y: 4, z: 6 };
    const expected = { x: 2, y: 4, z: 6 };
    expect(f(o)).toEqual(expected);
  });
  it("奇数と偶数", () => {
    const o = { x: 1, y: 2, z: 3 };
    const expected = { y: 2 };
    expect(f(o)).toEqual(expected);
  });
});
