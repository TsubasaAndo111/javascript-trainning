import { add, sub, mul, div } from "./index.js";

describe("add", () => {
  it("実部と虚部が正の値", () => {
    const compNum1 = {
      re: 10,
      im: 5,
    };

    const compNum2 = {
      re: 5,
      im: 2,
    };
    const actual = add(compNum1, compNum2);
    const expected = "15+7i";
    expect(actual).toBe(expected);
  });

  it("実部が正、虚部が負の値", () => {
    const compNum1 = {
      re: 10,
      im: -5,
    };

    const compNum2 = {
      re: 5,
      im: 2,
    };
    const actual = add(compNum1, compNum2);
    const expected = "15-3i";
    expect(actual).toBe(expected);
  });

  it("実部が負、虚部が正の値", () => {
    const compNum1 = {
      re: -10,
      im: 5,
    };

    const compNum2 = {
      re: 5,
      im: 2,
    };
    const actual = add(compNum1, compNum2);
    const expected = "-5+7i";
    expect(actual).toBe(expected);
  });

  it("実部と虚部が負の値", () => {
    const compNum1 = {
      re: -10,
      im: -5,
    };

    const compNum2 = {
      re: 5,
      im: 2,
    };
    const actual = add(compNum1, compNum2);
    const expected = "-5-3i";
    expect(actual).toBe(expected);
  });
});

describe("sub", () => {
  it("実部と虚部が正の値", () => {
    const compNum1 = {
      re: 10,
      im: 5,
    };

    const compNum2 = {
      re: 5,
      im: 2,
    };
    const actual = sub(compNum1, compNum2);
    const expected = "5+3i";
    expect(actual).toBe(expected);
  });

  it("実部が正、虚部が負の値", () => {
    const compNum1 = {
      re: 10,
      im: -5,
    };

    const compNum2 = {
      re: 5,
      im: 2,
    };
    const actual = sub(compNum1, compNum2);
    const expected = "5-7i";
    expect(actual).toBe(expected);
  });

  it("実部が負、虚部が正の値", () => {
    const compNum1 = {
      re: -10,
      im: 5,
    };

    const compNum2 = {
      re: 5,
      im: 2,
    };
    const actual = sub(compNum1, compNum2);
    const expected = "-15+3i";
    expect(actual).toBe(expected);
  });

  it("実部と虚部が負の値", () => {
    const compNum1 = {
      re: -10,
      im: -5,
    };

    const compNum2 = {
      re: 5,
      im: 2,
    };
    const actual = sub(compNum1, compNum2);
    const expected = "-15-7i";
    expect(actual).toBe(expected);
  });
});

describe("mul", () => {
  it("mul1", () => {
    const compNum1 = {
      re: 10,
      im: 5,
    };

    const compNum2 = {
      re: 5,
      im: 2,
    };
    const actual = mul(compNum1, compNum2);
    const expected = "40+45i";
    expect(actual).toBe(expected);
  });
});

describe("div", () => {
  it("div1", () => {
    const compNum1 = {
      re: 10,
      im: 5,
    };

    const compNum2 = {
      re: 5,
      im: 2,
    };
    const actual = div(compNum1, compNum2);
    const expected = "(60+5i)/29";
    expect(actual).toBe(expected);
  });
});
