import path from "path";
import { fileURLToPath } from "url";
import { walk } from "./index.js"; // テスト対象ファイルへのパスに変更してください

describe("walk", () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const testDir = path.join(__dirname, "testDir");

  test("再帰的に探索できているか", () => {
    const results = Array.from(walk(testDir));

    // 期待されるパスと種別
    const expected = [
      { path: testDir, isDirectory: true },
      { path: path.join(testDir, "file1.txt"), isDirectory: false },
      { path: path.join(testDir, "dirA"), isDirectory: true },
      { path: path.join(testDir, "dirA", "file2.txt"), isDirectory: false },
      { path: path.join(testDir, "dirA", "dirB"), isDirectory: true },
      {
        path: path.join(testDir, "dirA", "dirB", "file3.txt"),
        isDirectory: false,
      },
    ];

    // 結果の検証（結果の中にexpectedのすべての要素が含まれていればOk）
    expect(results).toEqual(expect.arrayContaining(expected));
    expect(results.length).toBe(expected.length);
  });
});
