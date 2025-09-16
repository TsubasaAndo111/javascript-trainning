// index.test.js
import { retryWithExponentialBackoff } from "./index.js";
import { jest } from "@jest/globals";

describe("retryWithExponentialBackoff (using real timers)", () => {
  let func;

  beforeEach(() => {
    func = jest.fn();
    jest.useRealTimers(); // jest.useFakeTimers()だと上手く動かなかったため（awaitとかのマイクロタスクだと上手く動かない？）
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("func が成功したらその値で resolve される", async () => {
    func.mockResolvedValue("success");

    const result = await retryWithExponentialBackoff(func, 3);

    expect(result).toBe("success");
    expect(func).toHaveBeenCalledTimes(1);
  });

  test("func が失敗し続けると maxRetry 回で reject される", async () => {
    func.mockRejectedValue(new Error("failed"));

    await expect(retryWithExponentialBackoff(func, 2)).rejects.toThrow();
    expect(func).toHaveBeenCalledTimes(3); // 初回 + 2回リトライ
  });

  test("途中で成功すれば resolve される", async () => {
    func
      .mockRejectedValueOnce(new Error("fail 1"))
      .mockRejectedValueOnce(new Error("fail 2"))
      .mockResolvedValueOnce("recovered");

    const result = await retryWithExponentialBackoff(func, 5);

    expect(result).toBe("recovered");
    expect(func).toHaveBeenCalledTimes(3);
  });

  test("指数関数的に遅延している", async () => {
    func
      .mockRejectedValueOnce(new Error("1")) // delay: 1000
      .mockRejectedValueOnce(new Error("2")) // delay: 2000
      .mockRejectedValueOnce(new Error("3")) // delay: 4000
      .mockResolvedValueOnce("done");

    const start = Date.now();
    const result = await retryWithExponentialBackoff(func, 5);
    const end = Date.now();

    const elapsed = end - start;

    // delay: 1000 + 2000 + 4000 = 7000ms
    expect(elapsed).toBeGreaterThanOrEqual(6900);
    expect(result).toBe("done");
    expect(func).toHaveBeenCalledTimes(4);
  }, 10000);
});
