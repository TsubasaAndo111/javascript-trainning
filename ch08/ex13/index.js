function f(input) {
    const f = new Function(`return "Hello, " + ${input}`);
    console.log(f());
  }

  
  f(`(() => { while(true){console.log('a')}; return "world" })()`)