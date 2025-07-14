import { Warrior, MagicWarrior } from "./index.js";

describe('Warrior', () => {
  test('attack()は攻撃力の2倍を返す', () => {
    const w = new Warrior(10);
    expect(w.attack()).toBe(20);
  });
});

describe('MagicWarrior', () => {
  test('attack()は攻撃力の2倍+mgcを返す', () => {
    const mw = new MagicWarrior(10, 5);
    expect(mw.attack()).toBe(25);
  });

  test('should inherit from Warrior', () => {
    const mw = new MagicWarrior(10, 5);
    expect(mw instanceof Warrior).toBe(true);
  });
});
