import { ROWS, COLS, RESOLUTION, UPDATE_INTERVAL } from "./constants.js";
import { renderGrid } from "./renderGrid.js";
import { updateGrid } from "./updateGrid.js";

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// requestAnimationFrame が返す ID
let animationId = null;


const soundUrl = new URL("./decision1.mp3", import.meta.url);
const sound = new Audio(soundUrl);

// ライフゲームのセル (true/false) をランダムに初期化
let grid = new Array(ROWS)
  .fill(null)
  .map(() => new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2)));

// canvas クリックでセル反転
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);

  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();

  renderGrid(grid, ctx, ROWS, COLS, RESOLUTION);
});

// 10FPS相当に抑制
let lastTime = 0;

function update(timestamp) {
  if (!lastTime) lastTime = timestamp;

  const delta = timestamp - lastTime;

  if (delta >= UPDATE_INTERVAL) {
    grid = updateGrid(grid, ROWS, COLS);
    renderGrid(grid, ctx, ROWS, COLS, RESOLUTION);
    lastTime = timestamp;
  }

  animationId = requestAnimationFrame(update);
}

startButton.addEventListener("click", () => {
  if (animationId) return;
  update(0);
});

pauseButton.addEventListener("click", () => {
  if (!animationId) return;
  cancelAnimationFrame(animationId);
  animationId = null;
});

renderGrid(grid, ctx, ROWS, COLS, RESOLUTION);