import fs from "fs";

export function* readLines(filePath) {
  const BUFFER_SIZE = 64 * 1024; // 64KB
  const buffer = Buffer.alloc(BUFFER_SIZE); // バッファサイズ分のメモリ領域を確保して使いまわす

  let fd;
  try {
    fd = fs.openSync(filePath, "r"); // ファイルのオープン
    let leftover = ""; // 前回の読み込みの改行以降を保持
    let bytesRead;

    // 64KBずつ読み取りながら、処理を進めていく
    do {
      bytesRead = fs.readSync(fd, buffer, 0, BUFFER_SIZE, null); // バッファサイズを指定して読み込む、読み取り位置を自動で進めながら読み取る
      const chunk = buffer.toString("utf8", 0, bytesRead); // utf-8で文字列に変換
      const lines = (leftover + chunk).split("\n"); // 改行コードで分割
      leftover = lines.pop(); // 配列の最後の要素をleftoverに戻す(文字列が改行コードで終わる場合は空文字になるため)

      for (const line of lines) {
        yield line;
      }
    } while (bytesRead > 0); // ファイルから読み込んだバイト数(fs.bytesRead)がある場合

    if (leftover) {
      yield leftover; // 最後の残りの行（改行が無くても）
    }
  } finally {
    // finallyブロックに入ってもファイルがオープンされているときだけ
    if (fd !== undefined) {
      fs.closeSync(fd);
    }
  }
}
