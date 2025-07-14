import { instanceOf } from "./index.js";

describe('instanceOf', () => {
  test('多段に継承したクラスのインスタンスと基底クラスのコンストラクタを入力するケース', () => {
    class A {}
    class B extends A {}
    class C extends B {}
    const c = new C();

    expect(instanceOf(c, C)).toBe(true);
    expect(instanceOf(c, B)).toBe(true);
    expect(instanceOf(c, A)).toBe(true);
    expect(instanceOf(c, Object)).toBe(true);
  });

  test('継承関係にないインスタンスとクラスのコンストラクタを入力するケース', () => {
    class X {}
    class Y {}
    const x = new X();

    expect(instanceOf(x, Y)).toBe(false);
  });

  test('null や undefined を渡した場合', () => {
    expect(instanceOf(null, Object)).toBe(false);
    expect(instanceOf(undefined, Object)).toBe(false);
  });
});
