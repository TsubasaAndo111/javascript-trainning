// index.js

const div = document.getElementById("editor-front");
const input = document.getElementById("editor-back");

// 1. divクリックでinputにフォーカス
div.addEventListener("click", () => {
  input.focus();
});

// 2. inputにフォーカスされたらdivの背景色をsilverに、blurで白に戻す
// blurはフォーカスが外れたときのイベント
input.addEventListener("focus", () => {
  div.style.backgroundColor = "silver";
});

input.addEventListener("blur", () => {
  div.style.backgroundColor = "white";
});

// 3. 入力内容をdivに表示
input.addEventListener("input", () => {
  div.textContent = input.value;
});
