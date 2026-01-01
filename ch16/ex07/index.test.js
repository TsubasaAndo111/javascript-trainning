// __tests__/checkEntry.test.js
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import net from "node:net";
import { checkEntry } from "./index.js";

// テスト用の一時ディレクトリとクリーンアップ関数群
// 各テスト用関数でクリーンアップ関数を格納することで後処理をしやすいように
let tmpDir;
let cleanup = [];

// ファイル作成
async function createFile(p, content = "hello") {
  await fs.promises.writeFile(p, content, "utf8");
  cleanup.push(async () => fs.promises.unlink(p).catch(() => {}));
  return p;
}

// ディレクトリ作成
async function createDir(p) {
  await fs.promises.mkdir(p, { recursive: true });
  cleanup.push(async () =>
    fs.promises.rm(p, { recursive: true, force: true }).catch(() => {})
  );
  return p;
}

// シンボリックリンク作成
async function createSymlink(target, linkPath) {
  await fs.promises.symlink(target, linkPath);
  cleanup.push(async () => fs.promises.unlink(linkPath).catch(() => {}));
  return linkPath;
}

// ソケット作成
async function createUnixSocket(socketPath) {
  // ソケットを listen するとファイルパスにソケットが作成される
  const server = await new Promise((resolve, reject) => {
    const s = net.createServer(() => {}).on("error", reject);
    s.listen(socketPath, () => resolve(s));
  });
  cleanup.push(
    async () =>
      new Promise((res) =>
        server.close(() => {
          fs.promises.unlink(socketPath).catch(() => {});
          res();
        })
      )
  );
  return socketPath;
}

beforeAll(async () => {
  // OSの一時ディレクトリにユニークな一時ディレクトリを作成
  tmpDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "check-entry-"));
});

afterAll(async () => {
  // 個別クリーンアップ
  // pushした逆順に処理、ディレクトリ→ファイルの順に作成した場合、逆順に削除した方が安全だから
  for (const fn of cleanup.reverse()) {
    await fn().catch(() => {});
  }
  // テスト用ディレクトリ削除
  if (tmpDir) {
    await fs.promises
      .rm(tmpDir, { recursive: true, force: true })
      .catch(() => {});
  }
});

test("通常ファイルを 'file' と判定できる", async () => {
  const p = path.join(tmpDir, "sample.txt");
  await createFile(p);
  await expect(checkEntry(p)).resolves.toBe("file");
});

test("ディレクトリを 'directory' と判定できる", async () => {
  const p = path.join(tmpDir, "dirA");
  await createDir(p);
  await expect(checkEntry(p)).resolves.toBe("directory");
});

test("ファイルへのシンボリックリンクは 'symlink' と判定される", async () => {
  const target = path.join(tmpDir, "real-file.txt");
  const link = path.join(tmpDir, "link-to-file");
  await createFile(target);
  await createSymlink(target, link);
  await expect(checkEntry(link)).resolves.toBe("symlink");
});

test("ディレクトリへのシンボリックリンクは 'symlink' と判定される", async () => {
  const targetDir = path.join(tmpDir, "real-dir");
  const linkDir = path.join(tmpDir, "link-to-dir");
  await createDir(targetDir);
  await createSymlink(targetDir, linkDir);
  await expect(checkEntry(linkDir)).resolves.toBe("symlink");
});

test("存在しないリンクは 'notfound' を返す", async () => {
  // 存在しないターゲットに対するリンクを作成
  await fs.promises.symlink(path.join(tmpDir, "missing-target"), "aaa.txt");
  cleanup.push(async () => fs.promises.unlink(brokenLink).catch(() => {}));
  await expect(checkEntry(brokenLink)).resolves.toBe("notfound");
});

test("file,directory以外は 'unknown' を返す", async () => {
  // ソケットを作成して実行
  const sockPath = path.join(tmpDir, "app.sock");
  await createUnixSocket(sockPath);
  await expect(checkEntry(sockPath)).resolves.toBe("unknown");
});
