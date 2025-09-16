import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

// ディレクトリ内のすべてのファイルサイズを合計して返す（並行処理版）
export function fetchSumOfFileSizes(path) {
  return readdir(path).then((files) => {
    const statPromises = files.map((file) => stat(join(path, file)));

    return Promise.all(statPromises).then((statsArray) => {
      return statsArray.reduce((total, stats) => total + stats.size, 0);
    });
  });
}
