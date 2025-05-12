// 非strictモードなら変数宣言なしでも実行できる
function f() {
  a = 10;
  console.log(a);
}

f();
