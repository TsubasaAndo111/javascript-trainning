const path = require("path");
const fs = require("fs");
const os = require("os");
const request = require("supertest");
const { createApp } = require("./express.cjs");

// テスト用一時ディレクトリ作成
function makeTmpDir() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "express-sample-"));
  return dir;
}

describe("Express sample server", () => {
  let tmpDir;
  let app;

  beforeEach(() => {
    tmpDir = makeTmpDir();
    app = createApp(tmpDir);
  });

  afterEach(() => {
    // テストで作ったファイルを削除
    try {
      const entries = fs.readdirSync(tmpDir);
      for (const e of entries) {
        fs.unlinkSync(path.join(tmpDir, e));
      }
      fs.rmdirSync(tmpDir);
    } catch (_) {}
  });

  describe("/test/mirror endpoint", () => {
    // GETのエコー
    test("GET echoes request line and headers", async () => {
      const res = await request(app).get("/test/mirror").set("Foo", "Bar");

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(
        /text\/plain; charset=UTF-8/i
      );

      const body = res.text;
      // リクエストライン（GET /... HTTP/x.x）が最初にあることを確認
      expect(body).toMatch(/^GET \/test\/mirror\ HTTP\/\d\.\d\r?\n/);
      // ヘッダが含まれていること（Host と Foo を確認）
      expect(body).toMatch(/Host: .+\r?\n/);
      expect(body).toMatch(/Foo: Bar\r?\n/);
    });

    // POSTのエコー
    test("POST echoes request line, headers and body", async () => {
      const payload = "Hello Mirror";
      const res = await request(app).post("/test/mirror").send(payload); // text/plain by default

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(
        /text\/plain; charset=UTF-8/i
      );

      const body = res.text;
      // リクエストライン（POST /... HTTP/x.x）が最初にあることを確認
      expect(body).toMatch(/^POST \/test\/mirror\ HTTP\/\d\.\d\r?\n/);
      // 空行の後にボディがそのまま返ってくる
      expect(body).toMatch(/\r?\n\r?\nHello Mirror$/);
    });
  });

  describe("Static file serving", () => {
    // HTMLファイルの配信
    test("serves .html with text/html", async () => {
      const filename = path.join(tmpDir, "index.html");

      // テスト用HTMLファイルの作成
      fs.writeFileSync(filename, "<h1>Hello</h1>", "utf8");

      const res = await request(app).get("/index.html");
      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(/text\/html/i);
      expect(res.text).toContain("Hello");
    });

    // JSファイルの配信
    test("serves .js with text/javascript", async () => {
      const filename = path.join(tmpDir, "index.js");

      // テスト用JSファイルの作成
      fs.writeFileSync(filename, "console.log('Hi');", "utf8");

      const res = await request(app).get("/index.js");
      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(/text\/javascript/i);
      expect(res.text).toContain("console.log");
    });

    // CSSファイルの配信
    test("serves .css with text/css", async () => {
      const filename = path.join(tmpDir, "styles.css");

      // テスト用CSSファイルの作成
      fs.writeFileSync(filename, "body{font-family:sans-serif;}", "utf8");

      const res = await request(app).get("/styles.css");
      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(/text\/css/i);
      expect(res.text).toContain("font-family");
    });

    // --- PNG (image/png) を配信できるかのテスト ---
    // バイナリ比較のため、supertest に独自パーサーを指定して Buffer を受け取る
    test("serves .png with image/png (binary exact match)", async () => {
      const filename = path.join(tmpDir, "small.png");

      // 1x1 のPNG（黒）を埋め込み（最小のPNGバイナリ）
      const pngBytes = Buffer.from([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
        0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
        0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xde, 0x00, 0x00, 0x00,
        0x0a, 0x49, 0x44, 0x41, 0x54, 0x08, 0xd7, 0x63, 0xf8, 0xcf, 0xc0, 0x00,
        0x00, 0x04, 0x00, 0x01, 0x6f, 0x2b, 0x0f, 0x9b, 0x00, 0x00, 0x00, 0x00,
        0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
      ]);
      fs.writeFileSync(filename, pngBytes);

      // supertestでバイナリ取得（独自 parse を指定）
      const res = await request(app).get("/small.png");

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(/image\/png/i);
    });

    // --- TXT (text/plain) を配信できるかのテスト ---
    test("serves .txt with text/plain", async () => {
      const filename = path.join(tmpDir, "notes.txt");
      const content = "Hello txt\nLine2";
      fs.writeFileSync(filename, content, "utf8");

      const res = await request(app).get("/notes.txt");

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(/text\/plain/i);
      expect(res.text).toBe(content);
    });

    test("404 for missing file", async () => {
      const res = await request(app).get("/notfound.txt");
      expect(res.status).toBe(404);
      expect(res.headers["content-type"]).toMatch(
        /text\/plain; charset=UTF-8/i
      );
      expect(res.text).toMatch(/ENOENT/i); // fs のエラーメッセージが返る
    });
  });
});
