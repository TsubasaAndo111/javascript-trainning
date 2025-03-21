// Unicodeエスケープ形式で表示する
function toUnicodeEscape(str) {
  return str
    .split("")
    .map((char) => {
      let hex = char.charCodeAt(0).toString(16); // Unicodeコードポイントを16進数に変換
      return "\\u" + ("0000" + hex).slice(-4); // 16進数の4桁でとってこれるように処理
    })
    .join("");
}

// 元の文字列
let text = "パン";

// NFCでUnicode正規化(濁点まで一つの文字とする)
let text_nfc = text.normalize("NFC");

// NFDでUnicode正規化(濁点と叔父を別々に扱う)
let text_nfd = text.normalize("NFD");

console.log("パンをNFCで正規化：" + toUnicodeEscape(text_nfc)); // パンをNFCで正規化：\u30d1\u30f3
console.log("パンをNFDで正規化：" + toUnicodeEscape(text_nfd)); // パンをNFDで正規化：\u30cf\u309a\u30f3
