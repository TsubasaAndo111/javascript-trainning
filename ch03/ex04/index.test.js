describe("ch03/ex04", () => {
  it("Hundred Points Symbolの絵文字表現の文字数確認", () => {
    const HundredPointsSymbol = "💯";
    const actual = HundredPointsSymbol.length;
    const expected = 2;
    expect(actual).toBe(expected);
  });

  it("Hundred Points Symbolの絵文字表現と\\uD83D\\uDCAFの同値確認", () => {
    const actual = "💯";
    const expected = "\uD83D\uDCAF";
    expect(actual).toBe(expected);
  });

  it("Hundred Points Symbolの絵文字表現と\\u{0001F4AF}の同値確認", () => {
    const actual = "💯";
    const expected = "\u{0001F4AF}";
    expect(actual).toBe(expected);
  });
  
});
