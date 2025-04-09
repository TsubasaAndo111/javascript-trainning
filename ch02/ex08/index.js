// 修正版問題：ASTをJSONで出力する
import { parse } from "acorn";


// 当初の問題：ASTを解析してソースコードのセミコロンを削除する
/*
import { parse } from "acorn";
import { replace } from "estraverse";

function removeSemicolons(code) {
  const ast = parse(code, { ecmaVersion: 2020 }); // ソースコードをAST（抽象構文木）に変換
  const array = []; // 除外対象の添え字
  let results = ``; // セミコロン削除後のソースコード

  // ASTをトラバースして除外対象を探索
  replace(ast, {
    enter(node) {
      // ExpressionStatementノードをチェック
      if (node.type === "ExpressionStatement" && code[node.end - 1] === ";") {
        // 除外対象の添え字を格納
        array.push(node.end - 1);
      }
    },
  });

  // セミコロンを除外
  for (let i = 0; i < array.length; i++) {
    if (i == 0) {
      results += code.slice(0, array[i]);
    } else if (i < array.length - 1) {
      results += code.slice(array[i - 1] + 1, array[i]);
    } else {
      results += code.slice(array[i - 1] + 1, array[i]);
      results += code.slice(array[i] + 1);
    }
  }

  // 行末のセミコロンを削除
  results = results.replace(/;\n/g, "\n");

  return results;
}

// 使用例
const code = `
function complexExample() {
  let x = 10; let y = 20;
  if (x > y) {
    console.log("x is greater");
  } else {
    console.log("y is greater");
  }

  for (let i = 0; i < 10; i++) {
    console.log(i);
  }

  let result = x + y;
  return result;
}
`;

const results = removeSemicolons(code);
console.log(results);
*/