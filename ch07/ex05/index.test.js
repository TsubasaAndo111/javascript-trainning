import { push, pop, shift, unshift, sort } from "./index.js";

describe("push", () => {
  test("第一引数に配列、第二引数に数値が入力されたとき", () => {
    const seq = [1, 2, 3, 4, 5];
    const sample = [1, 2, 3, 4, 5];
    const result = push(seq, 6);
    expect(sample).toEqual(seq);
    seq.push(6);
    expect(seq).toEqual(result);
  });

  test("第一引数に配列、第二引数に配列が入力されたとき", () => {
    const seq = [1, 2, 3, 4, 5];
    const sample = [1, 2, 3, 4, 5];
    const result = push(seq, [6, 7]);
    expect(sample).toEqual(seq);
    seq.push([6, 7]);
    expect(seq).toEqual(result);
  });

  test("配列以外が入力されたとき", () => {
    const seq = 1;
    expect(() => push(seq, 6).toThrow());
  });
});

describe("pop", () => {
  test("配列が入力されたとき", () => {
    const seq = [1, 2, 3, 4, 5];
    const sample = [1, 2, 3, 4, 5];
    const result = pop(seq);
    expect(sample).toEqual(seq);
    seq.pop();
    expect(seq).toEqual(result);
  });

  test("配列以外が入力されたとき", () => {
    const seq = 1;
    expect(() => pop(seq).toThrow());
  });
});

describe("shift", () => {
    test("配列が入力されたとき", () => {
      const seq = [1, 2, 3, 4, 5];
      const sample = [1, 2, 3, 4, 5];
      const result = shift(seq);
      expect(sample).toEqual(seq);
      seq.shift();
      expect(seq).toEqual(result);
    });
  
    test("配列以外が入力されたとき", () => {
      const seq = 1;
      expect(() => pop(seq).toThrow());
    });
  });

describe("unshift", () => {
    test("第一引数に配列、第二引数に数値が入力されたとき", () => {
      const seq = [1, 2, 3, 4, 5];
      const sample = [1, 2, 3, 4, 5];
      const result = unshift(seq, 0);
      expect(sample).toEqual(seq);
      seq.unshift(0);
      expect(seq).toEqual(result);
    });
  
    test("第一引数に配列、第二引数に配列が入力されたとき", () => {
      const seq = [1, 2, 3, 4, 5];
      const sample = [1, 2, 3, 4, 5];
      const result = unshift(seq, [6, 7]);
      expect(sample).toEqual(seq);
      seq.unshift([6, 7]);
      expect(seq).toEqual(result);
    });
    
    test("配列以外が入力されたとき", () => {
      const seq = 1;
      expect(() => unshift(seq, 6).toThrow());
    });
  });
  

  describe("sort", () => {
    test("sort(seq, (a, b) => b - a)", () => {
      const seq = [1, 2, 3, 4, 5];
      const sample = [1, 2, 3, 4, 5];
      const result = unshift(seq, 0);
      expect(sample).toEqual(seq);
      seq.unshift(0);
      expect(seq).toEqual(result);
    });
  
    test("第一引数に配列、第二引数に配列が入力されたとき", () => {
      const seq = [1, 2, 3, 4, 5];
      const sample = [1, 2, 3, 4, 5];
      const result = sort(seq, (a, b) => b - a);
      expect(sample).toEqual(seq);
      seq.sort((a, b) => b - a)
      expect(seq).toEqual(result);
    });
    
    test("配列以外が入力されたとき", () => {
      const seq = 1;
      expect(() => sort(seq, (a, b) => b - a).toThrow());
    });
  });
  