onmessage = function (message) {
  const { tile, x0, y0, perPixel, vertices, points } = message.data;
  const { width, height } = tile;

  const imageData = new ImageData(width, height);
  const data = imageData.data;

  // 背景：黒(0,0,0)＋不透明alpha=255
  for (let i = 3; i < data.length; i += 4) {
    data[i] = 255; // alphaだけ埋める（R,G,Bは0のまま）
  }

  // 頂点
  const A = vertices[0],
    B = vertices[1],
    C = vertices[2];

  // 三角形内のランダム初期点（一様分布）
  function randomPointInTriangle() {
    let r1 = Math.random();
    let r2 = Math.random();
    if (r1 + r2 > 1) {
      r1 = 1 - r1;
      r2 = 1 - r2;
    }
    return {
      x: A.x + r1 * (B.x - A.x) + r2 * (C.x - A.x),
      y: A.y + r1 * (B.y - A.y) + r2 * (C.y - A.y),
    };
  }

  let p = randomPointInTriangle();

  // カオスゲーム（点群描画）
  for (let n = 0; n < points; n++) {
    // ランダムに頂点を選び、点を1/2収縮
    const r = Math.random();
    const V = r < 1 / 3 ? A : r < 2 / 3 ? B : C;
    p = { x: (p.x + V.x) / 2, y: (p.y + V.y) / 2 };

    // このタイルのピクセルに落ちるなら描画
    const col = Math.floor((p.x - x0) / perPixel);
    const row = Math.floor((p.y - y0) / perPixel);
    if (col >= 0 && col < width && row >= 0 && row < height) {
      const idx = (row * width + col) * 4;
      data[idx + 0] = 255; // R
      data[idx + 1] = 255; // G
      data[idx + 2] = data[idx + 2] = 255; // B
      data[idx + 3] = 255; // A
    }
  }

  // 転送（transferableは不要：ImageDataは自動でコピー）
  postMessage({ tile, imageData });
};
