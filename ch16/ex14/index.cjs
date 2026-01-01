// 画像のエンコード・デコードのためにsharpライブラリをインストールして使用

const path = require("node:path");
const { Worker } = require("node:worker_threads");
const sharp = require("sharp");

// ワーカーを起動してガウシアンフィルタ適用

function runWorker(rawBuffer, width, height) {
  return new Promise((resolve, reject) => {
    const workerPath = path.resolve(__dirname, "worker.cjs");

    // workerDataに入力画像を渡してワーカー起動
    const worker = new Worker(workerPath, {
      workerData: { data: rawBuffer, width, height },
    });

    worker.once("message", (processedBuffer) => {
      resolve(processedBuffer);
    });
    worker.once("error", reject);
    worker.once("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker exited with code ${code}`));
      }
    });
  });
}

/**
 * 入力画像にガウシアンフィルタを適用して出力
 */
async function gaussianFilterFile(inputPath, outputPath = "output.png") {
  // 入力をRGBA rawで取得（alphaを確保）
  const img = sharp(inputPath).ensureAlpha();
  const meta = await img.metadata();
  const width = meta.width;
  const height = meta.height;

  if (!width || !height) {
    throw new Error("画像サイズの取得に失敗しました。");
  }

  // デコードした画像を未圧縮の生のRGBAバッファとして取得
  // CanvasRenderingContext2D.getImageData(...).dataと同じレイアウトにする
  const raw = await img.raw().toBuffer();

  // ワーカースレッドでフィルタ適用
  const processed = await runWorker(raw, width, height);

  // 書き出し（PNG/JPEGなど任意。ここでは拡張子に合わせて保存）
  const ext = (path.extname(outputPath) || ".png").toLowerCase();
  let pipeline = sharp(processed, { raw: { width, height, channels: 4 } });

  // 出力形式は拡張子に合わせる
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      pipeline = pipeline.jpeg({ quality: 90 });
      break;
    default:
      pipeline = pipeline.png();
      break;
  }

  await pipeline.toFile(outputPath);
  console.log(`ガウシアンフィルタ適用完了: ${outputPath}`);
}

// コマンドラインの引数指定の処理
(async () => {
  const [, , inputPath, outputPath] = process.argv;
  if (!inputPath) {
    console.error("使い方: node main.js <入力画像パス> [出力画像パス]");
    process.exit(1);
  }
  try {
    await gaussianFilterFile(inputPath, outputPath || "output.png");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
