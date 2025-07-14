// コンポジション版
export class TypedMap {
  constructor(KeyType, valueType, entries = []) {
    this.KeyType = KeyType;
    this.valueType = valueType;
    this.map = new Map();

    for (const [k, v] of entries) {
      if (typeof k !== KeyType || typeof v !== valueType) {
        throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
      }
      this.map.set(k, v);
    }
  }

  set(key, value) {
    if (this.KeyType && typeof key !== this.KeyType) {
      throw new TypeError(`${key} is not of type ${this.KeyType}`);
    }
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError(`${value} is not of type ${this.valueType}`);
    }
    this.map.set(key, value);
    return this;
  }

  get(key) {
    return this.map.get(key);
  }

  has(key) {
    return this.map.has(key);
  }

  delete(key) {
    return this.map.delete(key);
  }

  clear() {
    return this.map.clear();
  }

  entries() {
    return this.map.entries();
  }

  keys() {
    return this.map.keys();
  }

  values() {
    return this.map.values();
  }

  [Symbol.iterator]() {
    return this.map[Symbol.iterator]();
  }

  forEach(callback, thisArg) {
    return this.map.forEach(callback, thisArg);
  }

  get size() {
    return this.map.size;
  }
}

/*
// 元のプログラム
class TypedMap extends Map {
    constructor(KeyType, valueType, entries) {
      if (entries) {
        for (let [k, v] of entries) {
          if (typeof k !== KeyType || typeof v !== valueType) {
            throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
          }
        }
      }
      super(entries);
  
      this.KeyType = KeyType;
      this.valueType = valueType;
    }
  
    set(key, value) {
      if (this.KeyType && typeof key !== this.KeyType) {
        throw new TypeError(`${key} is not of type ${this.KeyType}`);
      }
      if (this.valueType && typeof value !== this.valueType) {
        throw new TypeError(`${value} is not of type ${this.valueType}`);
      }
  
      return super.set(key, value);
    }
  }
  */
