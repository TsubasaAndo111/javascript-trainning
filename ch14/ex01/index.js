/*
{a:1}
書き換え不可、削除不可
*/
export function unwritableAndUnconfigurableObj() {
  const obj = {};
  Object.defineProperty(obj, "a", {
    value: 1,
    writable: false,
    configurable: false,
    enumerable: true,
  });
  return obj;
}

/*
{b:2}
書き換え可、削除不可
*/
export function writableAndUnconfigurableObj() {
  const obj = {};
  Object.defineProperty(obj, "b", {
    value: 2,
    writable: true,
    configurable: false,
    enumerable: true,
  });
  return obj;
}

/*
{ c: { d: { e: 3 } } }
全てのレベルで、プロパティの追加不可
*/
export function nestedUnwritableObj() {
  const obj = {
    c: {
      d: {
        e: 3,
      },
    },
  };

  // 拡張不可にすることで新たなプロパティの追加を禁止
  // 全てのレベルで拡張不可にする
  Object.preventExtensions(obj);
  Object.preventExtensions(obj.c);
  Object.preventExtensions(obj.c.d);
  Object.preventExtensions(obj.c.d.e);

  return obj;
}
