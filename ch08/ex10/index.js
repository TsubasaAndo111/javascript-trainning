export function addMyCall(f) {
    f.myCall = function (thisArg, ...args) {
      const bound = this.bind(thisArg, ...args);
      return bound();
    };
  }
  