# jQuery Deferred について調べ Promise との関係性について説明しなさい。

jQueryのDeferredとは、Promiseと同じように非同期処理を管理するためのオブジェクトである。
以下の点で同じような機能を持つ。

- 非同期処理の管理　　
  どちらも非同期処理の結果(成功/失敗)を管理するためのオブジェクト
- 成功・失敗の状態を持つ  
  resolve（成功）や reject（失敗）の状態を持ち、状態が確定すると変更できない。
- コールバックの登録が可能  
  .then() を使って処理後のコールバック（成功／失敗時）を登録できる。
- チェーン可能  
  複数の .then() を連鎖して処理をつなげることができる。

以下の点で異なる機能を持つ。

- 進捗通知  
  Promiseではできないが、deferredではnotify()やprogress()により途中経過の通知が可能
- 状態制御  
  Promiseでは作成時の関数内でしかできないが、deferredでは.resolve()や.reject()により外部から状態を制御できる。
- メソッドの種類  
  Promiseにはthen,catch,finallyしかないが、deferredではdone,fail,alwaysなど複数のメソッドが用意されている

メモ：ES6に対応していないOSに対しては、ネイティブのPromiseが使えず、jQueryのDeferredを使ったという記事があった
https://qiita.com/fakefurcoronet/items/cb2d2eba1a2e39f6643d
