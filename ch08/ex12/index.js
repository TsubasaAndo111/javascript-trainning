export function f(body) {
    // bodyに含まれる$1〜$10の番号を抽出
    // /\$(\d+)/gは、$と1文字以上の数字を表す
    // ()の部分はキャプチャされる場所
    // matchAllの返り値はイテレータなので、配列にするために...を使って展開
    // 各要素の[1]にキャプチャした数値が入る
    const matches = [...body.matchAll(/\$(\d+)/g)];

    // 最大の番号を調べる
    // +m[1]でキャプチャしたものを文字列→数値に変換し、...で個別の引数として配列を渡して、最大値を求めている
    const maxArg = matches.length > 0 ? Math.max(...matches.map(m => +m[1])) : 0;
  
    // 引数名を作る,Functionコンストラクタの第一引数となる部分
    const args = [];
    for (let i = 1; i <= maxArg; i++) {
      args.push('a' + i);
    }
  
    // Fucntionの中身
    let funcBody = body;
  
    // $1〜$maxArgをa1〜amaxArgに置換
    // 逆順に処理することで$1の正規表現で$10を置換しないようにできる
    if (maxArg > 0) {
      for (let i = maxArg; i >= 1; i--) {
        const re = new RegExp('\\$' + i, 'g'); // 正規表現のオブジェクト(/\$数字/g)と同じ意味
        funcBody = funcBody.replace(re, 'a' + i); // 正規表現とマッチする場所を置き換える
      }
    }
  
    // {}で囲まれているか判定
    const isBlock = /^\{[\s\S]*\}$/.test(funcBody);
  
    if (!isBlock) {
      // {}で囲まれていたらreturnをつけて返す
      funcBody = 'return ' + funcBody + ';';
    }
  
    return new Function(...args, funcBody);
  }
  