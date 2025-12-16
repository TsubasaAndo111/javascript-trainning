// responder.js (ES Module)
// 応答側（別 WebSocket 接続）: req を受け "Hello, " + body の res を返す

// 応答側のWebSocket接続の作成
const WS_URL = "ws://localhost:3003";
const responderSocket = new WebSocket(WS_URL);

// 受信したときのイベント
responderSocket.addEventListener("message", (event) => {
  let msg;
  try {
    msg = JSON.parse(event.data);
  } catch {
    return;
  }

  if (
    msg &&
    msg.kind === "req" &&
    typeof msg.id === "string" &&
    typeof msg.body === "string"
  ) {
    const resBody = `Hello, ${msg.body}`;
    const responseMsg = JSON.stringify({
      kind: "res",
      id: msg.id,
      body: resBody,
    });
    try {
      responderSocket.send(responseMsg);
    } catch {}
  }
});

// ログ
responderSocket.addEventListener("open", () =>
  console.info("[Responder] connected")
);
responderSocket.addEventListener("close", () =>
  console.info("[Responder] closed")
);
responderSocket.addEventListener("error", () =>
  console.warn("[Responder] error")
);
