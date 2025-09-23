import { createLoggingProxy } from "./index.js";

describe("createLoggingProxy", () => {
  let obj, proxy, callHistory;

  beforeEach(() => {
    obj = {
      greet(name) {
        return `Hello, ${name}!`;
      },
      add(a, b) {
        return a + b;
      },
    };

    const result = createLoggingProxy(obj);
    proxy = result.proxy;
    callHistory = result.callHistory;
  });

  test("メソッドが意図通りの動きをする", () => {
    expect(proxy.greet("Alice")).toBe("Hello, Alice!");
    expect(proxy.add(2, 3)).toBe(5);
  });

  test("メソッド呼び出し時にログが正しく記録される", () => {
    proxy.greet("Bob");
    proxy.add(10, 20);

    expect(callHistory.length).toBe(2);

    expect(callHistory[0]).toMatchObject({
      method: "greet",
      arguments: ["Bob"],
    });

    expect(callHistory[1]).toMatchObject({
      method: "add",
      arguments: [10, 20],
    });

    expect(callHistory[0].timestamp instanceof Date).toBe(true);
    expect(callHistory[1].timestamp instanceof Date).toBe(true);
  });

  test("メソッド以外はログが記録されない", () => {
    obj.name = "Test";
    const { proxy: proxy2, callHistory: history2 } = createLoggingProxy(obj);

    const name = proxy2.name;
    expect(name).toBe("Test");
    expect(history2.length).toBe(0); // メソッド呼び出しでないので履歴なし
  });
});
