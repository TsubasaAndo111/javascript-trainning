import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

// 最初のファイルのサイズを取得
export async function fetchFirstFileSize(path) {
  const files = await readdir(path);
  if (files.length === 0) {
    return null;
  }

  const stats = await stat(join(path, files[0]));
  return stats.size;
}

// ディレクトリ内のすべてのファイルサイズを合計して返す
export async function fetchSumOfFileSizes(path) {
  const files = await readdir(path);
  let total = 0;

  for (const file of files) {
    const stats = await stat(join(path, file));
    total += stats.size;
  }

  return total;
}
