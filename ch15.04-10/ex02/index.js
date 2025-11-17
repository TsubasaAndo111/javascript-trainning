const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  const clone = template.content.cloneNode(true);
  const li = clone.querySelector("li");
  const toggle = clone.querySelector("input");
  const label = clone.querySelector("label");
  const destroy = clone.querySelector("button");

  toggle.addEventListener("change", () => {
    // === 見た目を Tailwind ベースで変更 ===
    li.classList.toggle("bg-green-100", toggle.checked);
    li.classList.toggle("opacity-60", toggle.checked);
    label.classList.toggle("line-through", toggle.checked);
    label.classList.toggle("text-gray-400", toggle.checked);
  });

  label.textContent = todo;

  destroy.addEventListener("click", () => {
    li.classList.add("animate-pulse", "opacity-0", "scale-95");
    setTimeout(() => li.remove(), 200);
  });

  list.prepend(li);
});
