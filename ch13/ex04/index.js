import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

export function fetchFirstFileSize(path) {
  return readdir(path).then((files) => {
    if (files.length === 0) {
      return null;
    }
    return stat(join(path, files[0])).then((stats) => stats.size);
  });
}

// ディレクトリ内のすべてのファイルサイズを合計して返す
export function fetchSumOfFileSizes(path) {
  return readdir(path).then((files) => {
    let total = 0;
    const rest = [...files];

    function iter() {
      if (rest.length === 0) {
        return Promise.resolve(total); // Promiseチェーンを解決
      }

      const next = rest.pop();
      return stat(join(path, next)).then((stats) => {
        total += stats.size;
        return iter(); // 再帰的に続けることでPromiseチェーンができる
      });
    }

    return iter();
  });
}
