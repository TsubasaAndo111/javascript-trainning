/*
WebComponentsを使って、ch15-1-3 ex01を書き換えたTODOアプリ
カスタム要素、Shadow DOM、HTMLテンプレートを使っているため、WebComponentsを使っているといえる
*/

const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");

    // TODO: 残りを実装
    this.input = this.shadowRoot.querySelector("#new-todo");
    this.list = this.shadowRoot.querySelector("#todo-list");

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      // 両端からホワイトスペースを取り除いた文字列を取得する
      if (this.input.value.trim() === "") {
        return;
      }
      const todo = this.input.value.trim();
      // new-todo の中身は空にする
      this.input.value = "";

      // ここから #todo-list に追加する要素を構築する
      const elem = document.createElement("li");

      const label = document.createElement("label");
      label.textContent = todo;
      label.style.textDecorationLine = "none";

      // <div> ラッパーを追加
      const div = document.createElement("div");

      // チェックボックス
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      // チェックボックスの変更でラベルの装飾を変更
      checkbox.addEventListener("change", () => {
        label.style.textDecoration = checkbox.checked ? "line-through" : "none";
      });

      // 削除ボタン
      const destroy = document.createElement("button");
      destroy.textContent = "❌";
      destroy.addEventListener("click", () => elem.remove());

      div.append(checkbox, label, destroy);
      elem.append(div);

      this.list.prepend(elem);
    });
  }
}

customElements.define("todo-app", TodoApp);
