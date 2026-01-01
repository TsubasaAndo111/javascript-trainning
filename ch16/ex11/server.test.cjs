const { createServer } = require("./server.cjs");
const request = require("supertest");

let server;
let baseURL;

beforeAll((done) => {
  server = createServer();
  // ポート 0: OS が空いているポートを割り当ててくれる
  server.listen(0, () => {
    const { port } = server.address();
    baseURL = `http://127.0.0.1:${port}`;
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe("HTTP server (netのみ実装) 仕様テスト", () => {
  test("GET / はフォームHTMLを返す (200, text/html)", async () => {
    const res = await request(baseURL).get("/");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/html/i);
    // フォーム要素の存在を確認（エンコード差異の影響が少ない文字列にする）
    expect(res.text).toContain("Greeting Form");
    expect(res.text).toMatch(/action="\/greeting"/);
    expect(res.headers["connection"]).toMatch(/close/i);
  });

  test("POST /greeting は name, greeting を含むHTMLを返す (200)", async () => {
    const res = await request(baseURL)
      .post("/greeting")
      .type("form") // application/x-www-form-urlencoded
      .send({ name: "太郎", greeting: "こんにちは" });

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/html/i);
    expect(res.text).toContain("<strong>Name:</strong>");
    expect(res.text).toContain("太郎");
    expect(res.text).toContain("<strong>Greeting:</strong>");
    expect(res.text).toContain("こんにちは");
  });

  test('XSS がエスケープされる（<, >, &, "）', async () => {
    const res = await request(baseURL).post("/greeting").type("form").send({
      name: "<script>alert(1)</script>",
      greeting: '"hello" & <tag>',
    });

    // escapeHTML の結果（&lt; &gt; &amp; &quot;）が出力に含まれること
    expect(res.status).toBe(200);
    expect(res.text).toMatch(/&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
    expect(res.text).toMatch(/&quot;hello&quot; &amp; &lt;tag&gt;/);
  });

  test("GET /greeting は 405 Method Not Allowed + Allow: POST", async () => {
    const res = await request(baseURL).get("/greeting");
    expect(res.status).toBe(405);
    expect(res.text).toContain("405 Method Not Allowed");
    expect(res.headers["allow"]).toBe("POST");
  });

  test("POST / は 405 Method Not Allowed + Allow: GET", async () => {
    const res = await request(baseURL).post("/");
    expect(res.status).toBe(405);
    expect(res.text).toContain("405 Method Not Allowed");
    expect(res.headers["allow"]).toBe("GET");
  });

  test("未対応パスは 404 Not Found", async () => {
    const res = await request(baseURL).get("/not-exist");
    expect(res.status).toBe(404);
    expect(res.text).toContain("404 Not Found");
  });
});
