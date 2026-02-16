## Jestでテストを実行

1. `npm install --save-dev jest`でjestをインストール

2. `package.json`にtestスクリプトを追加

3. `jest.config.cjs`を作成し、Nodeでfetchをモックするための設定を記載

4. `npm test`でテスト実行

## Pollyでテストを実行

1. `npm install --save-dev @pollyjs/core @pollyjs/adapter-fetch @pollyjs/persister-fs`でPollyをインストール

- @pollyjs/core → Polly.js の本体。録画・再生の管理
- @pollyjs/adapter-fetch →fetch API を横取りするアダプター
- @pollyjs/persister-fs → 録画データをファイルに保存・読み込みするためのパーシスタ

2. `npm test`でテスト実行
