import { lftocrlf, crlftolf } from "./index.js";

describe("lftocrlf", () => {
  it("改行記号が1つの時", () => {
    const actual = lftocrlf("aaa\n");
    const expected = "aaa\r\n";
    expect(actual).toBe(expected);
  });

  it("改行記号が2つの時", () => {
    const actual = lftocrlf("aa\na\n");
    const expected = "aa\r\na\r\n";
    expect(actual).toBe(expected);
  });
});

describe("crlftolf", () => {
  it("改行記号が1つの時", () => {
    const actual = crlftolf("aaa\r\n");
    const expected = "aaa\n";
    expect(actual).toBe(expected);
  });

  it("改行記号が2つの時", () => {
    const actual = crlftolf("aa\r\na\r\n");
    const expected = "aa\na\n";
    expect(actual).toBe(expected);
  });
});
