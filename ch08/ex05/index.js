export function sequenceToObject(...values) {
  const result = {};
  for (let i = 0; i < values.length; i += 2) {
    const key = values[i];
    const value = values[i + 1];

    if (typeof key !== "string") {
      throw new Error(
        `キー（奇数番目）は文字列である必要があります。無効なキー: ${key}`
      );
    }

    result[key] = value;
  }

  return result;
}
