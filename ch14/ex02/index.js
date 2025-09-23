/*
配列のようなクラスでArrayを継承しない
.lengthを持ち、iterable
MyArray.map()やslice()が呼ばれるときnew MyArrayLikeの引数にはlengthが入るらしい。
その後、MyArrayLikeのインスタンスに対して、mapやsliceの要素がコピーされるらしい。
*/
export class MyArrayLike {
  constructor(length) {
    this.length = length;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }
}

/*
Arrayを継承。
map(), slice()の結果としてMyArrayLikeのオブジェクトを返す。
*/
export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }

  // mapやsliceなど新しい配列を作成して、この配列を返すメソッドは
  // new this.constructor[Symbol.species]()を実質的に呼び出す
  // この値をMyArrayLikeに変えることでmap,sliceはMyArrayLikeのインスタンスを返す
  static get [Symbol.species]() {
    return MyArrayLike;
  }
}
