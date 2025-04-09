import { equalArrays } from "./index.js";

test("ch03-ex07", () => {
  const x = 1; 
  const y = 2;

  expect(equalArrays(x, y)).toBe(true);
  expect(x).not.toEqual(y);
});

