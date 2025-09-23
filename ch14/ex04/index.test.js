import { HiraganaChar } from "./index.js";

describe("HiraganaChar", () => {
  test("正しいひらがな1文字で初期化できる", () => {
    const h = new HiraganaChar("あ");
    expect(h.char).toBe("あ");
    expect(h.code).toBe(0x3042);
  });

  test("ひらがな以外の文字でエラーが出る", () => {
    expect(() => new HiraganaChar("A")).toThrow();
    expect(() => new HiraganaChar("あい")).toThrow();
  });

  test("Symbol.toPrimitive（string）では文字列が返る", () => {
    const h = new HiraganaChar("あ");
    expect(`${h}`).toBe("あ");
    expect(String(h)).toBe("あ");
  });

  test("Symbol.toPrimitive（number）ではコードポイントが返る", () => {
    const h = new HiraganaChar("あ");
    expect(+h).toBe(0x3042);
    expect(Number(h)).toBe(0x3042);
  });

  test("default hint でも文字列が返る", () => {
    const h = new HiraganaChar("あ");
    expect(h + "").toBe("あ");
    expect(`${h}`).toBe("あ");
  });

  test("比較（< や >）が正しく動作する", () => {
    const a = new HiraganaChar("あ"); // 12354
    const ka = new HiraganaChar("か"); // 12363
    const sa = new HiraganaChar("さ"); // 12373

    expect(a < ka).toBe(true);
    expect(ka < sa).toBe(true);
    expect(sa > a).toBe(true);
  });

  test("配列ソートで50音順になる", () => {
    const chars = [
      new HiraganaChar("さ"),
      new HiraganaChar("か"),
      new HiraganaChar("な"),
      new HiraganaChar("た"),
      new HiraganaChar("あ"),
    ];

    const sorted = chars.sort((a, b) => (a < b ? -1 : 1));
    const result = sorted.map((c) => String(c));

    expect(result).toEqual(["あ", "か", "さ", "た", "な"]);
  });
});
