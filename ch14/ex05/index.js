export function typeTemplate(strings, ...values) {
  // テンプレートリテラル以外で呼び出されたとき
  if (!Array.isArray(strings) || !strings.raw) {
    throw new Error("typeTemplate must be used as a tagged template literal.");
  }
  const typeNames = values.map((val) => typeof val);
  let result = "";

  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < typeNames.length) {
      result += typeNames[i];
    }
  }
  return result;
}
