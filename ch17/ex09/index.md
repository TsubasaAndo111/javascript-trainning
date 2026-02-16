## TypeScriptの実行

`npm install --save-dev typescript`で開発用にTypeScriptをインストール

`npx tsc --init`でTypeScriptの設定ファイルを作成し、適宜修正する

`npx tsc`でコンパイルを実行

`node dist/caller.js`でコンパイルしたJSファイルを実行

## flowの実行

`npm install --save-dev flow-bin`で開発用にflowをインストール

`npx flow init`でflowの設定ファイルを作成

`npm install --save-dev @babel/core @babel/cli @babel/preset-flow`でFlowをサポートするBabelプラグインを使用(Flowの型注釈付きのコードはNode.jsで実行できなかったためトランスパイルする)

`babel.config.json`を作る
