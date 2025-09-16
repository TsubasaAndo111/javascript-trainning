function counterIter(max) {
  console.log("counterIter");
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log("counterIter: Symbol.iterator");
      return this;
    },
    next() {
      console.log("counterIter: next");
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value) {
      console.log("counterIter: return:", value);
      return { value, done: true };
    },
    throw(e) {
      console.log("counterIter: throw:", e);
      throw e;
    },
  };
}

function* counterGen(max) {
  console.log("counterGen");
  try {
    for (let c = 1; c <= max; c++) {
      console.log("counterGen: next");
      yield c;
    }
  } catch (e) {
    console.log("counterGen: catch:", e);
    throw e;
  } finally {
    console.log("counterGen: finally");
  }
}

// --------------動作検証用-------------

console.log("=== 明示的に next() を呼び出す ===");
let iter = counterIter(2);
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

let gen = counterGen(2);
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

console.log("=== 明示的に return() を呼び出す ===");
iter = counterIter(2);
console.log(iter.return());
gen = counterGen(2);
console.log(gen.return());

console.log("=== 明示的に throw() を呼び出す ===");
iter = counterIter(2);
try {
  iter.throw(new Error("Test Error"));
} catch (e) {
  console.log("Caught:", e.message);
}

gen = counterGen(2);
gen.next();
try {
  gen.throw(new Error("Test Error"));
} catch (e) {
  console.log("Caught:", e.message);
}

console.log("=== for-of 実行 ===");
for (const v of counterIter(2)) {
  console.log("for-of iter:", v);
}

for (const v of counterGen(2)) {
  console.log("for-of gen:", v);
}

console.log("=== for-of 途中で break ===");
for (const v of counterIter(3)) {
  console.log("for-of iter (break):", v);
  break;
}

for (const v of counterGen(3)) {
  console.log("for-of gen (break):", v);
  break;
}

console.log("=== for-of 中に例外発生 ===");
try {
  for (const v of counterIter(3)) {
    console.log("for-of iter (throw):", v);
    if (v === 2) throw new Error("Stop!");
  }
} catch (e) {
  console.log("Caught outside iter:", e);
}

try {
  for (const v of counterGen(3)) {
    console.log("for-of gen (throw):", v);
    if (v === 2) throw new Error("Stop!");
  }
} catch (e) {
  console.log("Caught outside gen:", e);
}
