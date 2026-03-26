/*
全体の操作の司令塔
*/

import { startClock } from "./clock.js";
import { startGame, submitAnswer, showRanking, showScreen } from "./ui.js";

// 必須要件：時計の起動
startClock();

// スタート画面のボタン
document.getElementById("btn-start").addEventListener("click", startGame);
document
  .getElementById("btn-show-ranking")
  .addEventListener("click", showRanking);

// ゲーム画面のボタン
document.getElementById("submit-btn").addEventListener("click", submitAnswer);

// ランキング画面のボタン
document
  .getElementById("btn-back-start")
  .addEventListener("click", () => showScreen("screen-start"));
