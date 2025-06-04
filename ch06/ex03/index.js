// p149のコード
let o = {};
o.x = 1;
let p = Object.create(o);
p.y = 2;
let q = Object.create(p);
q.z = 3;
let f = q.toString();
q.x + q.y;
console.log(o.isPrototypeOf(p)); // true,oはpのプロトタイプチェーン上にある
console.log(o.isPrototypeOf(q)); // true,oはqのプロトタイプチェーン上にある
console.log(p.isPrototypeOf(q)); // true,pはqのプロトタイプチェーン上にある

// Object,Array,Date,Mapのプロトタイプチェーンの継承関係を確認
// ObjectはObject.prototypeを継承
// ArrayはObject.prototypeとArray.prototypeを継承
// DateはObject.prototypeとDate.prototypeを継承
// MapはObject.prototypeとMap.prototypeを継承
let object = new Object();
let array = new Array();
let date = new Date();
let map = new Map();

console.log(Object.prototype.isPrototypeOf(object)); // true
console.log(Object.prototype.isPrototypeOf(array)); // true
console.log(Object.prototype.isPrototypeOf(date)); // true
console.log(Object.prototype.isPrototypeOf(map)); // true

console.log(Array.prototype.isPrototypeOf(object)); // false
console.log(Array.prototype.isPrototypeOf(array)); // true
console.log(Array.prototype.isPrototypeOf(date)); // false
console.log(Array.prototype.isPrototypeOf(map)); // false

console.log(Date.prototype.isPrototypeOf(object)); // false
console.log(Date.prototype.isPrototypeOf(array)); // false
console.log(Date.prototype.isPrototypeOf(date)); // true
console.log(Date.prototype.isPrototypeOf(map)); // false

console.log(Map.prototype.isPrototypeOf(object)); // false
console.log(Map.prototype.isPrototypeOf(array)); // false
console.log(Map.prototype.isPrototypeOf(date)); // false
console.log(Map.prototype.isPrototypeOf(map)); // true
