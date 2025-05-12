// with文
{
  let a = 1;
  let b = 2;
  let obj = { a: 3, b: 4 };
  with (obj) {
    a = b;
  }
  console.log({ a, b, obj });
  // console.log の出力: { a: 1, b: 2, obj: { a: 4, b: 4 }}
  // with 文を使わずに同じ処理を書く場合: obj.a = obj.b
}
{
  let a = 1;
  let b = 2;
  let obj = { b: 4 };
  with (obj) {
    a = b;  // ここのaはobjのプロパティに存在しないため、letで宣言されたa、with文のなかで新たなプロパティは生成されない
  }
  console.log({ a, b, obj });
  // console.log の出力: { a: 4, b: 2, obj: { b: 4 } }
  // with 文を使わずに同じ処理を書く場合: a = obj.b
}
{
  let a = 1;
  let b = 2;
  let obj = { a: 3 };
  with (obj) {
    a = b;  // ここのaはobjのプロパティ、bはletで宣言されたもの
  }
  console.log({ a, b, obj });
  // console.log の出力:{ a: 1, b: 2, obj: { a: 2 } }
  // with 文を使わずに同じ処理を書く場合: obj.a = b
}
{
  let a = 1;
  let b = 2;
  let obj = {};
  with (obj) {
    a = b;  // ここのa,bはletで宣言されたもの、with文のなかで新たなプロパティは生成されない
  }
  console.log({ a, b, obj });
  // console.log の出力:{ a: 2, b: 2, obj: {} }
  // with 文を使わずに同じ処理を書く場合: a = b
}
