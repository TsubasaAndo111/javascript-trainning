import { newHashTable,funcHash } from "./index.js";

describe('newHashTable', () => {
    let table;
  
    beforeEach(() => {
      table = newHashTable(5);
    });
  
    test('putで値を追加してgetで取得できる', () => {
      table.put('key1', 'value1');
      expect(table.size).toBe(1);
      expect(table.get('key1')).toBe('value1');
    });
  
    test('同じkeyでputすると値が上書きされる', () => {
      table.put('key1', 'value1');
      table.put('key1', 'value2');
      expect(table.size).toBe(1);
      expect(table.get('key1')).toBe('value2');
    });
  
    test('異なるkeyでputするとサイズが増える', () => {
      table.put('key1', 'value1');
      table.put('key2', 'value2');
      expect(table.size).toBe(2);
    });
  
    test('removeでキーを削除できる', () => {
      table.put('key1', 'value1');
      table.put('key2', 'value2');
      table.remove('key1');
      expect(table.size).toBe(1);
      expect(table.get('key1')).toBeUndefined();
      expect(table.get('key2')).toBe('value2');
    });
  
    test('存在しないキーをremoveしてもサイズは変わらない', () => {
      table.put('key1', 'value1');
      table.remove('nonexistent');
      expect(table.size).toBe(1);
    });
  
    test('ハッシュ衝突時も値を正しく取得・削除できる', () => {
      // 意図的に同じインデックスになるようなキーを選ぶ
      const capacity = table.entries.length;
  
      const key1 = 'ab'; 
      const key2 = 'ba'; 
  
      expect(funcHash(key1) % capacity).toBe(funcHash(key2) % capacity);
  
      table.put(key1, 'value1');
      table.put(key2, 'value2');
  
      expect(table.size).toBe(1); // サイズは増えない
      expect(table.get(key1)).toBe('value1');
      expect(table.get(key2)).toBe('value2');
  
      table.remove(key1);
      expect(table.get(key1)).toBeUndefined();
      expect(table.get(key2)).toBe('value2');
      expect(table.size).toBe(1); // サイズは減らない
    });
  });