// 何らかのリサイズを行う関数と思って読んで下さい
//
// - params には undefined またはオブジェクトが与えられる
// - params.maxWidth が与えられる場合 (正の整数と仮定して良い) はその値を利用する
// - params.maxHeight が与えられる場合 (正の整数と仮定して良い) はその値を利用する
function resize1(params) {
  let maxWidth = 600;
  let maxHeight = 480;

  maxWidth = params.maxWidth || maxWidth;
  params.maxHeight && (maxHeight = params.maxHeight);

  console.log({ maxWidth, maxHeight });
}

// ??は左辺がnullまたはundefinedのときに右辺の値を返す、それ以外は左辺の値を返す
function resize2(params) {
  let maxWidth = 600;
  let maxHeight = 480;

  maxWidth = params?.maxWidth ?? maxWidth;
  maxHeight = params?.maxHeight ?? maxHeight;

  console.log({ maxWidth, maxHeight });
}
