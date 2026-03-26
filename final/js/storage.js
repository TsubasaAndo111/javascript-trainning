const STORAGE_KEY = "mahjong_chinitsu_history";

// 全プレイ履歴を取得
export function getHistory() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// スコアと日付を保存
export function saveScore(score) {
  const history = getHistory();
  // 現在のローカル日付を YYYY-MM-DD 形式で取得
  const today = new Date()
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");

  history.push({ date: today, score: score });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

// 歴代トップ3のスコアを取得
export function getRankingTop3() {
  const history = getHistory();
  // スコアの降順でソートして上から3つを取得
  return history.sort((a, b) => b.score - a.score).slice(0, 3);
}

// 日付ごとの平均スコアを算出（グラフ用データ）
export function getDailyAverages() {
  const history = getHistory();
  const dailyData = {};

  // 日付ごとにスコアを分類
  history.forEach((record) => {
    if (!dailyData[record.date]) {
      dailyData[record.date] = { total: 0, count: 0 };
    }
    dailyData[record.date].total += record.score;
    dailyData[record.date].count++;
  });

  // 平均値を計算して配列化
  const labels = []; // X軸（日付）
  const averages = []; // Y軸（平均スコア）

  // 日付順にソートして抽出
  Object.keys(dailyData)
    .sort()
    .forEach((date) => {
      labels.push(date);
      const avg =
        Math.round((dailyData[date].total / dailyData[date].count) * 10) / 10; // 小数第1位まで
      averages.push(avg);
    });

  return { labels, averages };
}
