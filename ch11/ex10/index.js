// 特定の年と月(1-12)を数値の引数で受け取り、その月の日数を返す関数
export function getDaysInMonth(year, month) {
  // 第2引数にmonthを指定すると、次の月となる(第2引数は0～11であらわされるため)
  // 第3引数に0を指定すると、前の月の最終日となる
  // 以上のことから、指定した月の最終日を取得できる
  return new Date(year, month, 0).getDate();
}

// 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、
// その期間(開始日と終了日を含む)の土日以外の日数を返す関数
export function countWeekdays(startDateStr, endDateStr) {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  let count = 0;

  while (start <= end) {
    // 日曜日(0)または土曜日(6)でないなら、カウントをインクリメント
    const day = start.getDay();
    if (day !== 0 && day !== 6) {
      count++;
    }
    start.setDate(start.getDate() + 1);
  }
  return count;
}

// 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り
// その日の曜日をロケールの形式の文字列で返す関数
export function getWeekdayName(dateStr, locale) {
  // optionにlongを指定することで、指定したロケールのF完全な曜日名を出力できる
  // shortやnarrowを指定することもできる
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: "long" });
}

// ローカルのタイムゾーンにおいて先月 1 日 0 時 0 分 0 秒の Date オブジェクトを返す関数
// getMonth(),setMonth()の使用はNG
export function getFirstDayOfLastMonth() {
  const now = new Date();
  console.log(now.toString())

  // 今月1日（ただし時刻は今と同じ）
  const today = new Date(now);
  today.setDate(1);

  // 先月末日
  const lastDayOfLastMonth = new Date(today);
  lastDayOfLastMonth.setDate(0);

  // 先月1日
  const firstDayOfLastMonth = new Date(lastDayOfLastMonth)
  firstDayOfLastMonth.setDate(1)

  // 0:00:00にする
  firstDayOfLastMonth.setHours(0, 0, 0, 0);

  return firstDayOfLastMonth;
}

