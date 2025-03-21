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
let text = "Hello,World";

// NFDでUnicode正規化（今回はNFDもNFCも文字数変わらない）
let text_nfd = text.normalize("NFD");

let text_nfd_unicode = toUnicodeEscape(text_nfd);

console.log("入力：" + text_nfd_unicode);

console.log("出力：" + text_nfd);
