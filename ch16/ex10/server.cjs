const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const { pipeline } = require("stream");

// メモリ使用率計測用
const MB = 1024 * 1024;
class MemSampler {
  constructor(intervalMs = 50) {
    this.intervalMs = intervalMs;
    this.samples = [];
    this.timer = null;
  }
  start() {
    if (this.timer) return; // 既にタイマーが起動しているときは何も行わない
    this.timer = setInterval(() => {
      const m = process.memoryUsage();
      this.samples.push(m.rss);
    }, this.intervalMs);
  }
  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    const n = this.samples.length || 1;
    const sum = this.samples.reduce((a, b) => a + b, 0);
    const avg = sum / n;
    const max = this.samples.reduce((a, b) => Math.max(a, b), 0);

    // サンプルをクリア
    this.samples = [];
    return {
      avgMB: avg / MB,
      maxMB: max / MB,
    };
  }
}

function serve(rootDirectory, port) {
  const server = new http.Server();
  server.listen(port);
  console.log("Listening on port", port);

  server.on("request", async (request, response) => {
    const endpoint = url.parse(request.url).pathname;

    // 計測開始
    const t0 = process.hrtime.bigint(); // ナノ秒精度の時計
    const sampler = new MemSampler(50); // 50ms間隔（変更可）メモリ計測用
    sampler.start();
    let finalized = false;
    const finalize = (label) => {
      if (finalized) return;
      finalized = true;
      const t1 = process.hrtime.bigint();
      const durationMs = Number(t1 - t0) / 1e6; // ナノ秒をミリ秒に変換
      const mem = sampler.stop();

      console.log(
        ` ${request.method} ${request.url} ${label} ` +
          `duration=${durationMs.toFixed(2)}ms avgRSS=${mem.avgMB.toFixed(2)}MB ` +
          `maxRSS=${mem.maxMB.toFixed(2)}MB`
      );
    };
    // レスポンスが終了したら測定終了
    response.once("finish", () => finalize("finish"));
    response.once("close", () => finalize("close"));

    if (endpoint === "/test/mirror") {
      response.setHeader("Content-Type", "text/plain; charset=UTF-8");
      response.writeHead(200);

      response.write(
        `${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`
      );

      const headers = request.rawHeaders;
      for (let i = 0; i < headers.length; i += 2) {
        response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
      }
      response.write("\r\n");
      request.pipe(response);
      return;
    } else {
      // 先頭の/を除去して相対パス化
      let filename = endpoint.substring(1);
      // ../を除去
      filename = filename.replace(/\.\.\//g, "");
      // 絶対パスを作成
      filename = path.resolve(rootDirectory, filename);

      if (request.method === "PUT") {
        try {
          // ディレクトリ作成
          const dir = path.dirname(filename);
          await fs.promises.mkdir(dir, { recursive: true });

          // ファイル存在チェック
          const existedBefore = fs.existsSync(filename);

          // 上書きモードで書き込み用ストリーム作成
          const writeStream = fs.createWriteStream(filename, { flags: "w" });

          // クライアントから送られるHTTPボディをwriteStreamへ安全に接続
          pipeline(request, writeStream, (err) => {
            if (err) {
              response.setHeader("Content-Type", "text/plain; charset=UTF-8");
              response.writeHead(500);
              response.end(`Upload failed: ${err.message}`);
              return;
            }
            // Success(既存ファイルがあれば200 OK, 新規作成は201 created)
            const status = existedBefore ? 200 : 201;
            response.setHeader("Content-Type", "text/plain; charset=UTF-8");
            response.writeHead(status);
            response.end(
              existedBefore
                ? `OK: updated ${path.relative(path.resolve(rootDirectory), filename)}`
                : `Created: ${path.relative(path.resolve(rootDirectory), filename)}`
            );
          });
        } catch (e) {
          response.setHeader("Content-Type", "text/plain; charset=UTF-8");
          response.writeHead(500);
          response.end(`Server error: ${e.message}`);
        }
        return;
      }

      if (request.method === "GET") {
        let type;
        switch (path.extname(filename)) {
          case ".html":
          case ".htm":
            type = "text/html";
            break;
          case ".js":
            type = "text/javascript";
            break;
          case ".css":
            type = "text/css";
            break;
          case ".png":
            type = "image/png";
            break;
          case ".txt":
            type = "text/plain";
            break;
          default:
            type = "application/octet-stream";
            break;
        }

        const stream = fs.createReadStream(filename);

        stream.once("readable", () => {
          response.setHeader("Content-Type", type);
          response.writeHead(200);
          stream.pipe(response);
        });

        stream.on("error", (err) => {
          response.setHeader("Content-Type", "text/plain; charset=UTF-8");
          response.writeHead(404);
          response.end(err.message);
        });
      }
    }
  });
}

serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);
