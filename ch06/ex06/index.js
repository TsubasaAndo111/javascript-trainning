export function getPropertyNames(obj) {
  const names = [
    ...Object.getOwnPropertyNames(obj),
    ...Object.getOwnPropertySymbols(obj),
  ];
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) {
      names.push(key);
    }
  }
  return names;
}

const sym = Symbol("hidden");

const proto = {
  inheritedEnum: 42,
};

const obj = Object.create(proto);
Object.defineProperty(obj, "nonEnum", {
  value: "invisible",
  enumerable: false,
});
obj.visible = "visible";
obj[sym] = "symbolValue";

console.log(getPropertyNames(obj))
