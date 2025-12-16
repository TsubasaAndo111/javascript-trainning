// worker.js (ES Module)
// ガウシアンフィルタを適用する処理をメインスレッドから切り離し

self.addEventListener("message", (event) => {
  const { width, height, buffer } = event.data;
  const data = new Uint8ClampedArray(buffer);

  // 出力用バッファ＆配列（Transferable として返すため ArrayBuffer を保持）
  const outBuffer = new ArrayBuffer(data.length);
  const output = new Uint8ClampedArray(outBuffer);

  // === 5x5 ガウシアンカーネル（元コードと同一）===
  const kernel = [
    [1, 4, 6, 4, 1],
    [4, 16, 24, 16, 4],
    [6, 24, 36, 24, 6],
    [4, 16, 24, 16, 4],
    [1, 4, 6, 4, 1],
  ];
  const half = 2; // Math.floor(kernelSize / 2);
  const kernelSum = 256;

  // ガウシアンフィルタ適用
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0;

      for (let ky = -half; ky <= half; ky++) {
        for (let kx = -half; kx <= half; kx++) {
          // 境界処理：端のピクセルを使用
          const ny = Math.min(height - 1, Math.max(0, y + ky));
          const nx = Math.min(width - 1, Math.max(0, x + kx));

          const weight = kernel[ky + half][kx + half];
          const index = (ny * width + nx) * 4;

          r += data[index] * weight;
          g += data[index + 1] * weight;
          b += data[index + 2] * weight;
        }
      }

      const i = (y * width + x) * 4;
      output[i] = r / kernelSum;
      output[i + 1] = g / kernelSum;
      output[i + 2] = b / kernelSum;
      output[i + 3] = data[i + 3]; // alpha は維持
    }
  }

  // 完了メッセージ（出力バッファは Transferable として返す）
  self.postMessage({ type: "done", width, height, outputBuffer: outBuffer }, [
    outBuffer,
  ]);
});
