import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);
  console.log(
    `parent: spawned child pid=${child.pid}, parent pid=${process.pid}`
  );

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// トラップ対象のシグナルを2種以上
// SIGINTはCtrl+Cで終了したときのシグナル
// SITTERMはkillコマンドでOSやサービス管理ツールから送られるシグナル(なぜかkillできず。。。)
const signalsToTrap = ["SIGINT", "SIGTERM"];

// シャットダウンフラグと、受け取ったシグナルの記録
let shuttingDown = false;
let shutdownSignal = null;

// リスナー管理
const signalHandlers = new Map();

function installSignalHandlers() {
  for (const sig of signalsToTrap) {
    const handler = async () => {
      // 多重呼び出し防止
      if (shuttingDown) return;
      shuttingDown = true;
      shutdownSignal = sig;

      console.log(
        `parent: received ${sig}, forwarding to child (pid=${child?.pid ?? "n/a"})`
      );

      // 子プロセスへ同じシグナルを送る
      try {
        if (child && !child.killed) {
          child.kill(sig);
        }
      } catch (err) {
        console.error(`parent: failed to forward ${sig} to child:`, err);
      }
    };

    // シグナルのハンドラを登録
    signalHandlers.set(sig, handler);
    process.on(sig, handler);
  }
}

// リスナ削除用
function removeSignalHandlers() {
  for (const [sig, handler] of signalHandlers.entries()) {
    process.removeListener(sig, handler);
  }
  signalHandlers.clear();
}

// シグナルハンドラを登録
installSignalHandlers();

// 監視ループ：子を起動し、終了理由に応じて再起動／親終了を制御
(async function supervise() {
  while (true) {
    const [code, signal] = await startChild();

    // シャットダウン指示（親がシグナルを受けた）が来ている場合
    if (shuttingDown) {
      // 子が該当シグナルで終了したことを確認
      if (signal === shutdownSignal) {
        console.log(`parent: child terminated by ${signal} as expected.`);
      } else {
        console.warn(
          `parent: child did not terminate by ${shutdownSignal}. code=${code}, signal=${signal}`
        );
      }

      // 自分自身のシグナルハンドラを外してから、同じシグナルで自分も終了
      removeSignalHandlers();
      process.kill(process.pid, shutdownSignal);
      break; // 念のためループを抜ける
    }

    // 子がシグナルで終了（親はシャットダウン中ではない）→ 再起動
    if (signal) {
      console.warn(`parent: child died due to signal ${signal}. restarting...`);
      continue;
    }

    // 正常終了（code === 0）→ 親も正常終了
    if (code === 0) {
      console.log("parent: child exited normally. parent exiting.");
      process.exit(0);
    }

    // 異常終了（code !== 0）→ 再起動
    console.warn(
      `parent: child exited abnormally with code ${code}. restarting...`
    );
    // ループで再起動（continue 相当）
    // つまり次のループでstartChildが呼ばれるため、それが再起動となる
  }
})();
