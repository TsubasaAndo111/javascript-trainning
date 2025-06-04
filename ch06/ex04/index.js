// hasOwnPropertyは属性のtrueにかかわらず、すべてtrueを返す
// propertyIsEnumerableはenumerable属性がtrueのときのみ、trueを返す
// プロパティの変更はwritable属性がtrueのときのみ可能
// プロパティの削除はconfigurable属性がtrueのときのみ可能

const obj = {};

Object.defineProperty(obj, "allFalse", {
  value: 0,
  writable: false,
  enumerable: false,
  configurable: false,
});

Object.defineProperty(obj, "writable", {
  value: 1,
  writable: true,
  enumerable: false,
  configurable: false,
});

Object.defineProperty(obj, "enumerable", {
  value: 2,
  writable: false,
  enumerable: true,
  configurable: false,
});

Object.defineProperty(obj, "configurable", {
  value: 3,
  writable: false,
  enumerable: false,
  configurable: true,
});

// すべてfalseの場合
// hasOwnProperty
console.log(obj.hasOwnProperty("allFalse")); // true
// propertyIsEnumerable
console.log(obj.propertyIsEnumerable("allFalse")); // false
// 変更
console.log(obj.allFalse); // 0
obj.allFalse = 10; // TypeError
// 削除
delete obj.allFalse; // TypeError

// writable:trueの場合
// hasOwnProperty
console.log(obj.hasOwnProperty("writable")); // true
// propertyIsEnumerable
console.log(obj.propertyIsEnumerable("writable")); // false
// 変更
console.log(obj.writable); // 1
obj.writable = 10;
console.log(obj.writable); // 10
// 削除
delete obj.writable; // TypeError

// enumerable:trueの場合
// hasOwnProperty
console.log(obj.hasOwnProperty("enumerable")); // true
// propertyIsEnumerable
console.log(obj.propertyIsEnumerable("enumerable")); // true
// 変更
console.log(obj.enumerable); // 1
obj.enumerable = 10; // TypeError
console.log(obj.enumerable); // 10
// 削除
delete obj.enumerable; // TypeError

// configurable:trueの場合
// hasOwnProperty
console.log(obj.hasOwnProperty("configurable")); // true
// propertyIsEnumerable
console.log(obj.propertyIsEnumerable("configurable")); // false
// 変更
console.log(obj.configurable); // 3
obj.configurable = 10; // TypeError
// 削除
delete obj.configurable;
console.log(obj.configurable); // undefined
