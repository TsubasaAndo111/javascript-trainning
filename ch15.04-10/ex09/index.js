document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;
    const width = img.width;
    const height = img.height;

    // 出力用配列
    const outputData = new Uint8ClampedArray(data.length);

    // === 5x5 ガウシアンカーネル ===
    const kernel = [
      [1, 4, 6, 4, 1],
      [4, 16, 24, 16, 4],
      [6, 24, 36, 24, 6],
      [4, 16, 24, 16, 4],
      [1, 4, 6, 4, 1],
    ];

    const half = 2; // Math.floor(kernelSize / 2);
    const kernelSum = 256;

    // === ガウシアンフィルタ適用 ===
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0,
          g = 0,
          b = 0;

        for (let ky = -half; ky <= half; ky++) {
          for (let kx = -half; kx <= half; kx++) {
            // 境界処理：画像をカーネルが超える場合は端のピクセルを使用するようにする
            const ny = Math.min(height - 1, Math.max(0, y + ky));
            const nx = Math.min(width - 1, Math.max(0, x + kx));

            const weight = kernel[ky + half][kx + half];
            const index = (ny * width + nx) * 4; // 各画素ごとにr,g,b,αがあるため

            r += data[index] * weight;
            g += data[index + 1] * weight;
            b += data[index + 2] * weight;
          }
        }

        const i = (y * width + x) * 4;
        outputData[i] = r / kernelSum;
        outputData[i + 1] = g / kernelSum;
        outputData[i + 2] = b / kernelSum;
        outputData[i + 3] = data[i + 3]; // alpha はそのまま
      }
    }
    const outputImageData = new ImageData(outputData, width, height);
    filteredCtx.putImageData(outputImageData, 0, 0);
  });

  reader.readAsDataURL(file);
});
