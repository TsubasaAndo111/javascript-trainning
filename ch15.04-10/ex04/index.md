## 適当な Web サイトを開き、ブラウザの開発者ツールに TOC.js の内容を貼り付けて実行してみなさい

![alt text]({0A536F78-DB6A-4C6B-A9E3-265FCD9D6A92}.png)

## TOC.js をブックマークレットにして簡単に実行できるようにしなさい (javascript:{TOC.js のコード} というブックマークを作成)

作成完了。開発者ツールで実行したときと同じように実行できることを確認。

## 下記の例を参考にして目次を選択した時にスムーズに遷移するようにしなさい

以下を追加して、スクロールをスムーズにした。

`target.scrollIntoView({ behavior: "smooth", block: "start" })`はDOM要素(target)を画面上にスクロールさせるためのメソッドで、behaviorにsmoothを指定することでスムーズにスクロールできるようにした。

```js
link.addEventListener("click", (e) => {
  e.preventDefault();
  const target = document.querySelector(`a[name="${fragmentName}"]`);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
});
```
