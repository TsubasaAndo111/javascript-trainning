const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

const STORAGE_KEY = "simple-todo-list";
let storageEnabled = true;

// localStorage 利用可否チェック
(function checkStorage() {
  try {
    const testKey = "__todo_test__";
    localStorage.setItem(testKey, "ok");
    localStorage.removeItem(testKey);
    storageEnabled = true;
  } catch (_e) {
    storageEnabled = false;
  }
})();

let todos = storageEnabled ? loadFromStorage() : [];

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_e) {
    return [];
  }
}

function saveToStorage() {
  if (!storageEnabled) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (_e) {}
}

function render() {
  list.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    const item = todos[i];

    const elem = document.createElement("li");
    const label = document.createElement("label");
    label.textContent = item.text;
    label.style.textDecorationLine = item.done ? "line-through" : "none";

    const div = document.createElement("div");

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.checked = item.done;
    toggle.addEventListener("change", () => {
      item.done = toggle.checked;
      label.style.textDecorationLine = item.done ? "line-through" : "none";
      saveToStorage();
    });

    const destroy = document.createElement("button");
    destroy.textContent = "❌";
    destroy.addEventListener("click", () => {
      todos.splice(i, 1); // インデックス削除
      saveToStorage();
      render();
    });

    div.append(toggle, label, destroy);
    elem.append(div);
    list.append(elem);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") return;
  input.value = "";

  todos.unshift({ text, done: false }); // 先頭追加
  saveToStorage();
  render();
});

// タブ間同期
window.addEventListener("storage", (e) => {
  if (!storageEnabled) return;
  if (e.key === STORAGE_KEY) {
    todos = loadFromStorage();
    render();
  }
});

// タブ切替・フォーカス時の再読込
document.addEventListener("visibilitychange", () => {
  if (!storageEnabled) return;
  if (document.visibilityState === "visible") {
    todos = loadFromStorage();
    render();
  }
});

window.addEventListener("focus", () => {
  if (!storageEnabled) return;
  todos = loadFromStorage();
  render();
});

render();
