class DefaultMap extends Map {
  constructor(defaultValue) {
    super();
    this.defaultValue = defaultValue;
  }

  get(key) {
    if (this.has(key)) {
      return super.get(key);
    } else {
      return this.defaultValue;
    }
  }
}

class Histogram {
  constructor() {
    this.letterCounts = new DefaultMap(0);
    this.totalLetters = 0;
  }
  add(text) {
    // 単語の切り分け処理
    const matches = text.toLowerCase().matchAll(/\w+|\$[\d.]+|\S+/g);
    const words = [...matches].map((r) => r[0]);

    // マップに登録 or 登録されていたら+1
    for (let word of words) {
      let count = this.letterCounts.get(word);
      this.letterCounts.set(word, count + 1);
      this.totalLetters++;
    }
  }

  toString() {
    let entries = [...this.letterCounts];

    entries.sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] < b[0] ? -1 : 1;
      } else {
        return b[1] - a[1];
      }
    });

    for (let entry of entries) {
      entry[1] = (entry[1] / this.totalLetters) * 100;
    }

    // 出現頻度 0.5% 以上を取得
    entries = entries.filter((entry) => entry[1] >= 0.5);
    // padStart で表示幅を揃える / # の数を n ではなく 10 * n に変更
    const lines = entries.map(
      ([l, n]) =>
        `${l.padStart(10)}: ${"#".repeat(Math.round(10 * n))} ${n.toFixed(2)}%`
    );

    return lines.join("\n");
  }
}

async function histogramFromStdin() {
  process.stdin.setEncoding("utf-8");
  let histogram = new Histogram();
  for await (let chunk of process.stdin) {
    histogram.add(chunk);
  }
  return histogram;
}

histogramFromStdin().then((histogram) => {
  console.log(histogram.toString());
});
