const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// ---- 永続化（今回は sessionStorage） ----------------------------
const STORAGE_KEY = "simple-todo-list";
let storageEnabled = true; // sessionStorage が使えるかどうか

// sessionStorage 利用可否チェック（禁止設定時の例外対策）
(function checkStorage() {
  try {
    const testKey = "__todo_test__";
    sessionStorage.setItem(testKey, "ok");
    sessionStorage.removeItem(testKey);
    storageEnabled = true;
  } catch (_e) {
    storageEnabled = false; // 使えない場合はメモリのみ
  }
})();

let todos = storageEnabled ? loadFromStorage() : []; // 初期ロード（使えなければ空）

function loadFromStorage() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_e) {
    return []; // 不正データでも壊れないように
  }
}

function saveToStorage() {
  if (!storageEnabled) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (_e) {
    // 保存失敗時も例外は握りつぶす（このタブでは動作継続）
  }
}

// ---- 描画（DOM は元の構造・見た目を維持） ----------------
function render() {
  list.innerHTML = "";

  // 新しいものを先頭に表示したいので、配列の 0 番目を一番上に配置
  for (let i = 0; i < todos.length; i++) {
    const item = todos[i];

    const elem = document.createElement("li");

    // ラベル
    const label = document.createElement("label");
    label.textContent = item.text;
    label.style.textDecorationLine = item.done ? "line-through" : "none";

    // <div> ラッパー（元コードに合わせる）
    const div = document.createElement("div");

    // チェックボックス
    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.checked = item.done;

    // チェックボックスの変更でラベルの装飾と保存を更新
    toggle.addEventListener("change", () => {
      item.done = toggle.checked;
      label.style.textDecorationLine = item.done ? "line-through" : "none";
      saveToStorage();
    });

    // 削除ボタン
    const destroy = document.createElement("button");
    destroy.textContent = "❌";
    destroy.addEventListener("click", () => {
      todos.splice(i, 1); // インデックス削除（最小差分）
      saveToStorage();
      render(); // DOM を作り直して index を整合
    });

    // 要素をまとめて追加（元コード準拠）
    div.append(toggle, label, destroy);
    elem.append(div);

    // 表示は 0 番を上にしたいので append（ループ順で上から並ぶ）
    list.append(elem);
  }
}

// ---- フォームの送信（元の挙動を維持しつつ永続化） ----------
form.addEventListener("submit", (e) => {
  // フォームの送信をキャンセル（ページリロード防止）
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }
  const todoText = input.value.trim();
  // new-todo の中身は空にする
  input.value = "";

  // 新規 ToDo は先頭に追加（元コードの prepend 相当）
  todos.unshift({ text: todoText, done: false });
  saveToStorage();
  render();
});

// ---- タブ間同期（注意：sessionStorage は他タブと共有されない） ----
// storage イベントは sessionStorage の変更でも発火しますが、別タブの sessionStorage は別コンテキストで共有されません。
// そのため、ここで再読み込みしても他タブの内容は見えません（仕様）。
// ※ 同一タブ内で別フレーム等に対してはイベントが届くことがありますが、一般的な「別タブ同期」はできません。
window.addEventListener("storage", (e) => {
  if (!storageEnabled) return;
  if (e.key === STORAGE_KEY && e.storageArea === sessionStorage) {
    // 同一セッション内の変更は取り込み（通常は同一タブ内のみ）
    todos = loadFromStorage();
    render();
  }
});

// タブを可視化・フォーカスしたタイミングでも最新へ（同一タブ内）
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

//// 初期表示
render();
