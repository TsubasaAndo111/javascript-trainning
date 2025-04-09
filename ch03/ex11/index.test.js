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

  it("厳密等価1", () => {
    const actual = equals(42, 42);
    const expected = true;
    expect(actual).toBe(expected);
  });

  it("厳密等価2", () => {
    const actual = equals(null, null);
    const expected = true;
    expect(actual).toBe(expected);
  });

  it("厳密等価ではない場合オブジェクト以外が指定1", () => {
    const actual = equals({x: 42}, 42); 
    const expected = false;
    expect(actual).toBe(expected);
  });

  it("厳密等価ではない場合オブジェクト以外が指定2", () => {
    const actual = equals(null, {x: 42});
    const expected = false;
    expect(actual).toBe(expected);
  });

  it("プロパティの数・名前が一致しない1", () => {
    const actual = equals({x: 1}, {y: 1});
    const expected = false;
    expect(actual).toBe(expected);
  });

  it("プロパティの数・名前が一致しない2", () => {
    const actual = equals({x: 1}, {x: 1, y: 1});
    const expected = false;
    expect(actual).toBe(expected);
  });

  it("プロパティの各値を equals で再帰的に比較1", () => {
    const actual = equals({x: {y: {z: 10}}}, {x: {y: {z: 10}}});
    const expected = true;
    expect(actual).toBe(expected);
  });

  it("プロパティの各値を equals で再帰的に比較2", () => {
    const actual = equals({x: {y: {z: 10}}}, {x: {y: {z: 10, w: 1}}});
    const expected = false;
    expect(actual).toBe(expected);
  });


});
