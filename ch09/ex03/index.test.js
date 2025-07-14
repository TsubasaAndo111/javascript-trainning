import { PositiveNumber } from "./index.js";

describe('PositiveNumber', () => {
  test('初期値が正ならインスタンスが生成される', () => {
    const num = PositiveNumber(5);
    expect(num.getX()).toBe(5);
  });

  test('初期値が0以下ならエラーになる', () => {
    expect(() => PositiveNumber(0)).toThrow();
    expect(() => PositiveNumber(-10)).toThrow();
  });

  test('setXで正の数に変更できる', () => {
    const num = PositiveNumber(3);
    num.setX(7);
    expect(num.getX()).toBe(7);
  });

  test('setXで0以下にしようとするとエラーになる', () => {
    const num = PositiveNumber(3);
    expect(() => num.setX(0)).toThrow();
    expect(() => num.setX(-1)).toThrow();
  });

  test('外部から直接xを操作できない', () => {
    const num = PositiveNumber(10);
    expect(num.x).toBeUndefined(); // 外からアクセス不可なことをテスト(xというプロパティが存在しないこと)
  });
});
