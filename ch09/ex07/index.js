export class LinkedList {
  #head = null;
  #tail = null;

  constructor() {
    this.#head = null;
    this.#tail = null;
  }

  push(value) {
    const newNode = { value, next: null };
    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      this.#tail.next = newNode;
      this.#tail = newNode;
    }
  }

  pushAll(...items) {
    items.forEach((item) => this.push(item));
  }

  toString() {
    let current = this.#head;
    const values = [];
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    return "[" + values.join(", ") + "]";
  }
}

/**
 * 要素のpush回数を記録するLinkedList
 */
export class InstrumentedLinkedList {
  #list; // 追加部分(LinkedListのインスタンス)
  #pushCount = 0;

  // 追加部分(コンストラクタ)
  constructor() {
    this.#list = new LinkedList();
  }

  /**
   * 要素のpush操作が行われた回数
   */
  get pushCount() {
    return this.#pushCount;
  }

  push(item) {
    this.#list.push(item); // 変更部分（super.push(item);)
    this.#pushCount++;
  }

  pushAll(...items) {
    this.#list.pushAll(...items); // 変更部分（super.pushAll(...items);)
    this.#pushCount += items.length;
  }
}
