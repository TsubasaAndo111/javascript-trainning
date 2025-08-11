import { sortJapanese, toJapaneseDateString } from "./index.js";

describe("sortJapanese", () => {
  test("ひらがな、カタカナ、濁点・半濁点、小文字の違いを無視してソートできる", () => {
    const input = [
      "ばなな",
      "パンダ",
      "ハナ",
      "はなな",
      "バナナ",
      "ぱんだ",
      "はんだ",
      "はな",
    ];
    const expected = [
      "ハナ",
      "はな",
      "ばなな",
      "はなな",
      "バナナ",
      "パンダ",
      "ぱんだ",
      "はんだ",
    ];

    const result = sortJapanese(input);
    expect(result).toEqual(expected);
  });

  test("促音（っ・つ）の違いも無視できるかの確認）", () => {
    const input = ["かっこ", "かつこ"];
    const expected = ["かっこ", "かつこ"];
    const result = sortJapanese(input);
    // 無視しない場合は"っ"の方が後にソートされるはず
    expect(result).toEqual(expected);
  });
});

describe("toJapaneseDateString", () => {
  test("昭和64年1月7日（昭和最後の日）", () => {
    const date = new Date(1989, 0, 7);
    expect(toJapaneseDateString(date)).toBe("昭和64年1月7日");
  });

  test("平成元年1月8日（平成の初日）", () => {
    const date = new Date(1989, 0, 8);
    expect(toJapaneseDateString(date)).toBe("平成1年1月8日");
  });

  test("平成31年4月30日（平成最後の日）", () => {
    const date = new Date(2019, 3, 30);
    expect(toJapaneseDateString(date)).toBe("平成31年4月30日");
  });

  test("令和元年5月1日（令和の初日）", () => {
    const date = new Date(2019, 4, 1);
    expect(toJapaneseDateString(date)).toBe("令和1年5月1日");
  });
});
