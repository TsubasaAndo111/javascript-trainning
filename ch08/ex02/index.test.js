
import { powerIterative, powerRecursive } from "./index.js";


describe('powerRecursive', () => {
  test('2^0 = 1', () => {
    expect(powerRecursive(2, 0)).toBe(1);
  });

  test('2^1 = 2', () => {
    expect(powerRecursive(2, 1)).toBe(2);
  });

  test('2^11 = 1024', () => {
    expect(powerRecursive(2, 10)).toBe(1024);
  });

  test('2^8 = 256', () => {
    expect(powerRecursive(2, 8)).toBe(256);
  });

});

describe('powerIterative', () => {
  test('2^0 = 1', () => {
    expect(powerIterative(2, 0)).toBe(1);
  });

  test('2^1 = 2', () => {
    expect(powerIterative(2, 1)).toBe(2);
  });

  test('2^11 = 1024', () => {
    expect(powerIterative(2, 10)).toBe(1024);
  });

  test('2^8 = 256', () => {
    expect(powerIterative(2, 8)).toBe(256);
  });
});
