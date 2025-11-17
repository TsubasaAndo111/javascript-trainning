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
const sound = new Audio("/ch15.04-10/ex10/decision1.mp3");

// ライフゲームのセル (true or false) をランダムに初期化する
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

// Life Game のルールに従ってセルを更新する
function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
      let aliveCount = 0;

      // 周囲 8 マスの生存数を数える
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;

          // 盤面の座標に変換
          const r = row + dr;
          const c = col + dc;

          // 盤面範囲内
          if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
            // 指定座標がtrueならカウント
            if (grid[r][c]) aliveCount++;
          }
        }
      }

      const cell = grid[row][col];

      // ライフゲームのルール
      if (cell) {
        // 生存 → 隣接 2 または 3 なら生存、他は死
        nextGrid[row][col] = aliveCount === 2 || aliveCount === 3;
      } else {
        // 死 → 隣接 3 なら誕生
        nextGrid[row][col] = aliveCount === 3;
      }
    }
  }
  return nextGrid;
}

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  renderGrid(grid);
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
// TODO: リフレッシュレートの高い画面では速く実行されてしまうため、以下を参考に更新頻度が常に一定となるようにしなさい
// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame

// 1秒間に何回更新するか（=10FPS）
const UPDATE_INTERVAL = 100; // ms

let lastTime = 0;

function update(timestamp) {
  // timestampはrequestAnimationFrame が渡してくれる呼び出し時刻

  // 初回呼び出し時の初期化
  if (!lastTime) lastTime = timestamp;

  const delta = timestamp - lastTime;

  // 一定間隔 (UPDATE_INTERVAL ms) を超えたら更新
  if (delta >= UPDATE_INTERVAL) {
    grid = updateGrid(grid);
    // 現在の盤面をキャンバスに描画
    renderGrid(grid);

    lastTime = timestamp;
  }

  // 次の画面描画タイミングでupdate関数を呼ぶように依頼
  // 通常の呼び出し間隔はモニタのFPS依存
  // 返り値はアニメーションフレーム予約を表すID
  animationId = requestAnimationFrame(update);
}

startButton.addEventListener("click", () => {
  // 既にアニメーションが動いている場合は何もしない
  if (animationId) {
    return;
  }
  update();
});

pauseButton.addEventListener("click", () => {
  // アニメーションが停止している場合は何もしない
  if (!animationId) {
    return;
  }
  cancelAnimationFrame(animationId);
  animationId = null;
});

renderGrid(grid);
