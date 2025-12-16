// Ollama REST API に直接接続してストリーミング表示する最小構成のフロントエンド
// 参考: https://docs.ollama.com/api/chat （stream はデフォルト true）

const OLLAMA_HOST = "http://localhost:11434"; // 必要に応じて変更
const MODEL = "gemma:2b";

const chatEl = document.getElementById("chat");
const statusEl = document.getElementById("status");
const formEl = document.getElementById("chat-form");
const promptEl = document.getElementById("prompt");

// 会話履歴（/api/chat に渡す）
const messages = [];

function appendMessage(role, text) {
  const div = document.createElement("div");
  div.className = `message ${role}`;
  div.textContent = text;
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
  return div; // ストリーミング用に要素を返す
}

async function sendChat(userText) {
  // ユーザ発言を表示 & 履歴へ
  appendMessage("user", userText);
  messages.push({ role: "user", content: userText });

  // アシスタントの空メッセージを作って、以後そこへ追記（ストリーミング表示）
  const assistantBubble = appendMessage("assistant", "");
  let assistantAccum = "";

  statusEl.textContent = "生成中…";

  try {
    const res = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages,
        stream: true, // デフォルト true だが明示
      }),
    });

    if (!res.ok || !res.body) {
      throw new Error(`HTTP ${res.status} / ストリームなし`);
    }

    // Ollama は NDJSON（改行区切り JSON）で逐次返す
    // ストリームのリーダーをとってくる
    const reader = res.body.getReader();
    // バイト列を文字列に変換
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // 1 行ごとに JSON を処理
      const lines = buffer.split("\n");
      buffer = lines.pop(); // 端数を次ループへ

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        let obj;
        try {
          obj = JSON.parse(trimmed);
        } catch (e) {
          // 途中で JSON が壊れていたら次フレームへ
          continue;
        }

        // 部分生成テキスト
        const piece = obj?.message?.content ?? "";
        if (piece) {
          // ストリームで届いた部分テキストを1つの完全な応答にまとめる
          assistantAccum += piece;
          // UIのチャット部分の更新、断片的でも表示
          assistantBubble.textContent += piece;
          // チャット画面を再下部へスクロールして最新メッセージが見えるようにする
          chatEl.scrollTop = chatEl.scrollHeight;
        }
      }
    }

    // 会話履歴へアシスタント発話を追加
    messages.push({ role: "assistant", content: assistantAccum });
    statusEl.textContent = "待機中";
  } catch (err) {
    statusEl.textContent = "エラー";
    appendMeta(`エラー: ${err.message}`);
  }
}

formEl.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const text = promptEl.value.trim();
  if (!text) return;
  promptEl.value = "";
  sendChat(text);
});

// 接続テスト（Ollama が動いているか）
(async () => {
  try {
    const res = await fetch(`${OLLAMA_HOST}/api/tags`);
    if (res.ok) {
      statusEl.textContent = "Ollama 接続 OK";
    } else {
      statusEl.textContent = `Ollama 接続失敗 (HTTP ${res.status})`;
    }
  } catch {
    statusEl.textContent = "Ollama 非稼働 / CORS でブロックの可能性";
  }
})();
