# with文の実行結果

{ a: 1, b: 2, obj: { a: 4, b: 4 } }

{ a: 4, b: 2, obj: { b: 4 } }

{ a: 1, b: 2, obj: { a: 2 } }

{ a: 2, b: 2, obj: {} }

# with文を使わずに書く場合
- ブロック1：obj.a = obj.b

- ブロック2：a = obj.b

- ブロック3：obj.a = b

- ブロック4：a = b