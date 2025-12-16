// ===== DOM要素の参照（既存のまま）=====
const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// ===== IndexedDB の設定 =====
const DB_NAME = "simple-todo-db";
const STORE_NAME = "todos";
let db = null;

// DBを開く（存在しなければ作成）。バージョンは 1。
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);

    // 初回作成 or バージョンアップ時に呼ばれるイベント
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("createdAt", "createdAt", { unique: false });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// 読み取り（全件取得）
function idbGetAll() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

// 追加（新規）
function idbAdd(todo) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.add(todo);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// 更新（既存レコードを上書き）
function idbPut(todo) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(todo);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// 削除（主キー指定）
function idbDelete(id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// ===== タブ間同期=====
// BroadcastChannelを使えば同じオリジン（プロトコル・ホスト・ポートが同じ）で開いている
// 複数のブラウザコンテキスト（タブ、ウィンドウ、iframe、Web Worker）間でメッセージを送受信できる
const bc = new BroadcastChannel("todo-sync");

// 変更通知（add/put/delete後に呼ぶ）
function notifyChange() {
  bc.postMessage({ type: "changed", at: Date.now() });
}

// 受信時は DB から再読込して正を取る
bc.addEventListener("message", (msg) => {
  if (msg && msg.data && msg.data.type === "changed") {
    refreshFromDB();
  }
});

// ===== DOM 要素生成を共通化（既存の見た目を維持）=====
function createTodoElement(todo) {
  const elem = document.createElement("li");
  elem.dataset.id = String(todo.id);

  // ラベル
  const label = document.createElement("label");
  label.textContent = todo.text;
  label.style.textDecorationLine = todo.completed ? "line-through" : "none";

  // ラッパー
  const div = document.createElement("div");

  // チェックボックス
  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = !!todo.completed;

  // チェック変更時の処理：UI更新＋DB更新＋他タブ通知
  toggle.addEventListener("change", async () => {
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    const updated = { ...todo, completed: toggle.checked };
    await idbPut(updated);
    notifyChange();
    todo.completed = toggle.checked;
  });

  // 削除ボタン
  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  destroy.addEventListener("click", async () => {
    elem.remove();
    await idbDelete(todo.id);
    notifyChange();
  });

  // 要素をまとめる
  div.append(toggle, label, destroy);
  elem.append(div);
  return elem;
}

// DBから読み込んで全件再描画（createdAt 降順にする）
async function refreshFromDB() {
  const todos = await idbGetAll();
  todos.sort((a, b) => b.createdAt - a.createdAt);
  list.innerHTML = "";
  for (const t of todos) {
    const elem = createTodoElement(t);
    list.append(elem);
  }
}

// ===== フォーム送信（既存動作 + DB保存 + 同期通知）=====
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (input.value.trim() === "") {
    return;
  }
  const text = input.value.trim();
  input.value = "";

  // 新規 ToDo レコード
  const todo = {
    id: Date.now() + Math.random(), // 簡易一意ID
    text,
    completed: false,
    createdAt: Date.now(),
  };

  await idbAdd(todo);

  // 画面反映（先頭に追加）
  const elem = createTodoElement(todo);
  list.prepend(elem);

  // 他タブへ通知
  notifyChange();
});

// ===== 初期化：DBを開いて、DBから復元 =====
(async function init() {
  db = await openDB();
  await refreshFromDB();
})();
