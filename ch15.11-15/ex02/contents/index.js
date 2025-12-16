const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

//
// --- 共通：UI の有効／無効化関数 ---
//
function disableUI() {
  input.disabled = true;
  form.querySelector("button").disabled = true;
  list.querySelectorAll("input, button").forEach((e) => (e.disabled = true));
}

function enableUI() {
  input.disabled = false;
  form.querySelector("button").disabled = false;
  list.querySelectorAll("input, button").forEach((e) => (e.disabled = false));
}

//
// --- 共通：タイムアウト付き fetch ---
//
async function timeoutFetch(url, options = {}, timeoutMs = 3000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timer);
    return res;
  } catch (e) {
    clearTimeout(timer);
    if (e.name === "AbortError") {
      alert("リクエストがタイムアウトしました（3秒）");
      return null; // fetch失敗扱い
    }
    throw e;
  }
}

function retryWithExponentialBackoff(func, maxRetry, callback) {
  setTimeout(() => {
    let retryNum = 0;

    async function tryFunc() {
      let ok = false;
      try {
        ok = await func(); // ← Promise を待って boolean を得る
      } catch (_e) {
        ok = false; // 例外は失敗として扱う
      }

      if (ok === true) {
        callback(true);
      } else {
        if (retryNum >= maxRetry) {
          callback(false);
        } else {
          const delay = Math.pow(2, retryNum) * 1000;
          retryNum++;
          setTimeout(tryFunc, delay);
        }
      }
    }

    tryFunc();
  }, 0);
}
//
// --- 共通：500番台のみリトライするラッパー関数 ---
//
function fetchWithRetry(url, options, onSuccess) {
  return new Promise((resolve) => {
    retryWithExponentialBackoff(
      async () => {
        const res = await timeoutFetch(url, options);
        if (!res) return true; // タイムアウト

        if (res.ok) {
          // 204 No Content の場合は JSON を読まない
          if (res.status === 204) {
            try {
              onSuccess?.(null);
            } catch (_e) {
              /* onSuccess例外は無視 */
            }
            return true;
          }
          // それ以外の成功（200 など）
          let data = null;
          try {
            data = await res.json();
          } catch (_e) {
            data = null;
          }
          try {
            onSuccess?.(data);
          } catch (_e) {
            /* onSuccess例外は無視 */
          }
          return true; // ← onSuccess の戻り値ではなく、常に true を返す
        }

        // 500番台のみリトライ
        if (res.status >= 500) {
          return false;
        }

        // その他のエラーはリトライせず即終了
        const err = await res.json();
        alert(err.message);
        return true;
      },
      3, // maxRetry
      (success) => {
        resolve(success);
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  disableUI();
  await fetchWithRetry("/api/tasks", {}, (data) => {
    data.items.forEach((task) => appendToDoItem(task));
  });
  enableUI();
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
  disableUI();
  await fetchWithRetry(
    "/api/tasks",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: todo }),
    },
    (newTask) => {
      appendToDoItem(newTask);
    }
  );
  enableUI();
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
    const prevChecked = !toggle.checked;
    const newStatus = toggle.checked ? "completed" : "active";

    let succeeded = false;

    disableUI();
    try {
      await fetchWithRetry(
        `/api/tasks/${task.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
        (updated) => {
          if (!updated) return;
          label.style.textDecorationLine =
            updated.status === "completed" ? "line-through" : "none";
          succeeded = true;
        }
      );

      if (!succeeded) {
        // タイムアウト／4xx／例外など、成功していない → ロールバック
        toggle.checked = prevChecked;
      }
    } catch (e) {
      toggle.checked = prevChecked;
    } finally {
      enableUI();
    }
  });
  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.addEventListener("click", async () => {
    disableUI();
    await fetchWithRetry(
      `/api/tasks/${task.id}`,
      {
        method: "DELETE",
      },
      () => {
        elem.remove();
      }
    );
    enableUI();
  });
  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}
