class FileSizeLimitError extends Error {
  constructor(filePath, fileSize, limit) {
    super(
      `ファイル "${filePath}" のサイズ (${fileSize} bytes) は上限 ${limit} bytes を超えています。`
    );
    this.filePath = filePath;
    this.fileSize = fileSize;
    this.limit = limit;
  }
}

let error = new FileSizeLimitError("aaa.txt", 300, 100); // ファイル "aaa.txt" のサイズ (300 bytes) は上限 100 bytes を超えています。
console.log(error.message)