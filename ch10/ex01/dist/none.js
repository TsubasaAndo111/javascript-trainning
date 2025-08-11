/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports) => {

const sum = (x, y) => x + y;
const square = (x) => x + x;

exports.mean = data => data.reduce(sum)/data.length;
exports.stddev = function(d){
    let m = exports.mean(d);
    return Math.sqrt(d.map(x => x-m).map(square).reduce(sum)/(d.length-1))
}

/***/ }),
/* 2 */
/***/ ((module) => {

class AbstractSet {
  has(x) {
    throw new Error("Abstract method");
  }
}

class NotSet extends AbstractSet {
  constructor(set) {
    super();
    this.set = set;
  }
}

class RangeSet extends AbstractSet {
  constructor(from, to) {
    super();
    this.from = from;
    this.to = to;
  }

  has(x) {
    return x >= this.from && x <= this.to;
  }
  toString() {
    return `{x| ${this.from} ≦ x ≦ ${this.to}}`;
  }
}

class AbstractEnumerableSet extends AbstractSet {
  get size() {
    throw newError("Abstract method");
  }
  [Symbol.itrator]() {
    throw new Error("Abstract method");
  }

  isEmpty() {
    return this.size === 0;
  }
  toString() {
    return `{${Array.from(this).join(",")}}`;
  }
  equals(set) {
    if (!(set instanceof AbstractEnumerableSet)) return false;

    if (this.size !== set.size) return false;

    for (let element of this) {
      if (!set.has(element)) return false;
    }

    return true;
  }
}

class SingletonSet extends AbstractEnumerableSet {
  constructor(member) {
    super();
    this.member = member;
  }

  has(x) {
    return x === this.menmber;
  }
  get size() {
    return 1;
  }
  *[Symbol.iterator]() {
    yield this.member;
  }
}

class AbstractWritableSet extends AbstractEnumerableSet {
  insert(x) {
    throw new Error("Abstarct method");
  }
  remove(x) {
    throw new Error("Abstract method");
  }

  add(set) {
    for (let element of set) {
      this.insert(element);
    }
  }

  subtract(set) {
    for (let element of set) {
      this.remove(element);
    }
  }

  insersect(set) {
    for (let element of this) {
      if (!set.has(element)) {
        this.remove(element);
      }
    }
  }
}

class BisSet extends AbstractWritableSet {
  constructor(max) {
    super();
    this.max = max;
    this.n = 0;
    this.numBytes = Math.floor(max / 8) + 1;
    this.data = new Uint8Array(this.numBytes);
  }

  _valid(x) {
    return Number.isInteger(x) && x >= 0 && x <= this.max;
  }

  _has(byte, bit) {
    return (this.data[byte] & Bitset.bits[bit]) !== 0;
  }

  has(x) {
    if (this._valid(x)) {
      let byte = Math.floor(x / 8);
      let bit = x % 8;
      return this._has(byte, bit);
    } else {
      return false;
    }
  }

  insert(x) {
    if (this._valid(x)) {
      let byte = Math.floor(x / 8);
      let bit = x % 8;
      if (!this._has(byte, bit)) {
        this.data[byte] |= BitSet.bits[bit];
        this.n++;
      }
    } else {
      throw new TypeError("Invalid set element: " + x);
    }
  }

  remove(x) {
    if (this._valid(x)) {
      let byte = Math.floor(x / 8);
      let bit = x % 8;
      if (!this._has(byte, bit)) {
        this.data[byte] &= BitSet.masks[bit];
        this.n--;
      }
    } else {
      throw new TypeError("Invalid set element: " + x);
    }
  }

  get size() {
    return this.n;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i <= this.max; i++) {
      if (this.has(i)) {
        yield i;
      }
    }
  }
}

BitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);

BitSet.masks = new Uint8Array([-1, -2, -4, -8, -16, -32, -64, -128]);

module.exports = { BisSet };


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
const stats = __webpack_require__(1);
const BitSet = (__webpack_require__(2).BitSet);

let s = new BitSet(100);
s.insert(10);
s.insert(20);
s.insert(30);
let average = stats.mean([...s]);
})();

/******/ })()
;