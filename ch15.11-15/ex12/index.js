const logEl = document.getElementById("log");

function log(msg, type = "ok") {
  const div = document.createElement("div");
  div.className = type === "err" ? "err" : "ok";
  div.textContent = msg;
  logEl.appendChild(div);
}

function clearLog() {
  logEl.innerHTML = "";
}

function joinPath(folderPath, fileName) {
  // 安全にパス結合（各セグメントを encodeURIComponent、スラッシュは維持）
  // 日本語やスペースなどが含まれていても安全にエンコードできる
  const segs = folderPath
    .split("/")
    .filter((s) => s.length > 0)
    .map((s) => encodeURIComponent(s));
  const joined = segs.join("/");
  return `${joined}/${encodeURIComponent(fileName)}`;
}

document.getElementById("uploadBtn").addEventListener("click", async () => {
  clearLog();

  const token = document.getElementById("token").value.trim();
  const destPath = document.getElementById("destPath").value.trim();
  const file = document.getElementById("fileInput").files[0];

  if (!token) {
    log("アクセストークンを入力してください。", "err");
    return;
  }
  if (!destPath) {
    log("アップロード先パスを入力してください。", "err");
    return;
  }
  if (!file) {
    log("ファイルを選択してください。", "err");
    return;
  }

  try {
    await simpleUpload(token, destPath, file);
  } catch (e) {
    console.error(e);
    log(`エラー: ${e.message || e}`, "err");
  }
});

async function simpleUpload(token, destPath, file) {
  const pathWithFile = joinPath(destPath, file.name);
  const url = `https://graph.microsoft.com/v1.0/me/drive/root:/${pathWithFile}:/content`;

  const resp = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/octet-stream",
      // 競合時の挙動（新規作成を強制したい場合）
      "If-None-Match": "*",
      Accept: "application/json",
    },
    body: await file.arrayBuffer(),
  });

  const text = await resp.text();
  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status}: ${text}`);
  }
  const json = JSON.parse(text);
  log("アップロード完了（シンプル）");
  log(`項目ID: ${json.id}`);
  log(`Web URL: ${json.webUrl}`);
}
