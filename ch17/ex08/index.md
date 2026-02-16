## プロジェクト作成

```bash
cd ch17
npm create vite@latest ex08 -- --template react
cd ex08
npm install
npm run dev
```

## Reactメモ

- useStateで状態を保持する。[現在の値, 値を変更する関数]となっている。
- HTMLっぽい感じで書いて、イベントで状態を変化させる感じに変更
- cra(create react app)やviteはReactを動かすための開発環境
- craよりも最近はviteらしいのでviteを使用
- craは必ずファイルをまとめてからサーバ起動だが、viteは都度変換するから起動が早いらしい
