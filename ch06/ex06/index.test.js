import { getPropertyNames } from "./index.js";

describe("getPropertyNames", () => {
  let table;

  test("列挙可な独自プロパティ", () => {
    const obj = { x: 1, y: 2, z: 3 };
    expect(getPropertyNames(obj)).toEqual(["x", "y", "z"]);
  });

  test("列挙不可な独自プロパティ", () => {
    const obj = {};
    Object.defineProperty(obj, "x", {
      value: 1,
      enumerable: false,
    });
    Object.defineProperty(obj, "y", {
      value: 2,
      enumerable: false,
    });
    Object.defineProperty(obj, "z", {
      value: 3,
      enumerable: false,
    });
    expect(getPropertyNames(obj)).toEqual(["x", "y", "z"]);
  });

  test("プロパティ名がSymbolの独自プロパティ", () => {
    const obj = {};
    const sym1 = Symbol("x");
    const sym2 = Symbol("y");
    const sym3 = Symbol("z");
    obj[sym1] = 1;
    obj[sym2] = 2;
    obj[sym3] = 3;
    expect(getPropertyNames(obj)).toEqual([sym1, sym2, sym3]);
  });
  test("列挙可能な継承プロパティ", () => {
    const prototypeObj = {
      x: 1,
      y: 2,
      z: 3,
    };
    const obj = Object.create(prototypeObj);
    expect(getPropertyNames(obj)).toEqual(["x", "y", "z"]);
  });

  test("列挙不可な継承プロパティ", () => {
    const prototypeObj = {};
    Object.defineProperty(prototypeObj, "x", {
      value: 1,
      enumerable: false,
    });
    Object.defineProperty(prototypeObj, "y", {
      value: 2,
      enumerable: false,
    });
    Object.defineProperty(prototypeObj, "z", {
      value: 3,
      enumerable: false,
    });
    const obj = Object.create(prototypeObj);
    obj.a = 0
    expect(getPropertyNames(obj)).toEqual(["a"]);
  });
});
