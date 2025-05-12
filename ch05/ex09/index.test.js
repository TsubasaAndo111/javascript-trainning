import { parseJSON } from "./index.js";

describe("parseJSON", () => {
  it("空配列", () => {
    const s = "[]";
    const expected = {success: true, data: []};
    expect(parseJSON(s)).toEqual(expected);
  });

  it("null", () => {
    const s = null;
    const expected = {success: true, data: null};
    expect(parseJSON(s)).toEqual(expected);
  });

  it("シンプルなオブジェクト", () => {
    const s = '{"a": "10", "b": "20"}';
    const expected = {success: true, data: { a: '10', b: '20' }};
    expect(parseJSON(s)).toEqual(expected);
  });

  it("文字列", () => {
    const s = '"aaa"';
    const expected = {success: true, data: 'aaa'};
    expect(parseJSON(s)).toEqual(expected);
  });

  it("文字列を正しく記載していない場合", () => {
    const s = "aaa";
    const expected = {success: false, data: `Unexpected token 'a', "aaa" is not valid JSON`};
    expect(parseJSON(s)).toEqual(expected);
  });

});
