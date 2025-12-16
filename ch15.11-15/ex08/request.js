// requester.js (ES Module)
// 手順1: sendRequest 実装 ＋ UIイベント（同時送信ボタン）

// 送信側のWebSocket接続の作成
const WS_URL = "ws://localhost:3003";
const requesterSocket = new WebSocket(WS_URL);

// 未解決リクエストの管理表(並行リクエストの管理)
const pending = new Map(); // id -> { resolve, reject, timeout }

// 適当にIDを作成する関数
function genId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// レスポンス受信（レスポンスがきたらPromiseを解決）
requesterSocket.addEventListener("message", (event) => {
  let msg;
  try {
    msg = JSON.parse(event.data);
  } catch {
    return;
  }
  if (msg && msg.kind === "res" && typeof msg.id === "string") {
    const entry = pending.get(msg.id);
    if (entry) {
      clearTimeout(entry.timeout);
      pending.delete(msg.id);
      entry.resolve(String(msg.body));
    }
  }
});

// 切断/エラーで未解決を一括 reject（制限時間内に正常なレスポンスが返ってこなければreject）
function rejectAllPending(reason) {
  for (const [id, entry] of pending.entries()) {
    clearTimeout(entry.timeout);
    entry.reject(new Error(reason));
    pending.delete(id);
  }
}
requesterSocket.addEventListener("close", () =>
  rejectAllPending("WebSocket closed")
);
requesterSocket.addEventListener("error", () =>
  rejectAllPending("WebSocket error")
);

export function sendRequest(body, { timeoutMs = 7000 } = {}) {
  return new Promise((resolve, reject) => {
    const id = genId();
    const payload = JSON.stringify({ kind: "req", id, body: String(body) });

    // タイムアウトの設定
    const timeout = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Timeout after ${timeoutMs} ms`));
    }, timeoutMs);

    pending.set(id, { resolve, reject, timeout });

    const doSend = () => {
      try {
        requesterSocket.send(payload);
      } catch (err) {
        clearTimeout(timeout);
        pending.delete(id);
        reject(err instanceof Error ? err : new Error("Send failed"));
      }
    };
    // まだ接続できてないときにはopenになるまで待ってから再実行
    switch (requesterSocket.readyState) {
      case WebSocket.OPEN:
        doSend();
        break;
      case WebSocket.CONNECTING: {
        // 一度実行したらその後はイベントを発火する必要がないからremoveする
        const once = () => {
          requesterSocket.removeEventListener("open", once);
          doSend();
        };
        requesterSocket.addEventListener("open", once);
        break;
      }
      default:
        clearTimeout(timeout);
        pending.delete(id);
        reject(new Error("WebSocket is not connected"));
    }
  });
}

// --- UI イベント結線（main.js の役割をここに統合） ---
const rows = Array.from(document.querySelectorAll("#inputs .row"));
const btn = document.getElementById("sendAll");
const timeoutInput = document.getElementById("timeoutMs");

btn?.addEventListener("click", () => {
  const timeoutMs = Number(timeoutInput?.value) || 7000;

  rows.forEach((row) => {
    const input = row.querySelector("input");
    const result = row.querySelector(".result");
    const body = input.value.trim();

    if (!body) {
      result.textContent = "空文字は送信しません";
      result.classList.add("error");
      return;
    }

    result.textContent = "送信中...";
    result.classList.remove("error");

    sendRequest(body, { timeoutMs })
      .then((res) => {
        result.textContent = res;
      }) // -> "Hello, <本文>"
      .catch((err) => {
        result.textContent = `エラー: ${err?.message ?? String(err)}`;
        result.classList.add("error");
      });
  });
});

requesterSocket.addEventListener("open", () =>
  console.info("[Requester] connected")
);
requesterSocket.addEventListener("close", () =>
  console.info("[Requester] closed")
);
