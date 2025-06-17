import { DynamicSizeArray } from "./index.js";

describe('DynamicSizeArray', () => {
  let arr;

  beforeEach(() => {
    arr = new DynamicSizeArray();
  });

  test('初期状態は空で length は 0', () => {
    expect(arr.length()).toBe(0);
  });

  test('push で要素を追加し get で取得できる', () => {
    arr.push(10);
    arr.push(20);
    expect(arr.length()).toBe(2);
    expect(arr.get(0)).toBe(10);
    expect(arr.get(1)).toBe(20);
  });

  test('set で要素の更新ができる', () => {
    arr.push(10);
    expect(arr.get(0)).toBe(10);
    arr.set(0, 15);
    expect(arr.get(0)).toBe(15);
  });
  
  test('get, set で範囲外アクセスするとエラーを投げる', () => {
    arr.push(10);
    expect(() => arr.get(-1)).toThrow();
    expect(() => arr.get(2)).toThrow();
    expect(() => arr.set(-1, 0)).toThrow();
    expect(() => arr.set(4, 0)).toThrow();
  });

  test('push で容量を超えたら自動で容量拡張される', () => {
    // 初期容量は4なので4個pushまではそのまま
    for (let i = 0; i < 4; i++) {
      arr.push(i);
    }
    expect(arr.length()).toBe(4);
    for (let i = 0; i < 4; i++) {
      expect(arr.get(i)).toBe(i);
    }

    // 5個目をpushすると容量拡張が発生
    arr.push(4);
    expect(arr.length()).toBe(5);
    expect(arr.array.length()).toBe(8); // 固定長配列のサイズが2倍になった
    for (let i = 0; i < 5; i++) {
      expect(arr.get(i)).toBe(i);
    }
  });
  
});
