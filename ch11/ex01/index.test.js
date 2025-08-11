// TypeMap.test.js
import { TypeMap } from "./index.js";

class Foo {}

describe("TypeMap", () => {
  let typeMap;

  beforeEach(() => {
    typeMap = new TypeMap();
  });

  test("set/getでプリミティブラッパークラスと対応するプリミティブ値が扱える", () => {
    typeMap.set(String, "hello");
    expect(typeMap.get(String)).toBe("hello");

    typeMap.set(Number, 123);
    expect(typeMap.get(Number)).toBe(123);

    typeMap.set(Boolean, true);
    expect(typeMap.get(Boolean)).toBe(true);
  });

  test("プリミティブラッパークラスで対応しない型の値をsetするとエラーになる", () => {
    expect(() => typeMap.set(String, 123)).toThrow(TypeError);
    expect(() => typeMap.set(Number, "abc")).toThrow(TypeError);
    expect(() => typeMap.set(Boolean, null)).toThrow(TypeError);
  });

  test("set/getでクラスのインスタンスを扱える", () => {
    const foo = new Foo();
    typeMap.set(Foo, foo);
    expect(typeMap.get(Foo)).toBe(foo);
  });

  test("setでvalueがkeyのインスタンスでないとエラーになる", () => {
    expect(() => typeMap.set(Foo, {})).toThrow(TypeError);
    expect(() => typeMap.set(Date, "not a date")).toThrow(TypeError);
  });

  test("keyがコンストラクタ関数でないとsetはエラーになる", () => {
    expect(() => typeMap.set({}, "value")).toThrow(TypeError);
    expect(() => typeMap.set(null, "value")).toThrow(TypeError);
    expect(() => typeMap.set("string", "value")).toThrow(TypeError);
    expect(() => typeMap.set(() => {}, "value")).toThrow(TypeError); // arrow function はコンストラクタじゃない
  });
});
