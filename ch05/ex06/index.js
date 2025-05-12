try {
  // ここが最初に実行される
  console.log("try");
  // 意図的に例外を発生させる
  throw new Error("test");
} catch (e) {
  // 2番目に実行される
  console.log("catch");
} finally {
  // 3番目に実行される
  console.log("finally");
}

// 実行結果
// try
// catch
// finally
