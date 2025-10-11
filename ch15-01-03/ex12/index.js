javascript: (function () {
  var selected = window.getSelection().toString();
  if (selected) {
    window.open(
      "https://www.google.com/search?q=" + encodeURIComponent(selected),
      "_blank"
    );
  }
})();
/*
window.getSelection()は、ユーザーがページ上で選択しているテキストの範囲を表すオブジェクトを取得する
window.open(url, target) は新しいブラウザのタブやウィンドウを開く命令。
URLはGoogle検索のURLの形にしていて、q=の後に検索クエリを入れる。
encodeURIComponent(selected)は、選択したテキストをURLエンコード（特殊文字をURLで使える形式に変換）
これによりスペースや日本語などが安全にURLに含まれる
第二引数の"_blank"は新しいタブで開く指定。
*/
