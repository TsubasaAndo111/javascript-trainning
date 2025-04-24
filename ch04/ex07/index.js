// このような関数は絶対に書いてはならない。
function set42(key) {
  eval(`${key} = 42;`);
}

set42("while(true){console.log('hello');};let a");
