import { cache} from "./index.js";
import { jest } from "@jest/globals";

describe('cache', () => {
    
  test('同じオブジェクトの引数ではキャッシュが使われる', () => {
    const slowFn = jest.fn(obj => Object.keys(obj).length);
    const cachedSlowFn = cache(slowFn);

    const obj = { a: 1, b: 2 };
    const result1 = cachedSlowFn(obj);
    const result2 = cachedSlowFn(obj);

    expect(result1).toBe(2);
    expect(result2).toBe(2);
    expect(slowFn).toHaveBeenCalledTimes(1);

  });

  test('異なるオブジェクトではキャッシュが使われない', () => {
    const slowFn = jest.fn(obj => Object.keys(obj).length);
    const cachedSlowFn = cache(slowFn);

    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    const result1 = cachedSlowFn(obj1);
    const result2 = cachedSlowFn(obj2);

    expect(result1).toBe(1);
    expect(result2).toBe(1);
    expect(slowFn).toHaveBeenCalledTimes(2);
  });

  test('引数が関数でないとエラーになる', () => {
    expect(() => cache(123)).toThrow(TypeError);
    expect(() => cache(null)).toThrow(TypeError);
    expect(() => cache({})).toThrow(TypeError);
  });
});
