import { typeTemplate } from "./index.js";

describe("typeTemplate", () => {
  test("文字列の型を返す", () => {
    const result = typeTemplate`${"Hello"}`;
    expect(result).toBe("string");
  });

  test("数値と真偽値の型を返す", () => {
    const result = typeTemplate`値は ${123} と ${true}`;
    expect(result).toBe("値は number と boolean");
  });

  test("オブジェクトの型を返す", () => {
    const result = typeTemplate`${{ x: 1 }}`;
    expect(result).toBe("object");
  });

  test("null の型は object と判定される（typeof の仕様）", () => {
    const result = typeTemplate`${null}`;
    expect(result).toBe("object");
  });

  test("undefined の型を返す", () => {
    const result = typeTemplate`${undefined}`;
    expect(result).toBe("undefined");
  });

  test("複数の型を順番に返す", () => {
    const result = typeTemplate`Types: ${"abc"}, ${123}, ${false}, ${Symbol(
      "sym"
    )}`;
    expect(result).toBe("Types: string, number, boolean, symbol");
  });

  test("テンプレートリテラルなしの場合はエラー", () => {
    const result = typeTemplate``;
    expect(result).toBe("");
  });

  test("テンプレートリテラル以外の呼び出しはエラーになる", () => {
    expect(() => {
      typeTemplate("test");
    }).toThrow();

    expect(() => {
      typeTemplate(["aa", "bb", "cc"], "dd", "ee");
    }).toThrow();
  });
});
