import { abs, sum, factorial } from "./index.js";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  describe("sum", () => {
    it("returns positive sum value when positive arrays given", () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15);
    });

    it("returns negative sum value when negative arrays given", () => {
      expect(sum([-1, -2, -3, -4, -5])).toBe(-15);
    });

    it("returns sum value when positive and negative arrays given", () => {
      expect(sum([-1, 2, -3, 4, -5])).toBe(-3);
    });

    it("returns same value when 1 value given", () => {
      expect(sum([1])).toBe(1);
    });
  });

  describe("factorial", () => {
    it("returns factorial value when integer value given", () => {
      expect(factorial(5)).toBe(120);
    });

    it("returns 1 when zero value given", () => {
      expect(factorial(0)).toBe(1);
    });
  });
});
