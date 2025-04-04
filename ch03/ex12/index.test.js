import { equals } from "./index.js";

describe("equals", () => {
  it("同じオブジェクト", () => {
    let obj1 = { x: 1, y: 2 };
    const actual = equals(obj1, obj1);
    const expected = true;
    expect(actual).toBe(expected);
  });

  it("同じ値をもつ異なるオブジェクト", () => {
    let obj1 = { x: 1, y: 2 };
    let obj2 = { x: 1, y: 2 };
    const actual = equals(obj1, obj2);
    const expected = true;
    expect(actual).toBe(expected);
  });

  it("異なる値をもつ異なるオブジェクト", () => {
    let obj1 = { x: 1, y: 2 };
    let obj2 = { x: 1, y: 3 };
    const actual = equals(obj1, obj2);
    const expected = false;
    expect(actual).toBe(expected);
  });

  it("異なるプロパティをもつ異なるオブジェクト", () => {
    let obj1 = { x: 1, y: 2 };
    let obj2 = { x: 1, z: 2 };
    const actual = equals(obj1, obj2);
    const expected = false;
    expect(actual).toBe(expected);
  });

  it("両方が空オブジェクト", () => {
    let obj1 = {};
    let obj2 = {};
    const actual = equals(obj1, obj2);
    const expected = true;
    expect(actual).toBe(expected);
  });

  it("第１引数が空オブジェクト", () => {
    let obj1 = {};
    let obj2 = { x: 1, y: 2 };
    const actual = equals(obj1, obj2);
    const expected = false;
    expect(actual).toBe(expected);
  });

  it("第２引数が空オブジェクト", () => {
    let obj1 =  { x: 1, y: 2 };
    let obj2 = {};
    const actual = equals(obj1, obj2);
    const expected = false;
    expect(actual).toBe(expected);
  });


});
