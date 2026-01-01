const net = require("net");

const HOST = "127.0.0.1";
const PORT = 8080;
const TOTAL = 50000; // 試したい接続数。OS設定により達しないことあり
const sockets = [];
let connected = 0;
let failed = 0;

// １本のTCP接続を作る関数
function createOne(i) {
  return new Promise((resolve) => {
    const s = new net.Socket();
    s.connect(PORT, HOST, () => {
      connected++;
      sockets.push(s);
      resolve();
    });
    s.on("error", (e) => {
      failed++;
      resolve();
    });
    s.on("close", () => {
      // サーバから閉じられたらここに来る
    });
    // 送信しない（HTTP リクエスト未送信）
    s.setKeepAlive(true, 30000);
  });
}

(async () => {
  const batch = 1000; // 一度に50000接続すると負荷がかかるため1000本ずつ分割して接続
  for (let i = 0; i < TOTAL; i += batch) {
    await Promise.all(
      [...Array(Math.min(batch, TOTAL - i)).keys()].map((k) => createOne(i + k))
    );
    console.log(`progress: connected=${connected}, failed=${failed}`);
    await new Promise((r) => setTimeout(r, 50));
  }
  console.log(`DONE: connected=${connected}, failed=${failed}`);

  // 終了せずに接続維持（Ctrl+C で終了）
})();
