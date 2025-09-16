import { resetCounter } from "./index.js";

describe("resetCounter", () => {
  let counter;

  beforeEach(() => {
    counter = resetCounter();
  });

  test("初期状態は 0 を返す", () => {
    expect(counter.next().value).toBe(0);
  });

  test("呼び出すごとにインクリメントされる", () => {
    expect(counter.next().value).toBe(0);
    expect(counter.next().value).toBe(1);
    expect(counter.next().value).toBe(2);
  });

  test("throw() によりリセットされる", () => {
    expect(counter.next().value).toBe(0);
    expect(counter.next().value).toBe(1);

    const result = counter.throw(new Error("reset"));

    expect(counter.next().value).toBe(0);
  });
});
