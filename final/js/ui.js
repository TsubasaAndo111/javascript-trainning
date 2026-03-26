import { CoreLogic } from "./logic.js";
import { saveScore, getRankingTop3, getDailyAverages } from "./storage.js";

const imageMap = {
  1: "img/man1.gif",
  2: "img/man2.gif",
  3: "img/man3.gif",
  4: "img/man4.gif",
  5: "img/man5.gif",
  6: "img/man6.gif",
  7: "img/man7.gif",
  8: "img/man8.gif",
  9: "img/man9.gif",
};

let currentQuestion = null;
let selectedWaits = [];
let isNotenSelected = false;

let score = 0;
let timeLeft = 60;
let timerId = null;
let isPlaying = false;

// 画面切り替え関数
export function showScreen(screenId) {
  document.getElementById("screen-start").style.display = "none";
  document.getElementById("screen-game").style.display = "none";
  document.getElementById("screen-ranking").style.display = "none";
  document.getElementById(screenId).style.display = "block";
}

// ゲーム開始
export function startGame() {
  score = 0;
  timeLeft = 60;
  isPlaying = true;

  document.getElementById("score-display").textContent = score;
  document.getElementById("time-display").textContent = timeLeft;
  document.getElementById("result-message").textContent = "";

  document.getElementById("submit-btn").style.display = "inline-block";
  document.getElementById("wait-selection").style.display = "flex";
  document.getElementById("noten-btn").style.display = "inline-block";

  showScreen("screen-game");
  loadNextQuestion();

  timerId = setInterval(() => {
    timeLeft--;
    document.getElementById("time-display").textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// ゲーム終了
function endGame() {
  clearInterval(timerId);
  isPlaying = false;

  // スコアを保存
  saveScore(score);

  document.getElementById("submit-btn").style.display = "none";
  document.getElementById("wait-selection").style.display = "none";
  document.getElementById("noten-btn").style.display = "none";

  const resultMsg = document.getElementById("result-message");
  resultMsg.textContent = `⏳ タイムアップ！ 最終スコア: ${score} 点`;
  resultMsg.style.color = "#d32f2f";

  setTimeout(() => {
    showRanking();
  }, 5000);
}

// 次の問題を読み込む
function loadNextQuestion() {
  if (!isPlaying) return;

  selectedWaits = [];
  isNotenSelected = false;
  document.getElementById("result-message").textContent = "";

  const notenBtn = document.getElementById("noten-btn");
  notenBtn.classList.remove("selected");

  // logic.jsから問題を生成
  currentQuestion = CoreLogic.getQuestion();

  const handDisplay = document.getElementById("hand-display");
  handDisplay.innerHTML = "";
  currentQuestion.hand.forEach((num) => {
    const tileImg = document.createElement("img");
    tileImg.className = "tile";
    tileImg.src = imageMap[num];
    handDisplay.appendChild(tileImg);
  });

  const waitSelection = document.getElementById("wait-selection");
  waitSelection.innerHTML = "";
  for (let i = 1; i <= 9; i++) {
    const btn = document.createElement("button");
    btn.className = "wait-btn";
    const btnImg = document.createElement("img");
    btnImg.src = imageMap[i];
    btn.appendChild(btnImg);

    btn.onclick = () => {
      if (isNotenSelected) {
        isNotenSelected = false;
        notenBtn.classList.remove("selected");
      }
      const index = selectedWaits.indexOf(i);
      if (index === -1) {
        selectedWaits.push(i);
        btn.classList.add("selected");
      } else {
        selectedWaits.splice(index, 1);
        btn.classList.remove("selected");
      }
    };
    waitSelection.appendChild(btn);
  }

  notenBtn.onclick = () => {
    isNotenSelected = !isNotenSelected;
    if (isNotenSelected) {
      notenBtn.classList.add("selected");
      selectedWaits = [];
      const allWaitBtns = document.querySelectorAll(
        "#wait-selection .wait-btn"
      );
      allWaitBtns.forEach((b) => b.classList.remove("selected"));
    } else {
      notenBtn.classList.remove("selected");
    }
  };
}

// 回答処理
export function submitAnswer() {
  if (!isPlaying) return;

  if (selectedWaits.length === 0 && !isNotenSelected) {
    alert("待ち牌を選ぶか、ノーテンを選択してください！");
    return;
  }

  const userAnswer = isNotenSelected ? [] : selectedWaits;
  const isCorrect = CoreLogic.checkAnswer(userAnswer, currentQuestion.waits);
  const resultMsg = document.getElementById("result-message");

  if (isCorrect) {
    score += 10;
    document.getElementById("score-display").textContent = score;
    resultMsg.textContent = "⭕ 正解！ (+10点)";
    resultMsg.style.color = "#2e7d32";
  } else {
    score -= 5;
    document.getElementById("score-display").textContent = score;
    const correctNums =
      currentQuestion.waits.length === 0
        ? "ノーテン"
        : currentQuestion.waits.join(", ");
    resultMsg.textContent = `❌ 不正解... (-5点) 正解: [ ${correctNums} ]`;
    resultMsg.style.color = "#d32f2f";
  }

  // 0.8秒後に次の問題へ
  setTimeout(() => {
    if (isPlaying) {
      loadNextQuestion();
    }
  }, 800);
}

let chartInstance = null; // グラフの重複描画を防ぐための変数

// ランキング・グラフ画面の表示
export function showRanking() {
  const rankingList = document.getElementById("ranking-list");
  rankingList.innerHTML = "";

  // ① ランキング（自己ベストTOP3）の描画
  const top3 = getRankingTop3();
  if (top3.length === 0) {
    rankingList.innerHTML =
      '<div style="font-weight: normal;">プレイ記録がありません。</div>';
  } else {
    top3.forEach((record, index) => {
      const div = document.createElement("div");
      div.className = "ranking-item";
      div.textContent = `${index + 1}位： ${record.score} 点 (${record.date})`;
      rankingList.appendChild(div);
    });
  }

  // ② 成長曲線（グラフ）の描画
  const chartData = getDailyAverages();
  const ctx = document.getElementById("growth-chart").getContext("2d");

  // 既にグラフが存在する場合は破棄（再描画時のバグ防止）
  if (chartInstance) {
    chartInstance.destroy();
  }

  // Chart.jsで折れ線グラフを生成
  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: "日別 平均スコア",
          data: chartData.averages,
          borderColor: "#2196f3",
          backgroundColor: "rgba(33, 150, 243, 0.2)",
          borderWidth: 2,
          tension: 0.1, // 線の丸み
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true, // スコアがマイナスになる場合も自動調整されます
        },
      },
    },
  });

  showScreen("screen-ranking");
}
