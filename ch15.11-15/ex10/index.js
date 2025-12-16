// index.js (ES Module)
// メインスレッド：ファイル読み込み＆キャンバス描画、Worker との連携、アニメーション

// Web Worker をモジュールとして作成（Vite/webpack/ネイティブESMに対応したパターン）
const worker = new Worker(new URL("./worker.js", import.meta.url), {
  type: "module",
});

const inputEl = document.getElementById("image");
const originalCanvas = document.getElementById("original");
const filteredCanvas = document.getElementById("filtered");
const originalCtx = originalCanvas.getContext("2d");
const filteredCtx = filteredCanvas.getContext("2d");

// --- アニメーション: ボールを跳ねさせる ---
const animCanvas = document.getElementById("anim");
const animCtx = animCanvas.getContext("2d");
let ball = { x: 30, y: 30, vx: 2.4, vy: 2.0, r: 14 };

function drawAnim() {
  const { width, height } = animCanvas;
  // 更新
  ball.x += ball.vx;
  ball.y += ball.vy;
  if (ball.x - ball.r < 0 || ball.x + ball.r > width) ball.vx *= -1;
  if (ball.y - ball.r < 0 || ball.y + ball.r > height) ball.vy *= -1;

  // 描画
  animCtx.clearRect(0, 0, width, height);
  // 背景グラデーション
  const grad = animCtx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "#eceff1");
  grad.addColorStop(1, "#cfd8dc");
  animCtx.fillStyle = grad;
  animCtx.fillRect(0, 0, width, height);

  // ボール
  animCtx.beginPath();
  animCtx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  animCtx.fillStyle = "#1e90ff";
  animCtx.fill();
  animCtx.strokeStyle = "#0d47a1";
  animCtx.stroke();

  requestAnimationFrame(drawAnim);
}
requestAnimationFrame(drawAnim);

// --- 画像選択 ---
inputEl.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    // 画像のデコードは createImageBitmap が高速なことが多い（対応ブラウザが多い）
    let imageBitmap;
    imageBitmap = await createImageBitmap(file);

    // 元画像キャンバスサイズセット＆描画
    originalCanvas.width = imageBitmap.width;
    originalCanvas.height = imageBitmap.height;
    filteredCanvas.width = imageBitmap.width;
    filteredCanvas.height = imageBitmap.height;

    originalCtx.clearRect(0, 0, originalCanvas.width, originalCanvas.height);
    originalCtx.drawImage(imageBitmap, 0, 0);

    // ピクセルデータ取得
    const imageData = originalCtx.getImageData(
      0,
      0,
      imageBitmap.width,
      imageBitmap.height
    );
    const { data, width, height } = imageData;

    // Worker に転送（ArrayBuffer を Transferable として渡す）
    // これによりコピーではなく所有権移転で高速化
    worker.postMessage(
      { width, height, buffer: data.buffer },
      [data.buffer] // Transferable
    );
  } catch (err) {
    console.error(err);
  }
});

// --- Worker からのメッセージ受信 ---
worker.addEventListener("message", (event) => {
  const msg = event.data;
  if (msg?.type === "done") {
    const { width, height, outputBuffer } = msg;
    const outputData = new Uint8ClampedArray(outputBuffer);
    const outputImageData = new ImageData(outputData, width, height);

    filteredCtx.putImageData(outputImageData, 0, 0);

    return;
  }
});

// --- Worker エラー処理 ---
worker.addEventListener("error", (err) => {
  console.error("Worker error:", err);
});
