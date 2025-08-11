import {hello, Counter} from "./module_reexport.js"

hello()

const counter = new Counter();
console.log(counter.count())
console.log(counter.count())
console.log(counter.reset())
console.log(counter.count())