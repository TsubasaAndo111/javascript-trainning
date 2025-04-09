class Example {
  // コンストラクタ
  constructor() {
    this.name = "example";
    this.value = 10;
  }

  valueOf() {
    return this.value;
  }

  toString() {
    return this.value.toString();
  }
}

let obj = new Example();

// 数値優先アルゴリズム（valueOf()→toString()）
console.log("数値優先アルゴリズム（valueOf()→toString()）");
console.log(obj + 1); // 11

// 文字列優先アルゴリズム（valueOf()→toString()）
console.log("文字列優先アルゴリズム（toString()→valueOf()）");
console.log(obj + "1"); // 101

// console.logはオブジェクトのプロパティを表示する
// このとき、toString()やvalueOf()は呼び出されない
console.log(obj); // Example { name: 'example', value: 10 } 
