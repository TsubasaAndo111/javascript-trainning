export function* resetCounter() {
  let count = 0;
  while (true) {
    try {
      yield count++;
    } catch (e) {
      count = 0;
      yield count; // throwのときもyieldまで実行されるため、ここでいったん値を返す
    }
  }
}
