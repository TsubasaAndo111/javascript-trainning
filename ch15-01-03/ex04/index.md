# グローバルオブジェクトを参照する方法

- globalThis(ブラウザ,Node.js問わず)
- window(ブラウザ)
- global(Node.js)

# ブラウザと Node.js のグローバルオブジェクトのプロパティ/メソッドの比較

共通するプロパティ/メソッド

- setTimeout 一定時間後に関数を実行
- clearTimeout setTimeout のキャンセル
- console ログ出力
- Math 数学関数
- JSON JSON 変換

ブラウザに存在しない(ブラウザ独自)プロパティ/メソッド

- document DOM 操作用のオブジェクト
- window グローバルウィンドウオブジェクト
- location 現在のURL情報を含むオブジェクト
- navigator ブラウザやOS情報など
- localStorage 永続的なクライアントサイドストレージ
- sessionStorage セッション中のストレージ
- alert() アラートダイアログを表示
- confirm() OK/キャンセルの確認ダイアログ
- prompt() ユーザー入力を受け取るダイアログ
- fetch() HTTPリクエストを行う（Node.js でも対応してきたが、元はブラウザ）

# undefined の定義と過去のES仕様での問題点

現在の仕様

```ts
undefined = 123; // 無効、無視される（strict mode ではエラー）
console.log(undefined); // → undefined
```

過去の仕様の問題点  
以前まではundefinedはただの変数として扱われていたため書き換え可能だった  
他人のコードがundefinedを書き換えた場合、チェックが壊れる。
