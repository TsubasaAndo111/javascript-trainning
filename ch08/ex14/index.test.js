import { any, catching } from "./index.js";

describe("any", () => {
  test("すべてfalseの場合", () => {
    const isNonZero = any(
      (n) => n > 0,
      (n) => n < 0
    );
    expect(isNonZero(0)).toBe(false);
  });

  test("ひとつでもtrueがある場合", () => {
    const isNonZero = any(
      (n) => n > 0,
      (n) => n < 0
    );
    expect(isNonZero(42)).toBe(true);
    expect(isNonZero(-0.5)).toBe(true);
  });
});

describe("catching", () => {
  test("エラーなしの場合", () => {
    const safeJsonParse = catching(JSON.parse, (e) => {
      return { error: e.toString() };
    });

    const result = safeJsonParse('{"a":1}');
    expect(result).toEqual({ a: 1 });
  });

  test("エラーありの場合", () => {
    const safeJsonParse = catching(JSON.parse, (e) => {
      return { error: e.toString() };
    });

    const result = safeJsonParse("{Invalid Json}");
    expect(result).toHaveProperty("error");
    expect(result.error).toMatch(/^SyntaxError:/);
  });
});
