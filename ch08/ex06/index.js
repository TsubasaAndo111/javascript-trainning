const args = [];

function call(...params) {
  args.push(params);
}

call(1, 2, 3);
call("A", "B");

console.log(args[0]); // [1, 2, 3]
console.log(args[1]); // ["A", "B"]
