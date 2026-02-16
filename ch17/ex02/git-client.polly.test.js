const { Polly } = require("@pollyjs/core");
const FetchAdapter = require("@pollyjs/adapter-fetch");
const FsPersister = require("@pollyjs/persister-fs");

const { listOpenIssues } = require("./git-client");

Polly.register(FetchAdapter);
Polly.register(FsPersister);

describe("GitHub API Integration Test (Polly)", () => {
  let polly;

  beforeAll(() => {
    polly = new Polly("github-recording", {
      adapters: ["fetch"], // fetch リクエストを録画
      persister: "fs", // ファイルに保存
      persisterOptions: {
        fs: { recordingsDir: "ex02/recordings" },
      },
      recordIfMissing: true, // 録画ファイルがなければ実API呼び出し
    });
  });

  afterAll(async () => {
    await polly.stop(); // 録画ファイルの書き込み完了
  });

  test("listOpenIssues returns an array of issues", async () => {
    const issues = await listOpenIssues({
      owner: "TsubasaAndo111",
      repo: "javascript-trainning",
      token: process.env.GITHUB_TOKEN, // 初回のみ必要
      verbose: false,
    });

    expect(Array.isArray(issues)).toBe(true);
  });
});
