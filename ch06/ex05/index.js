// プロパティ名が数値、文字列、列挙可能なプロパティを持つプロトタイプ
const prototypeObj = { 1: "protoNum1", stra: "protoStra" };
Object.defineProperty(prototypeObj, "enumerable", {
  value: "protoEnu",
  enumerable: true,
});

// prototypeObjをプロトタイプに持つオブジェクト
const obj = Object.create(prototypeObj);
obj[1] = "Num1";    // プロパティ名が数値かつプロトタイプの数値プロパティと同名のプロパティ
obj[2] = "Num2";    // プロパティ名が数値かつプロトタイプの数値プロパティと同名でないプロパティ
obj["stra"] = "Stra";   // プロパティ名が文字列かつプロトタイプの文字列プロパティと同名のプロパティ
obj["strb"] = "Strb";   // プロパティ名が文字列かつプロトタイプの文字列プロパティと同名でないプロパティ
// 列挙不可かつプロトタイプの列挙可能プロパティと同名のプロパティ
Object.defineProperty(obj, "enumerable", {
  value: "Enu",
  enumerable: false,
});

for(let key in obj){
    console.log(key)
    console.log(obj[key])
}

// 結果
// 同名の独自プロパティで上書きされており、すべて独自プロパティが出力された
// 数値の小さい順→アルファベットの早い順で出力
// 列挙可能な継承元プロパティは列挙不可な独自プロパティに上書きされ出力されず

// 1
// Num1
// 2
// Num2
// str1
// Str1
// str2
// Str2