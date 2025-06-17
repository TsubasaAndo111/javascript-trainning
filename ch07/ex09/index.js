console.log("𠮷野家"[0])
console.log("𠮷野家"[0].length)  // 1
console.log("👨‍👨‍👧‍👧"[0] )   
console.log("👨‍👨‍👧‍👧"[0] .length)    // 1
console.log("𠮷野家".length) // 4
console.log("👨‍👨‍👧‍👧".length)    // 11

console.log("𠮷野家".codePointAt(0).toString(16))
console.log("𠮷".charCodeAt(0).toString(16)) // d842
console.log("𠮷".charCodeAt(1).toString(16)) // dFB7

console.log(Array.from("👨‍👨‍👧‍👧"))   //  ['�', '‍',   '�','‍',   '�', '‍','�']
console.log("👨‍👨‍👧‍👧".charCodeAt(0).toString(16))    // d83d
console.log("👨‍👨‍👧‍👧".charCodeAt(1).toString(16))    // dc68
console.log("👨‍👨‍👧‍👧".charCodeAt(2).toString(16))    // 200d ゼロ幅結合子