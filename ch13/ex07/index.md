# 以下の各関数を実行すると何が出力されるか予想し実際に確認しなさい。またその理由を 2、3 行のテキスト、図のいずれかまたは両方で説明しなさい

- h1  
   [予想]  
   3秒後にAが出力、その2秒後にBが出力、その１秒後にCが出力  
  [結果]

  ```
  A
  B
  C
  ```

  [理由]  
  await wait3()でwait3()が終わるまで他の処理がストップする。  
  そして、wait3()完了後にlogA()でAが出力される。これが繰り返される。

- h2  
   [予想]  
   Xが出力される。
  [結果]

  ```
  X
  ```

  [理由]  
  new Promiseにcatchがチェーンされているから、Promise内で発生した例外をキャッチして、Xが出力される。

- h3  
   [予想]  
   なにも出力されない。

  [結果]

  ```
  Error: X
  at errX (file:///C:/Users/r00000546/Documents/git_repository/javascript-training/ch13/ex07/index.js:24:9)
  at file:///C:/Users/r00000546/Documents/git_repository/javascript-training/ch13/ex07/index.js:53:5
  at new Promise (<anonymous>)
  at h3 (file:///C:/Users/r00000546/Documents/git_repository/javascript-training/ch13/ex07/index.js:52:3)
  at file:///C:/Users/r00000546/Documents/git_repository/javascript-training/ch13/ex07/index.js:42:1
  at ModuleJob.run (node:internal/modules/esm/module_job:268:25)
  at async onImport.tracePromise.**proto** (node:internal/modules/esm/loader:543:26)
  at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)
  ```

[理由]  
asyncはPromiseを返すから、new Promise内にPromiseが入っている状態。  
ただ、内側のPromise内で例外が発生してもnew Promiseがrejectされるわけではないため、catchされず、コンソールに例外が出力されるだけとなる。

- h4
  [予想]
  Yが出力される。

[結果]

```
file:///C:/Users/r00000546/Documents/git_repository/javascript-training/ch13/ex07/index.js:27
  throw new Error("Y");
        ^

Error: Y
    at errY (file:///C:/Users/r00000546/Documents/git_repository/javascript-training/ch13/ex07/index.js:27:9)
    at file:///C:/Users/r00000546/Documents/git_repository/javascript-training/ch13/ex07/index.js:64:7

Node.js v22.10.0
```

[理由]
const p1,p2のところで非同期処理は実行される。  
p2の方が待ち時間が短いため、await p1が完了する前に、p2がエラーを投げてしまった。  
そのため、p2はawaitされていない(Promiseが返されていない)エラーとなり、catchされなかった。
