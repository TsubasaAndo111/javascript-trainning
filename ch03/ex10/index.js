let obj = {
  name: "田中",
  age: 16,
  from: "東京",
};

// 配列でもうまくいく
// let obj = ['田中', '佐藤', '小林'];

// for-inはプロパティのキーをとってくる
console.log("プロパティのキーの一覧");
for (let key in obj) {
  console.log(key);
}

console.log("\n");

console.log("プロパティの値の一覧");
for (let value in obj) {
  console.log(obj[value]);
}
