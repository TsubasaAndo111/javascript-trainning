"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい

  // 通信中はボタンを非活性化
  button.disabled = true;

  // EventSource を開始
  // サーバ側にGET /messageを飛ばす
  const es = new EventSource("/message");

  // メッセージ受信
  es.addEventListener("message", (event) => {
    try {
      const payload = JSON.parse(event.data); // サーバ側からJSONでデータが送られてくるためパース
      if (typeof payload.value === "string") {
        messageElement.textContent += payload.value;
      }
      if (payload.done === true) {
        es.close();
        button.disabled = false; // 通信終了でボタンを活性化
      }
    } catch {
      // JSONでなかった場合は生テキストとして表示
      messageElement.textContent += String(event.data ?? "") + "\n";
    }
  });
}
