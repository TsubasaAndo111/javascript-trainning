export function assign(target, ...sources) {
  // nullまたはundefinedの際にエラーをthrow
  if (!target) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  target = Object(target); // オブジェクトに変換
  for (let source of sources) {
    if (source != null) {
      // 列挙可能なプロパティ＋列挙可能なSymbolプロパティ
      const keys = [...Object.keys(source),
        ...Object.getOwnPropertySymbols(source).filter(sym =>
        Object.getOwnPropertyDescriptor(source, sym).enumerable
      )]
      for (let key of keys) {
        target[key] = source[key];
      }
    }
  }
  return target;
}
