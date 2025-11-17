const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

// { content: "...", completed: true or false } の配列
// deleteTodoで要素を削除するためにletとした
const todos = [];

function renderTodos(todos) {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector("li");
    const toggle = clone.querySelector("input");
    const label = clone.querySelector("label");
    const destroy = clone.querySelector("button");

    li.classList.toggle("completed", todo.completed);
    toggle.addEventListener("change", () => {
      todo.completed = toggle.checked;
      renderTodos(todos);
    });
    label.textContent = todo.content;
    toggle.checked = todo.completed;
    destroy.addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos(todos);
    });

    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  todos.push({ content: todo, completed: false });
  renderTodos(todos);
});

/* フィルタ関数 */
function getFilteredTodos() {
  // ブラウザのハッシュ部分
  const hash = location.hash;

  if (hash === "#/active") {
    return todos.filter((t) => !t.completed);
  }
  if (hash === "#/completed") {
    return todos.filter((t) => t.completed);
  }
  // #/All
  return todos;
}

window.addEventListener("hashchange", () => {
  // ここを実装してね
  renderTodos(getFilteredTodos());
});
