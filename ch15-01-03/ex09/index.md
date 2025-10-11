## ReactのXSS対策

- デフォルトでの自動エスケープ処理

  JSX に変数を埋め込むと、React は自動的に HTML エスケープを行う。  
  具体的には<>&"'をエスケープすることにより、scriptタグやimgタグなどのXSSをただの文字列として表示するようにする。

## ReactのXSSに対する残存脆弱性

- dangerouslySetInnerHTMLの利用
  自動エスケープを無効化するためのオプション。  
  これを使うと、スクリプトが実行される可能性がある。

- javascriptスキームの悪用
  hrefにjavascript:スキームを使うと、クリック時にJavaScriptが実行される。
  そのため、javacript:以降に悪意のあるスクリプトが指定されるとXSS攻撃を受ける。
  ```
  const userInput = "javascript:alert('XSS')";
  return <a href={userInput}>Click me</a>;
  ```
