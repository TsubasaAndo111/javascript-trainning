
# ローカル LLM チャット Web アプリ (Ollama / gemma:2b)

Ollama の REST API `/api/chat` を使い、**ストリーミング (stream)** で応答を逐次表示する最小構成の Web アプリです。UI は淡い緑のアシスタント気泡で、添付画像のイメージに近づけています。

## 動かし方

1. **Ollama を起動し、gemma:2b を用意**
   ```bash
   ollama serve              # サーバを起動（OS により常駐サービスの場合あり）
   ollama pull gemma:2b      # モデル取得（初回のみ）
   # もしくは、指示通り:
   ollama run gemma:2b       # モデルを起動して動作確認
   ```

2. **CORS が必要な場合**（ブラウザから直接 API を叩くため）
   - macOS: `launchctl setenv OLLAMA_ORIGINS "*"` のように許可オリジンを設定して再起動
   - Linux: systemd の `ollama.service` で `Environment="OLLAMA_ORIGINS=*"` を設定し再起動
   - Windows: 環境変数に `OLLAMA_ORIGINS` を追加して再起動

3. **このフォルダをブラウザで開く**
   - `index.html` をダブルクリック、または簡易 HTTP サーバでホストしてください。

## 仕組み

- `fetch('/api/chat', { stream: true })` で取得する **NDJSON** を
  `ReadableStream + TextDecoder` で 1 行ずつパースし、
  `message.content` を UI の気泡に**追記**していきます。
- 最終オブジェクト (`done: true`) で、トークン数や合計時間などのメタ情報を表示します。
- 会話履歴 (`messages`) を都度 `/api/chat` に渡し、文脈を維持します。

## 注意

- ブラウザから直接呼び出す場合、**CORS 設定 (OLLAMA_ORIGINS)** が必要になることがあります。
- Ollama の既定ホストは `http://localhost:11434` です。変更した場合は `app.js` の `OLLAMA_HOST` を合わせてください。

