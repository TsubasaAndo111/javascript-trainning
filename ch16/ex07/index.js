import fs from "node:fs";

export async function checkEntry(path) {
  try {
    const lst = await fs.promises.lstat(path); // リンクの有無を先に判定

    // シンボリックリンクの判定
    // シンボリックリンクだと意図しない場所への走査が発生するリスクあり
    if (lst.isSymbolicLink()) {
      return "symlink";
    }

    // statの取得
    const st = await fs.promises.stat(path);

    // file or directory
    if (st.isFile()) return "file";
    if (st.isDirectory()) return "directory";

    // 当てはまるものなし
    return "unknown";
  } catch (err) {
    // statの取得に失敗した場合
    return "notfound";
  }
}
