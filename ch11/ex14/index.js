export function sortJapanese(array) {
  const collator = new Intl.Collator("ja-JP", {
    sensitivity: "base", // 濁点・半濁点、小書き文字の違いを無視
    ignorePunctuation: true,
    usage: "sort",
  });
  // 元の配列の破壊的変更を防ぐためにsliceでコピーしてからsort
  return array.slice().sort((a, b) => collator.compare(a, b));
}

export function toJapaneseDateString(date) {
  const formatter = new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
    era: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  // formatToPartsを使うと、日付の各部分を取り出せる
  const parts = formatter.formatToParts(date);

  const era = parts.find((p) => p.type === "era")?.value || "";
  const year = parts.find((p) => p.type === "year")?.value || "";
  const month = parts.find((p) => p.type === "month")?.value || "";
  const day = parts.find((p) => p.type === "day")?.value || "";

  return `${era}${year}年${month}月${day}日`;
}
