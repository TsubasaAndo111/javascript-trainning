# 動作確認

- 方法

1. index.jsを作成
2. `$ openssl dgst -sha384 -binary index.js | openssl base64 -A`でハッシュ値を計算
3. integrityに2.で計算したハッシュ値を指定して、index.htmlを作成
4. `http-server -p 8000`で自作サーバを立てて、index.htmlを開く(file://だとCORSによってブロックされるため)
5. 開発者コンソールを開き、指定した文字列がコンソールに出力されていることを確認
6. index.jsのプログラムを少し変更する。
7. 同じようにindex.htmlを開き、開発者コンソールに文字列が表示されないことを確認(ブラウザにキャッシュが残っているかもなので、シークレットウィンドウで開く)

- 結果

  5.ではコンソールに意図した文字列が出力された。7.ではコンソールに以下のようなエラーメッセージが出力された。

```
Failed to find a valid digest in the 'integrity' attribute for resource 'http://localhost:8000/index.js' with computed SHA-384 integrity '7kFwtRxJAyxjGosqab7/RJKUipLm+i3b+bedmapKTnbrVmCJ6nmpbrr9xetBZyMw'. The resource has been blocked.
```

# SRIが防げる攻撃

特定の外部リソースのファイルの改ざんに対して防御できる  
自前のリソースが改ざんされるときは、HTMLファイルごと書き換えられるから効果がない

例えば、CDN の改ざんを防御できる  
ライブラリを配信している CDN のファイルが改変され、悪意あるコードが混入された場合でも、HTML に書いたハッシュと一致しなければブラウザが読み込みを拒否する
