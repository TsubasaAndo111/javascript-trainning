export function restrict(target, template) {
  // target自身が持つすべてのプロパティキーを取得（継承プロパティとSymbol除く）
  for (const key of Object.keys(target)) {
    // テンプレートにこのプロパティが存在しないか確認（inを使うことで継承プロパティも確認できる）
    if (!(key in template)) {
      delete target[key]; // テンプレートに存在しないなら削除
    } else {
      // keyがtemplateの継承プロパティに存在し、targetが独自プロパティにkeyをもつ場合、削除する
      const templateHasOwn = template.hasOwnProperty(key); // trueなら独自プロパティ,falseなら継承プロパティ
      if (!templateHasOwn) {
        delete target[key]; // テンプレートが継承、targetが自前 → 削除
      }
    }
  }
  return target;
}

export function substract(target, ...sources) {
  if (typeof target !== "object" || target === null) {
    throw new TypeError("target must be a non-null object");
  }

  for (const source of sources) {
    if (typeof source !== "object" || source === null) continue;

    // 自身の文字列プロパティのみを列挙
    for (const key of Object.keys(source)) {
      if (target.hasOwnProperty(key)) {
        delete target[key];
      }
    }
  }

  return target;
}
