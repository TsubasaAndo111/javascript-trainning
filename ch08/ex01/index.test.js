import { repeatChar, square, getNow } from "./index.js";
import { jest } from "@jest/globals";

describe("repeatChar", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {}); // console.log を監視しつつ、意味のない変数に出力を置き換えることテスト結果にconsole.logの出力結果を表示しない
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  test("自然数と英文字を引数に設定", () => {
    const result = repeatChar(3, "A");
    expect(result).toEqual(["A", "A", "A"]);
    expect(console.log).toHaveBeenCalledTimes(3); //console.logが呼び出された回数
    expect(console.log).toHaveBeenCalledWith("A"); // console.logが一度でも"A"を引数として呼ばれたか確認
  });

  test("自然数と数文字を引数に設定", () => {
    const result = repeatChar(3, "2");
    expect(result).toEqual(["2", "2", "2"]);
    expect(console.log).toHaveBeenCalledTimes(3); //console.logが呼び出された回数
    expect(console.log).toHaveBeenCalledWith("2"); // console.logが一度でも"A"を引数として呼ばれたか確認
  });

  test("nが0", () => {
    expect(() => repeatChar(0, "A")).toThrow();
  });

  test("nが小数", () => {
    expect(() => repeatChar(2.5, "A")).toThrow();
  });

  test("cが英数文字2文字以上", () => {
    expect(() => repeatChar(2, "AB")).toThrow();
  });

  test("cが記号", () => {
    expect(() => repeatChar(2, "!")).toThrow(
      "c は英数字1文字でなければなりません"
    );
  });

  test("cが数字", () => {
    expect(() => repeatChar(2, 3)).toThrow(
      "c は英数字1文字でなければなりません"
    );
  });
});

describe("square", () => {
  test("正の整数の二乗を返す", () => {
    expect(square(3)).toBe(9);
    expect(square(10)).toBe(100);
  });

  test("0の二乗は0", () => {
    expect(square(0)).toBe(0);
  });

  test("負の整数の二乗を返す", () => {
    expect(square(-4)).toBe(16);
  });

});

describe('getNow', () => {
    test('現在時刻を返せているか', () => {
      const before = new Date();
  
      const result = getNow();
  
      const after = new Date();
    
      // now は before と after の間の値であること
      expect(result.now.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(result.now.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  
  });