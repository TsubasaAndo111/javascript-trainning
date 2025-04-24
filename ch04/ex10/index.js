let array = ["r", "i", "c", "o", "h"];

console.log("削除前の配列");
console.log(array); // [ 'r', 'i', 'c', 'o', 'h' ]
console.log("削除前の配列の長さ");
console.log(array.length); // 5

delete array[3];

console.log("削除後の配列");
console.log(array); // [ 'r', 'i', 'c', <1 empty item>, 'h' ]
console.log("削除後の配列の長さ");
console.log(array.length); // 5
