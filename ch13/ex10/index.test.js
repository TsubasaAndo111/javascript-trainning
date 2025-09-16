import path from "path";
import fs from "node:fs/promises";
import { fetchSumOfFileSizes } from "./index.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("fetchSumOfFileSizes", () => {
  test("ディレクトリにファイルがない場合は0を返す", () => {
    const dirPath = path.join(__dirname, "testDir/empty-dir");

    return fetchSumOfFileSizes(dirPath).then((result) => {
      expect(result).toBe(0);
    });
  });

  test("ディレクトリ内の合計を返す", () => {
    const dirPath = path.join(__dirname, "testDir/files1");

    return fs.readdir(dirPath).then((files) => {
      // Promiseでファイルサイズ合計を計算
      const sizePromises = files.map((file) =>
        fs.stat(path.join(dirPath, file))
      );
      //sizePromises内のすべてのPromiseが解決するのを待ってから合計を計算
      return Promise.all(sizePromises).then((stats) => {
        const expectedTotal = stats.reduce((acc, stat) => acc + stat.size, 0);
        return fetchSumOfFileSizes(dirPath).then((result) => {
          expect(result).toBe(expectedTotal);
        });
      });
    });
  });
});
