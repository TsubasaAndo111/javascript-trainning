// while
export function fibWhile() {
  const fib = [0, 1];
  let i = 2;
  while (i <= 10) {
    fib[i] = fib[i - 1] + fib[i - 2];
    i++;
  }
  return fib;
}

// do/while
export function fibDoWhile() {
  const fib = [0, 1];
  let i = 2;
  do {
    fib[i] = fib[i - 1] + fib[i - 2];
    i++;
  } while (i <= 10);
  return fib;
}

// for
export function fibFor() {
  const fib = [0, 1];
  for (let i = 2; i <= 10; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib;
}
