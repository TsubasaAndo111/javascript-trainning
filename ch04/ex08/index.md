# if (foo === undefined) { ... }ではなく、if (foo === void 0) { ... }を使っていた理由＋今は使われていない理由

undefinedはあくまで変数であるため、古いJavaScriptエンジンでは上書き可能であり、undefined以外の値が入っていることがある。

一方、void 0 は絶対にundefinedを返すため、使われていた。

HTMLのaタグのhref属性にundefinedを指定して、onclickは使いたいけど、遷移はしたくないってときに使っていたらしい。

(hrefを指定しないとリンクとして認識されず、カーソル合わせてもポインタにならなかったらしい)

https://techplay.jp/column/559

しかし、最近のブラウザでは ECMAScript 5 の仕様により、undefinedは設定不可、書き込み不可のプロパティとなったため、void 0は使われていない。

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/undefined
