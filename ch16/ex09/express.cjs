const express = require("express");
const fs = require("fs");
const path = require("path");

// テストから使えるよう、app を生成して返す関数にする
function createApp(rootDirectory) {
  const app = express();

  // /test/mirror
  app.all("/test/mirror", (req, res) => {
    res.set("Content-Type", "text/plain; charset=UTF-8");
    res.status(200);

    const ver =
      req.httpVersion || `${req.httpVersionMajor}.${req.httpVersionMinor}`;
    res.write(`${req.method} ${req.originalUrl} HTTP/${ver}\r\n`);

    const headers = req.rawHeaders || [];
    for (let i = 0; i < headers.length; i += 2) {
      res.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
    }
    res.write("\r\n");

    req.pipe(res);
  });

  // それ以外は静的ファイル（キャッチオール）
  app.all(/.*/, (req, res) => {
    let filename = (req.path || "/").substring(1);
    filename = filename.replace(/\.\.\//g, "");
    filename = path.resolve(rootDirectory, filename || "");

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
      res.set("Content-Type", type);
      res.status(200);
      stream.pipe(res);
    });

    stream.on("error", (err) => {
      res.set("Content-Type", "text/plain; charset=UTF-8");
      res.status(404).end(err.message);
    });
  });

  return app;
}

// CLI 起動用
if (require.main === module) {
  const root = process.argv[2] || "/tmp";
  const port = parseInt(process.argv[3]) || 8000;
  const app = createApp(root);
  app.listen(port, () => {
    console.log("Listening on port", port);
  });
}

module.exports = { createApp };
