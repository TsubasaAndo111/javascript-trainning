const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

const API_BASE = "http://localhost:3001";

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const res = await fetch(`${API_BASE}/api/tasks`, {
      mode: "cors", // デフォルトでCORSモードになるらしいけど念のため
      credentials: "include", // ← クロスオリジンで Cookie を送る
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.message);
      return;
    }

    const data = await res.json();
    data.items.forEach((task) => appendToDoItem(task));
  } catch (e) {
    alert("サーバに接続できません");
  }
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const res = await fetch(`${API_BASE}/api/tasks`, {
      method: "POST",
      mode: "cors",
      credentials: "include", // ← クロスオリジンで Cookie を送る
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: todo }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message);
      return;
    }

    const newTask = await res.json();
    appendToDoItem(newTask);
  } catch (e) {
    alert("サーバに接続できません");
  }
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.addEventListener("change", async () => {
    const newStatus = toggle.checked ? "completed" : "active";

    try {
      const res = await fetch(`${API_BASE}/api/tasks/${task.id}`, {
        method: "PATCH",
        mode: "cors",
        credentials: "include", // ← クロスオリジンで Cookie を送る
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message);
        toggle.checked = !toggle.checked;
        return;
      }

      const updated = await res.json();

      // completedかどうかで取り消し線にするかどうかを決める
      label.style.textDecorationLine =
        updated.status === "completed" ? "line-through" : "none";
    } catch (e) {
      alert("サーバに接続できません");
      toggle.checked = !toggle.checked;
    }
  });
  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.addEventListener("click", async () => {
    try {
      const res = await fetch(`${API_BASE}/api/tasks/${task.id}`, {
        method: "DELETE",
        mode: "cors",
        credentials: "include", // ← クロスオリジンで Cookie を送る
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message);
        return;
      }

      elem.remove();
    } catch (e) {
      alert("サーバに接続できません");
    }
  });
  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}
