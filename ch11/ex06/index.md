# メールアドレスの正規表現として一般的には何を使うのがよいか
HTMLの標準仕様を定めるWHATWGの正規表現を使用するのがよいという意見あり

各ブラウザデフォルトの```<input type="email" />```のバリデーションと一致するため。

https://zenn.dev/igz0/articles/email-validation-regex-best-practices

```js
/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
```