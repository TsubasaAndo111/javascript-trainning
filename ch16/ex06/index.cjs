const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "sample.bin");

(function main() {
  // 先頭に適当なデータを書き込み（'ABC' = 41 42 43）
  fs.writeFileSync(filePath, Buffer.from([0x41, 0x42, 0x43])); // "ABC"
  console.log("Before truncate:", fs.statSync(filePath).size); // 3

  // ファイルサイズを拡張
  fs.truncateSync(filePath, 10);
  console.log("After truncate:", fs.statSync(filePath).size); // 1024
  console.log("Done. Inspect sample.bin with a hex editor.");
})();
