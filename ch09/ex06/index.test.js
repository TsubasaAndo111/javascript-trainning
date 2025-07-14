// TypedMap.test.js
import { TypedMap } from "./index.js";

describe('TypedMap (composition)', () => {
  test('定義した型でsetする場合', () => {
    const map = new TypedMap('string', 'number');
    map.set('age', 30);
    expect(map.get('age')).toBe(30);
  });

  test('keyの型が正しくない場合', () => {
    const map = new TypedMap('string', 'number');
    expect(() => map.set(123, 45)).toThrow(TypeError);
  });

  test('valueの方が正しくない場合', () => {
    const map = new TypedMap('string', 'number');
    expect(() => map.set('key', 'not-a-number')).toThrow(TypeError);
  });

  test('定義した型で、コンストラクタに初期値を渡す場合', () => {
    const map = new TypedMap('string', 'number', [['age', 30]]);
    expect(map.get('age')).toBe(30);
  });

  test('定義した型以外で、コンストラクタに初期値を渡す場合', () => {
    expect(() => {
      new TypedMap('string', 'number', [['age', 'not-a-number']]);
    }).toThrow(TypeError);
  });

});
