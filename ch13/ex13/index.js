import fs from "fs/promises";
import path from "path";

export async function* walk(rootPath) {
  const stat = await fs.stat(rootPath);

  yield {
    path: rootPath,
    isDirectory: stat.isDirectory(),
  };

  if (stat.isDirectory()) {
    const entries = await fs.readdir(rootPath);
    for (const entry of entries) {
      const fullPath = path.join(rootPath, entry);
      yield* walk(fullPath); // 再帰的に探索
    }
  }
}
