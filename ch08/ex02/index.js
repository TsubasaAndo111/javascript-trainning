export function powerRecursive(x, n) {
  if (n === 0) return 1;
  if (n === 1) return x;
  
  // 偶数と奇数で場合分け
  if (n % 2 == 0) {
    const result = powerRecursive(x, Math.floor(n / 2));
    return result * result;
  } else {
    const result = powerRecursive(x, n - 1);
    return x * result;
  }
}

export function powerIterative(x, n) {
    let result = 1;
    let base = x;
    let exponent = n;
  
    while (exponent > 0) {
      // 奇数の場合はb∗b^(n-1)を先に計算する
      // b5=b∗b4b^5 = b * b^4b5=b∗b4とb4=b2∗b2b^4 = b^2 * b^2b4=b2∗b2を1回のループで行っている
      if (exponent % 2 === 1) {
        result *= base;
      }
      base *= base;
      exponent = Math.floor(exponent / 2);
    }
  
    return result;
  }
