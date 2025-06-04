const prototypeObj = { x: 1 };
const obj = Object.create(prototypeObj);
console.log(obj); // {}
console.log(obj.x); // 1
console.log(Object.getPrototypeOf(obj) === prototypeObj); // true
