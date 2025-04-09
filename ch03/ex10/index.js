/*
Symbolを使用した場合は異なるKey値が発行されるため、それぞれ別のプロパティが設定される
Symbol.forを使用した場合は、同じKey値が返ってくるため、プロパティの値が上書きされてしまう
*/

let o = {};

let s1 = Symbol("test");
let s2 = Symbol("test");

o[s1] = "s1";
o[s2] = "s2";

console.log("s1:"+o[s1])
console.log("s2:"+o[s2])

let s1_for = Symbol.for("test");
let s2_for = Symbol.for("test");

o[s1_for] = "s1_for";
o[s2_for] = "s2_for";

console.log(`s1_for === s2_for:${s1_for===s2_for}`);
console.log("s1_for:"+o[s1_for])
console.log("s2_for:"+o[s2_for])