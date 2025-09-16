import path from "path";
import { fileURLToPath } from "url";
import { walk } from "./index.js";

describe("walk", () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const testDir = path.join(__dirname, "testDir");

  it("再帰的に探索できているか", async () => {
    const results = [];

    for await (const entry of walk(testDir)) {
      results.push(entry);
    }

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

    // 検証：results が expected をすべて含み、長さも一致しているか
    expect(results).toEqual(expect.arrayContaining(expected));
    expect(results.length).toBe(expected.length);
  });
});
