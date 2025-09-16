# 各関数 f3 から f12 までを実行すると何が出力されるか予想し実際に確認しなさい。またその理由を 2、3 行のテキスト、図のいずれかまたは両方で説明しなさい。

- f3  
   [予想]  
   0秒後にAが出力され、エラーはキャッチできず、Cが出力される
  [結果]

  ```
  C
  A
  file:///C:/Users/r00000546/Documents/git_repository/javascript-training/ch13/ex02/index.js:24
  throw new Error("X");
        ^
  Error: X
    at errX (file:///C:/Users/r00000546/Documents/git_repository/javascript-training/ch13/ex02/index.js:24:9)
  ```

  [理由]
  .then(logA)でlogAの呼び出しはマイクロタスクとしてキューに入る。  
  その後、finallyブロックに入り、同期処理のlogCが実行される。  
  .then(logA)の終了を待たずしてtry-finallyは進んでいく  
  そして、logAが呼び出され、Aが出力されると、.then(errX)が実行されてエラーが発生する。
  しかし、非同期で発生したエラーを同期側ではcatchできない。

- f4
  [予想]
  2行後にAが出力され、その1秒後にBが出力され、直後に100が出力される。
  [結果]

  ```
  A
  B
  100
  ```

  [理由]
  wait2().thenで2秒後にlogAが実行される。  
   2番目のthenでlogBが実行され、100が返る。  
   3番目のthenでlog(100)が実行される。

- f5
  [予想]
  2行後にAが出力され、その1秒後にBが出力され、直後に100が出力される。  
  [結果]

  ```
  B
  A
  40
  ```

  [理由]
  .thenの引数には関数しか指定できず、Promiseを渡すと無視される。(プロミスチェーン上ではないとされる)。  
  そのため、今回、2番目のthenにPromiseを渡しているため、その処理はプロミスチェーン上ではないとみなされ、wait1().thenの部分が即時実行された。  
  よって、先にBが出力され、そのあとにA、最後に1番目のthenのreturn値が出力された。

- f6
  [予想]
  1秒後にAが出力、その1行後にBが出力、その1秒後にCが出力される。  
  [結果]
  aa
  [理由]
  複数回呼び出すと、プロミスチェーン上に追加で登録されるので、前のPromiseが満たされてから次のPromiseという処理の流れとなるから。

- f7
  [予想]
  即時にBが出力、1秒後にAが出力、2秒後にCが出力
  [結果]

  ```
  A
  B
  C
  ```

  [理由]
  p = wait1().then(logA) は1秒後に解決し、そこで "A" が出る。  
  wait2() は2秒後に解決し、その .then() の中で p.then(logB) を返している。  
  この時点で p はすでに解決済みなので、p.then(logB) のコールバック logB は 即座に呼ばれる。  
  つまり、wait2() の完了を待ったあとすぐに "B" が出る。  
  さらに p.then(logB) の結果が解決されると、次の .then(logC) が呼ばれて "C" が出る。

- f8
  [予想]
  1秒後にXが出力され、直後にAが出力される。  
   [結果]

  ```
  X
  A
  ```

  [理由]
  wait1()は1秒後に解決され、errX()が呼ばれる。  
  この時点でPromiseはrejected状態になるため、最寄りの.catchが実行される。  
  そのため、Xが出力される。  
  最後に.finallyが実行され、Aが出力される。

- f9
  [予想]
  1秒後にYが出力され、直後にAが出力される。
  [結果]

  ```
  Y
  A
  ```

  [理由]
  wait1()は1秒後に解決され、() => 42;が実行されたあと、errY()が呼ばれる。  
  この時点でPromiseはrejected状態になるため、最寄りの.catchが実行される。  
  そのため、Yが出力される。  
  最後に.finallyが実行され、Aが出力される。

- f10
  [予想]
  1秒後にAが出力され、エラーが出力される。
  [結果]

  ```
  A
  file:///C:/Users/r00000546/Documents/git_repository/javascript-training/ch13/ex02/index.js:27
  throw new Error("Y");
  Error: Y
  at errY (file:///C:/Users/r00000546/Documents/git_repository/javascript-training/ch13/ex02/index.js:27:9)

  ```

  [理由]  
  wait1()は1秒後に解決され、() => 42;が実行されたあと、errY()が呼ばれる。
  (e) => log(e.message)は前のプロミス() => 42;が失敗したときに呼ばれるため、呼ばれない。  
  最後に.finallyが実行され、Aが出力される。
  そして、errY()はcatchされないまま、コンソールに出力される。

- f11
  [予想]
  Xが出力される。  
  [結果]

  ```
  X
  ```

  [理由]
  new Promise のコンストラクタに渡す関数は、即時実行される。  
  その中で errX() が呼ばれて例外を投げる。  
  Promise内での例外は自動的にPromiseのrejectに変換されます。  
  そのため、.catch() でその例外をキャッチでき、Xが出力される。

- f12
  [予想]
  errXのエラー内容が出力される。  
   [結果]

  ```
  file:///C:/Users/r00000546/Documents/git_repository/javascript-training/ch13/ex02/index.js:24
  throw new Error("X");
  Error: X
  at errX (file:///C:/Users/r00000546/Documents/git_repository/javascript-training/ch13/ex02/index.js:24:9)
  at Timeout.\_onTimeout (file:///C:/Users/r00000546/Documents/git_repository/javascript-training/ch13/ex02/index
  .js:148:22)
  at listOnTimeout (node:internal/timers:594:17)
  at process.processTimers (node:internal/timers:529:7)

  ```

  [理由]
  setTimeout(..., 0) は非同期でコールバックを登録  
  errX() の例外は 非同期のコールバック内で発生  
  この時点では Promise内の関数はすでに終了している
  そのため、errX() の例外は「Promiseとは無関係」に発生し、.catch() ではキャッチされない
