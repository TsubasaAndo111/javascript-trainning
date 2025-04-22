export function bitCount(x) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    if (x & 1) {
      result++;
    }
    x = x >>> 1;
  }
  return result;
}
