// constで同じ変数を複数宣言
// constはブロックごとにスコープが適用されるため、文ブロックを分けることで可能
function ex01() {
  {
    const x = "abc";
    console.log(x);
  }

  {
    const x = "def";
    console.log(x);
  }
}

ex01();
