import path from "path";
import fs from "node:fs/promises";
import { fetchFirstFileSize, fetchSumOfFileSizes } from "./index.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("fetchFirstFileSize", () => {
  test("ディレクトリにファイルがない場合はnullを返す", async () => {
    const dirPath = path.join(__dirname, "testDir/empty-dir");
    const result = await fetchFirstFileSize(dirPath);
    expect(result).toBeNull();
  });

  test("最初のファイルのサイズを返す", async () => {
    const dirPath = path.join(__dirname, "testDir/files1");
    const files = await fs.readdir(dirPath);
    const statInfo = await fs.stat(path.join(dirPath, files[0]));
    const result = await fetchFirstFileSize(dirPath);
    expect(result).toBe(statInfo.size);
  });
});

describe("fetchSumOfFileSizes", () => {
  test("ディレクトリにファイルがない場合は0を返す", async () => {
    const dirPath = path.join(__dirname, "testDir/empty-dir");
    const result = await fetchSumOfFileSizes(dirPath);
    expect(result).toBe(0);
  });

  test("ディレクトリ内の合計を返す", async () => {
    const dirPath = path.join(__dirname, "testDir/files1");
    const files = await fs.readdir(dirPath);

    const stats = await Promise.all(
      files.map((file) => fs.stat(path.join(dirPath, file)))
    );

    const expectedTotal = stats.reduce((acc, stat) => acc + stat.size, 0);
    const result = await fetchSumOfFileSizes(dirPath);
    expect(result).toBe(expectedTotal);
  });
});
