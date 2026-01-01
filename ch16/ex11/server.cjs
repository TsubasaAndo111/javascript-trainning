const net = require("net");

const FORM_HTML = `   <!doctype html>
   <html lang="ja">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Greeting Form</title>
     </head>
     <body>
       <form action="/greeting" method="POST">
         <label for="greeting">Name:</label>
         <input type="text" id="name" name="name" />
         <input type="text" id="greeting" name="greeting" />
         <button type="submit">Submit</button>
       </form>
     </body>
   </html>
`;

// レスポンスHTMLにユーザ入力を埋め込む際のXSS対策
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ブラウザのフォーム送信("application/x-www-form-urlencoded")のボディをオブジェクトに変換
function parseFormUrlEncoded(body) {
  const obj = {};

  // キー=値のペアを抽出
  const pairs = body.split("&").filter(Boolean);

  for (const pair of pairs) {
    // キーと値を分割
    const [k, v = ""] = pair.split("=");

    // キーと値の空白は+で送られることがあるため、+を空白に変換してデコード
    const key = decodeURIComponent(k.replace(/\+/g, " "));
    const val = decodeURIComponent(v.replace(/\+/g, " "));
    obj[key] = val;
  }
  return obj;
}

// レスポンス組み立て(HTTP/1.1のテキスト)
function buildResponse(statusCode, statusText, headers, body = "") {
  const date = new Date().toUTCString();
  const contentLength = Buffer.byteLength(body, "utf8");

  const baseHeaders = {
    Date: date,
    "Content-Length": contentLength, // 文字列bodyのバイト数
    Connection: "close", // レスポンス送信後にソケットをクローズ
    ...headers,
  };
  const headerLines = Object.entries(baseHeaders)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\r\n");
  return `HTTP/1.1 ${statusCode} ${statusText}\r\n${headerLines}\r\n\r\n${body}`;
}

function methodNotAllowed(allow) {
  const body = `<!doctype html><html><body><h1>405 Method Not Allowed</h1><p>Allow: ${escapeHTML(allow)}</p></body></html>`;
  return buildResponse(
    405,
    "Method Not Allowed",
    {
      "Content-Type": "text/html; charset=UTF-8",
      Allow: allow,
    },
    body
  );
}

function notFound() {
  const body = `<!doctype html><html><body><h1>404 Not Found</h1></body></html>`;
  return buildResponse(
    404,
    "Not Found",
    {
      "Content-Type": "text/html; charset=UTF-8",
    },
    body
  );
}

// ヘッダ文字列をオブジェクトに変換
function parseHeaders(rawHeader) {
  const lines = rawHeader.split("\r\n");
  const requestLine = lines.shift() || "";
  const [method, rawPath, httpVersion] = requestLine.split(" ");
  const headers = {};
  for (const line of lines) {
    const idx = line.indexOf(":");
    if (idx !== -1) {
      const key = line.slice(0, idx).trim().toLowerCase();
      const value = line.slice(idx + 1).trim();
      headers[key] = value;
    }
  }
  return { method, rawPath, httpVersion, headers };
}

function createServer() {
  return net.createServer((socket) => {
    let buffer = ""; // ソケットからのデータ蓄積

    function tryProcessRequests() {
      while (true) {
        // ヘッダ終端の検出
        const headerEnd = buffer.indexOf("\r\n\r\n");

        // ヘッダ未到達
        if (headerEnd === -1) {
          return;
        }

        // ヘッダの解析
        const rawHeader = buffer.slice(0, headerEnd);
        const { method, rawPath, httpVersion, headers } =
          parseHeaders(rawHeader);

        // Content-Length取得（ない場合は0）
        const contentLength =
          parseInt(headers["content-length"] || "0", 10) || 0;
        const totalNeeded = headerEnd + 4 + contentLength;
        if (buffer.length < totalNeeded) {
          // ボディがまだ未着
          return;
        }

        // ヘッダ＋ボディを切り出し
        const body = buffer.slice(headerEnd + 4, headerEnd + 4 + contentLength);

        // 消費済み部分をバッファから削除
        buffer = buffer.slice(totalNeeded);

        // ルーティング処理
        const path = (rawPath || "/").split("?")[0];
        let response = "";

        if (path === "/") {
          if (method === "GET") {
            response = buildResponse(
              200,
              "OK",
              {
                "Content-Type": "text/html; charset=UTF-8",
              },
              FORM_HTML
            );
          } else {
            response = methodNotAllowed("GET");
          }
        } else if (path === "/greeting") {
          if (method === "POST") {
            const ctype = (headers["content-type"] || "").toLowerCase();
            let name = "";
            let greeting = "";
            if (ctype.startsWith("application/x-www-form-urlencoded")) {
              const form = parseFormUrlEncoded(body);
              name = form.name || "";
              greeting = form.greeting || "";
            }

            const resultHtml = `<!doctype html>
  <html lang="ja">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Greeting Result</title>
    </head>
    <body>
      <h1>Greeting Result</h1>
      <p><strong>Name:</strong> ${escapeHTML(name)}</p>
      <p><strong>Greeting:</strong> ${escapeHTML(greeting)}</p>
      <p>/Back</a></p>
    </body>
  </html>`;

            response = buildResponse(
              200,
              "OK",
              {
                "Content-Type": "text/html; charset=UTF-8",
              },
              resultHtml
            );
          } else {
            response = methodNotAllowed("POST");
          }
        } else {
          response = notFound();
        }

        // レスポンス送信
        socket.write(response);

        // 今回はHTTP/1.1でも常にclose。必要ならkeep-alive対応へ拡張可。
        socket.end();
        // end()呼び出し後もバッファに未処理が残っていても接続はクローズされるため
        // ここでループを抜ける（この接続に関してはこれ以上処理しない）。
        return;
      }
    }

    socket.on("data", (chunk) => {
      buffer += chunk.toString("utf8");
      tryProcessRequests();
    });

    socket.on("error", (err) => {
      console.error("Socket error:", err?.message || err);
      try {
        socket.destroy();
      } catch (_) {}
    });
  });
}

server = createServer();

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = { createServer };
