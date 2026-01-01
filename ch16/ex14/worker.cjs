const { parentPort, workerData } = require("node:worker_threads");

const kernel = [
  [1, 4, 6, 4, 1],
  [4, 16, 24, 16, 4],
  [6, 24, 36, 24, 6],
  [4, 16, 24, 16, 4],
  [1, 4, 6, 4, 1],
];

const half = 2; // Math.floor(5 / 2)
const kernelSum = 256; // 正規化係数

function gaussianFilter(data, width, height) {
  const output = new Uint8ClampedArray(data.length);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0;

      for (let ky = -half; ky <= half; ky++) {
        const ny = Math.min(height - 1, Math.max(0, y + ky));
        for (let kx = -half; kx <= half; kx++) {
          const nx = Math.min(width - 1, Math.max(0, x + kx));

          const weight = kernel[ky + half][kx + half];
          const index = (ny * width + nx) * 4;

          r += data[index] * weight;
          g += data[index + 1] * weight;
          b += data[index + 2] * weight;
        }
      }

      const i = (y * width + x) * 4;
      output[i] = Math.round(r / kernelSum);
      output[i + 1] = Math.round(g / kernelSum);
      output[i + 2] = Math.round(b / kernelSum);
      output[i + 3] = data[i + 3]; // alpha はそのまま
    }
  }

  return output;
}

// workerData を受け取る
const { data, width, height } = workerData;

// Buffer→Uint8ClampedArray
const input = new Uint8ClampedArray(data);
const output = gaussianFilter(input, width, height);

// メインへ返却（Buffer化）
parentPort.postMessage(Buffer.from(output));
