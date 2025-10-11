const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

form.addEventListener("submit", (e) => {
  //フォームの送信をキャンセル（ページリロード防止）
  // フォーム送信時にページがリロードされてしまうため、追加したToDo要素がすぐに消えてしまう
  // .preventDefault()でフォームに紐づいたデフォルトのブラウザの動作を無効化する
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  // new-todo の中身は空にする
  input.value = "";

  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  // ラベル
  const label = document.createElement("label");
  label.textContent = todo;
  label.style.textDecorationLine = "none";

  // <div> ラッパーを追加（sample.htmlと一致させるため）
  const div = document.createElement("div");

  // チェックボックス
  const toggle = document.createElement("input");
  toggle.type = "checkbox";

  // チェックボックスの変更でラベルの装飾を変更
  toggle.addEventListener("change", () => {
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
  });

  // 削除ボタン
  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    elem.remove();
  });

  // 要素をまとめて追加
  div.append(toggle, label, destroy);
  elem.append(div);

  // 先頭に追加
  list.prepend(elem);
});
