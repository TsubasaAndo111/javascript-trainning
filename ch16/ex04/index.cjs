// read-sjis-sync.js
const fs = require("fs");
const iconv = require("iconv-lite");

try {
  // バイナリとして読み込む（Buffer）
  const buffer = fs.readFileSync("ex04/sample.txt");
  // Shift_JIS を UTF-8 の JS文字列へ変換
  const text = iconv.decode(buffer, "Shift_JIS");

  // コンソールにそのまま出力
  console.log(text);
} catch (err) {
  console.error("読み込みに失敗しました:", err);
  process.exit(1);
}
