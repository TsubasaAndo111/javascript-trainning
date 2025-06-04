export function newHashTable(capacity) {
  return {
    size: 0, // マッピング数を示すプロパティ
    entries: new Array(capacity), // マッピングを格納する固定長の配列
    get(key) {
      // keyにマップされた値を取得する
      let hash = funcHash(key) % capacity;
      // ハッシュ値がすでに存在する場合

      let current = this.entries[hash];
      while (current) {
        if (current.key === key) {
          return current.value;
        }
        current = current.next;
      }

      return undefined;
    },
    put(key, value) {
      // key, valueのマッピングを追加する(keyが存在する場合はvalueを上書きする)
      let hash = funcHash(key) % capacity;

      // ハッシュ値がすでに存在する場合
      if (this.entries[hash]) {
        // 同じkeyの要素があるかチェック、なければ、最後のnextに追加
        let current = this.entries[hash];
        while (current) {
          if (current.key === key) {
            current.value = value;
            break;
          }
          if (!current.next) {
            current.next = { key: key, value: value, next: undefined };
            break;
          }
          current = current.next;
        }
      } else {
        this.entries[hash] = { key: key, value: value, next: undefined };
        this.size++;
      }
    },
    remove(key) {
      // keyのマッピングを削除する
      let hash = funcHash(key) % capacity;

      let prev = null;
      let current = this.entries[hash];
      while (current) {
        if (current.key === key) {
          if (prev === null) {
            // 先頭ノードの削除
            this.entries[hash] = current.next; // 末尾でも先頭でもnextがundefinedならOK
            if(!this.entries[hash]){
                this.size--;
            }
          } else {
            // 中間または末尾のノード削除
            prev.next = current.next; // current.next が undefined なら prev.next は undefined になる
          }
          return;
        }
        prev = current;
        current = current.next;
      }
    },
  };
}

// ハッシュ値変換
// 文字を数値として解釈して加算する
// http://www.rsch.tuis.ac.jp/~ohmi/software-basic/hashing.html
export function funcHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i); // UTF-16単位のUnicodeを加算
  }
  return hash;
}


