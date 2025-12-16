// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("/ch15.11-15/ex09/decision1.mp3");

// --- WebSocket クライアント ---
const ws = new WebSocket("ws://localhost:3003");

// ライフゲームのセル (true or false) をランダムに初期化する（初期描画用のローカルバッファ）
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );

// grid を canvas に描画する
function renderGrid(grid) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

// --- WebSocket 受信で盤面・進行状態を反映（★追加） ---
ws.addEventListener("open", () => {
  console.info("[WS] connected");
});

ws.addEventListener("close", () => {
  console.warn("[WS] disconnected");
});

ws.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case "update":
      // サーバが計算した盤面を受信して描画
      grid = data.grid;
      renderGrid(grid);
      break;

    case "pause":
      // ローカルのアニメが動いていれば止める（今回は基本的に使わないが安全のため）
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      break;

    case "start":
      // クライアントはローカル更新しない。サーバからの update を待つだけ。
      break;
  }
});

// canvas がクリックされたときの処理（セルの値を反転する → サーバへ送る）
canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: event.clientX - rect.left, y: event.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);

  // サーバへ反転要求を送信（サーバが即座に最新盤面を broadcast）
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "toggle", row, col }));
  }
  // 効果音だけローカル再生（描画はサーバからの update を待つ）
  sound.cloneNode().play();
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
// （サーバ駆動のため今回は呼び出さない。既存構造は残す）
const UPDATE_INTERVAL = 100; // ms
let lastTime = 0;

function update(timestamp) {
  // timestampはrequestAnimationFrame が渡してくれる呼び出し時刻
  if (!lastTime) lastTime = timestamp;

  const delta = timestamp - lastTime;

  // 本来はローカル更新をここで行うが、同期のためサーバ駆動に統一
  // if (delta >= UPDATE_INTERVAL) {
  //   grid = updateGrid(grid);
  //   renderGrid(grid);
  //   lastTime = timestamp;
  // }

  animationId = requestAnimationFrame(update);
}

// Start/Pause ボタンはサーバへ指示を送る
startButton.addEventListener("click", () => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "start" }));
  }
});

pauseButton.addEventListener("click", () => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "pause" }));
  }
});
