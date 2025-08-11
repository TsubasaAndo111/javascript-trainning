const {hello, Counter} = require("./module.cjs")

hello()

const counter = new Counter();
console.log(counter.count())
console.log(counter.count())
console.log(counter.reset())
console.log(counter.count())