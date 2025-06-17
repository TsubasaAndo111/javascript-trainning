export function reverse(str) {
  // 書記素(視角上の1文字)単位で文字列を分割するセグメンターを作成(undefinedの部分は言語の選択、実行環境のデフォルトを使用)
  const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });

  // 書記素単位のデータをそれぞれ配列の要素として格納(第一引数がイテレータ、第二引数で文字列を抽出してマッピングしている)
  const graphemes = Array.from(segmenter.segment(str), (s) => s.segment);

  // 配列を反転させて、文字列として結合して返す
  return graphemes.reverse().join("");
}
