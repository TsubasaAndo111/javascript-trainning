## 事前準備

1. GitHubでIssue操作用のトークンを発行する

   settings→Developer Settings→Personal access tokens→Tokens(classic)でrepoにチェックして作成

   作成したトークンをメモしておく

2. GitHubリポジトリのowner名とrepo名を取得する

   https://github.com/<owner名>/<repo名>となっているため自分のリポジトリのURLを確認する

3. トークンを環境変数に設定する(実行のたびに必要)
   ターミナルで`export GITHUB_TOKEN=<トークンの値>`と実行する
