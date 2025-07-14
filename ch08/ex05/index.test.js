import { sequenceToObject } from "./index.js";

describe('sequenceToObject', () => {
  test('通常の動作：文字列キーと値のペア', () => {
    expect(sequenceToObject("a", 1, "b", 2)).toEqual({ a: 1, b: 2 });
  });

  test('スプレッド演算子を使った配列入力', () => {
    const input = ["a", 1, "b", 2];
    expect(sequenceToObject(...input)).toEqual({ a: 1, b: 2 });
  });

  test('キーが文字列でないときにエラーを投げる（number）', () => {
    expect(() => sequenceToObject(1, "value")).toThrow();
  });

  test('キーが文字列でないときにエラーを投げる（boolean）', () => {
    expect(() => sequenceToObject(true, "value")).toThrow();
  });

  test('空の入力で空オブジェクトを返す', () => {
    expect(sequenceToObject()).toEqual({});
  });
});
