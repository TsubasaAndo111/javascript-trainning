test("テスト名を適切につけてなさい", () => {
  let points = [
    { x: 1, y: 2 },
    { x: 3, y: 4 },
  ];

  // この文でx1に1、y1に2と代入されるのが少し違和感
  // 左辺と右辺を同じ形式で書き、変数と値を対応させているみたい
  let [{ x: x1, y: y1 }, { x: x2, y: y2 }] = points;

  expect(x1).toBe(1);
  expect(y1).toBe(2);
  expect(x2).toBe(3);
  expect(y2).toBe(4);
});
