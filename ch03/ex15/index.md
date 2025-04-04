## 予想
0
1
2
3
4
5
6
7
8
9
undefined

## 結果
0
1
2
3
4
5
6
7
8
9
file:///C:/Users/r00000546/Documents/javascript-training/ch03/ex15/index.js:8
  console.log(i);
              ^

ReferenceError: i is not defined
    at file:///C:/Users/r00000546/Documents/javascript-training/ch03/ex15/index.js:8:15
    at ModuleJob.run (node:internal/modules/esm/module_job:268:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:543:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)

Node.js v22.10.0

## 理由
letで定義された変数はブロック内でのみ有効である。

そのため、functionの中で定義された `let i = 100;`は出力されない。

for文の中で定義されているのはループのためのfor` (let i = 0; i < 10; i++)`の部分だから、0～9までの数字が出力される。

また、for文の外ではiは定義されていないため、console.logを使用としてもnot definedのエラーとなってしまう。

## コード内のすべてのletをvarに変えた場合
結果は0～10の数字が出力される。

varは宣言された関数全体がスコープである。

そのため、functionの中で定義された `let i = 100;`はfor文の内がスコープ外となるため、出力されない。

for文の中で定義されているのはループのためのfor` (let i = 0; i < 10; i++)`の部分だから、0～9までの数字が出力される。

また、関数の外側でvarを用いて宣言すると、その変数はグローバル変数となるため、for文の外もスコープとなり、10も出力される。

## コード内のすべてのletを消した場合（非strictモードでのみ実行可能）
ECMAScriptモジュールではstrictモードを解除できないため、以下のサイトで実行
https://paiza.io/projects/Q8_E7sMtORoyB4EgnkRp6Q?language=javascript　


以下のような出力となった。

100
101

理由は、非strictモードで宣言なしだとグローバル変数となるためである。

最初のループに入った後、function内でi=100となり、console.logされる。

そして、iがインクリメントされて、ループを抜け、console.log()で101が出力されるためである。

