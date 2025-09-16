# 「調査対象の操作」に示す操作をしたときに、どの部分が実行されるのかを調査するコードを作成し、実行結果と動作の説明を記述しなさい

- 明示的にイテレータプロトコルの next() を呼び出す  
  イテレータ  
  [実行結果]

  ```
  counterIter
  counterIter: next
  { value: 1, done: false }
  counterIter: next
  { value: 2, done: false }
  counterIter: next
  { value: undefined, done: true }
  ```

  [動作の説明]
  counterIter(2)が呼び出されて、イテレータオブジェクトが返る。  
  next()が実行されるたびにイテレータオブジェクトのnext()が実行される。

  ジェネレータ  
  [実行結果]

  ```
  counterGen
  counterGen: next
  { value: 1, done: false }
  counterGen: next
  { value: 2, done: false }
  counterGen: finally
  { value: undefined, done: true }
  ```

  [動作の説明]
  counterGen(2)が呼び出されて、ジェネレータオブジェクトが返る。  
  2回目のnext()まではtryの中の処理が実行され、yieldの値が返る。  
  3回目のnext()でfinallyブロックが実行されて、doneがtrueとなる。

- 明示的にイテレータプロトコルの return() を呼び出す
  イテレータ  
  [実行結果]

  ```
    counterIter
    counterIter: return: undefined
    { value: undefined, done: true }
  ```

  [動作の説明]
  counterIter(2)が呼び出されて、イテレータオブジェクトが返る。
  return()が実行されて、`console.log("counterIter: return:", value);return { value, done: true };`が返る

  ジェネレータ
  [実行結果]

  ```

  { value: undefined, done: true }

  ```

  [動作の説明]  
  counterGen(2)が呼び出されて、ジェネレータオブジェクトが返る。  
   返しているだけなので、console.log("counterGen");やtryブロックは呼ばれず。  
   return()実行時にfinallyブロックの中身が実行される。

- 明示的にイテレータプロトコルの throw() を呼び出す
  イテレータ  
  [実行結果]

  ```
  counterIter
  counterIter: next
  counterIter: throw: Error: Test Error
      at file:///C:/Users/r00000546/Documents/git_repository/javascript-training/ch12/ex01/index.js:49:14
      at ModuleJob.run (node:internal/modules/esm/module_job:268:25)
      at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:543:26)
      at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)
  Caught: Test Error
  ```

  [動作の説明]
  iterのthrow()が実行される。
  next()のあとでも前でも動作は変わらない。

  ジェネレータ
  [実行結果]

  ```
  counterGen
  counterGen: next
  counterGen: catch: Error: Test Error
      at file:///C:/Users/r00000546/Documents/git_repository/javascript-training/ch12/ex01/index.js:48:13
      at ModuleJob.run (node:internal/modules/esm/module_job:268:25)
      at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:543:26)
      at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)
  counterGen: finally
  Caught: Test Error

  ```

  [動作の説明]  
  next()のあとにthrowすると、ジェネレータのtry-catchのcatchの方に遷移して、throwされ、finallyまで実行される。  
  next()の前に実行すると、ジェネレータtry-catchの中にはいないため、特に何も起こらない

- for-of ループを実行
  イテレータ  
  [実行結果]

  ```
  counterIter
  counterIter: Symbol.iterator
  counterIter: next
  for-of iter: 1
  counterIter: next
  for-of iter: 2
  counterIter: next
  ```

  [動作の説明]
  for-ofはイテレータの`[Symbol.iterator]()`を最初に呼び、doneになるまでnext()を繰り返す。

  ジェネレータ
  [実行結果]

  ```
  counterGen
  counterGen: next
  for-of gen: 1
  counterGen: next
  for-of gen: 2
  counterGen: finally
  ```

  [動作の説明]
  for-ofはdoneになるまでnext()を繰り返し、終了時にfinallyブロックが実行される。

- for-of ループを実行途中で break
  イテレータ  
  [実行結果]

  ```
  counterIter
  counterIter: Symbol.iterator
  counterIter: next
  for-of iter (break): 1
  counterIter: return: undefined
  ```

  [動作の説明]
  for-ofをbreakすると、イテレータでは.return()が自動で呼ばれる

  ジェネレータ
  [実行結果]

  ```
  counterGen
  counterGen: next
  for-of gen (break): 1
  counterGen: finally
  ```

  [動作の説明]
  for-ofをbreakすると、ジェネレータではfinallyブロックが実行される。

- for-of ループを実行中に例外発生
  イテレータ  
  [実行結果]

  ```
  counterIter
  counterIter: Symbol.iterator
  counterIter: next
  for-of iter (throw): 1
  counterIter: next
  for-of iter (throw): 2
  counterIter: return: undefined
  Caught outside iter: Error: Stop!
      at file:///C:/Users/r00000546/Documents/git_repository/javascript-training/ch12/ex01/index.js:48:24
      at ModuleJob.run (node:internal/modules/esm/module_job:268:25)
      at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:543:26)
      at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)
  ```

  [動作の説明]
  for-of中に例外が起きると.return()が呼ばれて終了する。

  ジェネレータ
  [実行結果]

  ```
  counterGen
  counterGen: next
  for-of gen (throw): 1
  counterGen: next
  for-of gen (throw): 2
  counterGen: finally
  Caught outside gen: Error: Stop!
      at file:///C:/Users/r00000546/Documents/git_repository/javascript-training/ch12/ex01/index.js:57:24
      at ModuleJob.run (node:internal/modules/esm/module_job:268:25)
      at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:543:26)
      at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)
  ```

  [動作の説明]
  for-of中に例外が起きるとfinallyブロックが実行されて終了する。  
  明示的に呼ばない場合は、catchブロックが実行されず、.returnでクリーンアップされるから？

```

```
