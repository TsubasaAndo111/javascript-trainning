import { retryWithExponentialBackoff } from "./index.js";
import { jest } from "@jest/globals";

jest.useFakeTimers(); // テスト用に自由に設定可能なタイマーを定義

describe("retryWithExponentialBackoff", () => {
  let func;
  let callback;

  beforeEach(() => {
    // モック関数の定義
    func = jest.fn();
    callback = jest.fn();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  test("funcがtrueを返したらcallback(true)が呼ばれる", () => {
    func.mockReturnValue(true); // モック関数が返す値をtrueにする

    retryWithExponentialBackoff(func, 3, callback);

    // 最初はsetTimeoutで非同期なのでまだ呼ばれない
    expect(callback).not.toBeCalled();

    // 0ms経過させて最初のtryFuncを実行(0経過させるまでイベントは保留)
    jest.advanceTimersByTime(0);

    expect(func).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(true);
  });

  test("funcがfalseを返し続けてmaxRetry回リトライして失敗するとcallback(false)が呼ばれる", () => {
    func.mockReturnValue(false);

    retryWithExponentialBackoff(func, 2, callback);

    // 最初の非同期呼び出し(まだmaxRetryじゃないからcallbackは呼ばれないはず)
    jest.advanceTimersByTime(0);
    expect(func).toHaveBeenCalledTimes(1);
    expect(callback).not.toBeCalled();

    // 1秒後に2回目のtryFunc(まだmaxRetryじゃないからcallbackは呼ばれないはず)
    jest.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(2);
    expect(callback).not.toBeCalled();

    // 2秒後に3回目のtryFunc（maxRetry=2なので3回目で終了）
    jest.advanceTimersByTime(2000);
    expect(func).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith(false);
  });

  test("funcが途中でtrueを返したらcallback(true)が呼ばれる", () => {
    // 1回目: false, 2回目: false, 3回目: true
    func
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    retryWithExponentialBackoff(func, 5, callback);

    jest.advanceTimersByTime(0);     // 1回目
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(1000);  // 2回目
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(2000);  // 3回目
    expect(callback).toHaveBeenCalledWith(true);
    expect(func).toHaveBeenCalledTimes(3);
  });
  test("指数関数的に待ってfuncをリトライしている", () => {
    func.mockReturnValue(false);
  
    retryWithExponentialBackoff(func, 3, callback);
  
    jest.advanceTimersByTime(0); // 最初の呼び出し
    expect(func).toHaveBeenCalledTimes(1);
  
    jest.advanceTimersByTime(999);
    expect(func).toHaveBeenCalledTimes(1);  // まだ1秒経ってないから呼ばれない
  
    jest.advanceTimersByTime(1);
    expect(func).toHaveBeenCalledTimes(2);  // 1秒後に2回目の呼び出し
  
    jest.advanceTimersByTime(1999);
    expect(func).toHaveBeenCalledTimes(2);  // まだ2秒経ってない
  
    jest.advanceTimersByTime(1);
    expect(func).toHaveBeenCalledTimes(3);  // 2秒後に3回目の呼び出し
  
    jest.advanceTimersByTime(3999);
    expect(func).toHaveBeenCalledTimes(3);  // まだ4秒経ってない
  
    jest.advanceTimersByTime(1);
    expect(func).toHaveBeenCalledTimes(4);  // 4秒後に4回目の呼び出し
  });
  
});
