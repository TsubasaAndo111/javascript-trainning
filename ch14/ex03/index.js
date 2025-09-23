// 「合成可能なダイアクリティカルマーク」は、文字にアクセントや発音記号を後から「合成」して付けられる特殊な記号のこと
export class IgnoreAccentPattern {
  constructor(pattern) {
    if (typeof pattern === "string") {
      this.source = pattern;
      this.flags = "";
    } else if (pattern instanceof RegExp) {
      this.source = pattern.source; // 正規表現の中身
      this.flags = pattern.flags; // 正規表現のオプション(g,i)
    } else {
      throw new TypeError("Invalid pattern type");
    }

    // 正規化・ダイアクリティカルマーク除去のためにソースを変換
    this.normalizedSource = this.removeDiacritics(this.source);
    this.regex = new RegExp(this.normalizedSource, this.flags);
  }

  // ダイアクリティカルマークを除去する関数
  removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  [Symbol.search](target) {
    const normalizedTarget = this.removeDiacritics(target);
    return normalizedTarget.search(this.regex);
  }

  [Symbol.match](target) {
    const normalizedTarget = this.removeDiacritics(target);
    const result = normalizedTarget.match(this.regex);

    return result;
  }
}
