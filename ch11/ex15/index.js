export function modifyUrl({ base, addQuery = [], path } = {}) {
  let url;
  try {
    url = new URL(base);
  } catch (e) {
    throw new Error("Invalid base URL");
  }

  // パスの追加
  // url.pathnameは絶対パスである必要があるため、一度URLクラスを作成している
  if (path) {
    const temp = new URL(path, url);
    url.pathname = temp.pathname;
  }

  // クエリの追加
  for (const [key, value] of addQuery) {
    url.searchParams.append(key, value);
  }

  return url.toString();
}
