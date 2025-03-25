import { compare } from "./index.js";

describe("compare", () => {
  it("returns true value when 0.3 - 0.2, 0.1 given", () => {
    expect(compare(0.3 - 0.2, 0.1)).toBe(true);
  });

  it("returns true value when 0.2 - 0.1, 0.1 given", () => {
    expect(compare(0.2 - 0.1, 0.1)).toBe(true);
  });

  it("returns false value when 0.2 - 0.1, 0.100000001 given", () => {
    expect(compare(0.2 - 0.1, 0.100000001)).toBe(false);
  });

  it("returns true value when 0.2 - 0.1, 0.1000000001 given", () => {
    expect(compare(0.2 - 0.1, 0.1000000001)).toBe(true);
  });
});
