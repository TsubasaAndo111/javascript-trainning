# 設定メモ

1. ch17ディレクトリへ移動
2. `npm i -D eslint prettier eslint-config-prettier`で必要なパッケージを開発用としてインストール(この後,eslintのバージョンをv8仁落とした。)
   - npm i : npm installの省略形
   - -D : --save -devの省略形
   - eslint-config-prettier : eslint側のフォーマットルールの無効化に必要
3. `package.json`のscriptsを追加
4. `.prettierrc.yaml`を作成
5. `.eslintrc.js`を作成(`format_sample.js`は除外設定する)
6. `npm run format -- ex01`でprettierを実行
7. `npm run lint -- ex01`でlintを実行し、`format_sample.js`が無視されていることを確認
   以下のエラーを検出
   ```
   C:\Users\r00000546\Documents\git_repository\javascript-training\ch17\ex01\lint_sample.js
   4:1  error  Parsing error: 'with' in strict mode
   ✖ 1 problem (1 error, 0 warnings)
   ```
8. with文を使わないように修正して、再度lint

   ```
   C:\Users\r00000546\Documents\git_repository\javascript-training\ch17\ex01\lint_sample.js
   4:1  warning  'a' is never reassigned. Use 'const' instead  prefer-const
   5:1  warning  'x' is never reassigned. Use 'const' instead  prefer-const
   6:1  warning  'y' is never reassigned. Use 'const' instead  prefer-const

   ✖ 3 problems (0 errors, 3 warnings)
   ```

9. constを使う用に修正して、再度lint実行すると警告なし
