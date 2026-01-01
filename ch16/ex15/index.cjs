// 今回のようなメッセージパッシングによる並行処理は「アクターモデル」と呼ばれるらしい

const threads = require("worker_threads");

if (threads.isMainThread) {
  // sharedArray を number 型の変数 num にする
  let num = 0;

  // ワーカー生成（SharedArrayBuffer/Atomics は使用しない）
  const worker = new threads.Worker(__filename);

  // サブスレッドから "num をインクリメントせよ" というメッセージを受信したら num をインクリメント
  worker.on("message", (message) => {
    if (message === "inc") {
      num++;
    } else if (message === "done") {
      // サブスレッドのループ完了通知を受けたら結果を表示
      console.log(num);
    }
  });

  // ワーカーが起動したら、メインスレッド側の for ループを回して num をインクリメント
  worker.on("online", () => {
    for (let i = 0; i < 10_000_000; i++) {
      // Atomic.add の代わりに num をインクリメント
      num++;
    }
  });
} else {
  // サブスレッド側
  // サブスレッドの for ループでは Atomic.add の代わりにメインへ "インクリメントせよ" メッセージ送信
  for (let i = 0; i < 10_000_000; i++) {
    threads.parentPort.postMessage("inc");
  }
  // 完了通知
  threads.parentPort.postMessage("done");
}
