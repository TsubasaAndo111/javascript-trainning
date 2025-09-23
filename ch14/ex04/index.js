export class HiraganaChar {
  constructor(char) {
    if (!/^[\u3041-\u309F]$/.test(char)) {
      throw new Error("The input is not a single hiragana character.");
    }
    this.char = char;
    this.code = char.charCodeAt(0); // UTF16の値
  }

  [Symbol.toPrimitive](type) {
    if (type === "number") {
      return this.code;
    } else {
      return this.char; // 'string'または'default'
    }
  }

  toString() {
    return this.char;
  }

  valueOf() {
    return this.code;
  }
}
