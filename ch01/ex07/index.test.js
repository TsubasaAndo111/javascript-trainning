import { Point } from "./index.js";

describe("add", () => {
  it("returns added points when positive value given", () => {
    let p = new Point(1, 1);
    p.add(2, 3);
    expect(p.x).toBe(3);
    expect(p.y).toBe(4);
  });

  it("returns subtracted points when negative value given", () => {
    let p = new Point(1, 1);
    p.add(-2, -3);
    expect(p.x).toBe(-1);
    expect(p.y).toBe(-2);
  });

  it("returns same points when zero value given", () => {
    let p = new Point(1, 1);
    p.add(0, 0);
    expect(p.x).toBe(1);
    expect(p.y).toBe(1);
  });
});
