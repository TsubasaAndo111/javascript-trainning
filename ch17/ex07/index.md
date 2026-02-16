## @babel/preset-typescriptとtscの違い

### @babel/preset-typescript（Babel）
- TSをJSに変換するトランスパイラ
    - 型注釈 / interface / 型エイリアス / satisfies など型だけの要素を削除
    - enumはJSとして動く形に変換
- 型チェックはしない
    - 型エラーがあってもトランスパイル自体は通る
- 高速で軽量
- 運用
    - babel + tsc --noEmitで変換+型チェック
    - babel+ESLint（typescript-eslint）で変換+静的チェック

### tsc（TypeScript Compiler）
- TSをJSに変換するコンパイラ
- TSの仕様に添ったチェック
    - 型チェック
    - TS固有機能(interface/implements/abstract/satisfiesなど)
- tsconfig.jsonの設定に添ったチェック
    - strict(型チェック厳格化)
    - noImplicitAny(暗黙any禁止)
    - exactOptionalPropertyTypes(optionalとundefinedを区別)
- .d.ts(型定義ファイル)の生成が可能