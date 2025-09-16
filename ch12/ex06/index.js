import fs from "fs";
import path from "path";

export function* walk(rootPath) {
  const stat = fs.statSync(rootPath); // ファイル・ディレクトリの存在確認

  yield {
    path: rootPath,
    isDirectory: stat.isDirectory(), // ディレクトリかどうか
  };

  // ディレクトリなら中身を再帰的に読み込む
  if (stat.isDirectory()) {
    const entries = fs.readdirSync(rootPath); // ディレクトリ内のファイルやサブディレクトリの一覧を取得
    for (const entry of entries) {
      const fullPath = path.join(rootPath, entry);
      yield* walk(fullPath);
    }
  }
}
