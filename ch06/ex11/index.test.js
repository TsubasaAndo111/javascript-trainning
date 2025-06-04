import { obj } from "./index.js";

describe("objのテスト", () => {
  test("xにNaNをセット", () => {
    expect(() => {
      obj.x = NaN;
    }).toThrow();
  });

  test("yにNaNをセット", () => {
    expect(() => {
      obj.y = NaN;
    }).toThrow();
  });

  test("xに整数をセット", () => {
    obj.x = 4
    expect(obj.x).toBeCloseTo(4);
  });

  test("yに整数をセット", () => {
    obj.y = 4
    expect(obj.y).toBeCloseTo(4);
  });

  test("x,yに整数をセット", () => {
    obj.x= 3
    obj.y= 4
    expect(obj.r).toBeCloseTo(5);
    expect(obj.theta).toBeCloseTo(0.92729521800161);
  });

  test("rにのみ整数をセット", () => {
    obj.r = 5
    obj.theta = 0;
    expect(obj.x).toBeCloseTo(5);
    expect(obj.y).toBeCloseTo(0);
  });

  test("r,thetaに整数をセット", () => {
    obj.r = 5
    obj.theta = 0.92729521800161;
    expect(obj.x).toBeCloseTo(3);
    expect(obj.y).toBeCloseTo(4);
  });
  
});
