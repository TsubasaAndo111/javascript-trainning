# ch11/ex04/index.js の実装を完成させ型付き配列と通常の配列で行列の乗算の速度を比較してみなさい。
- 予想
型付き配列の方が計算速度が速くなる

- 結果
普通の配列の方が速かった,理由不明

Uint8
arrayMultiply: 526.8339999999998
typedArrayMultiply: 672.1187

Uint16
arrayMultiply: 541.9730999999999
typedArrayMultiply: 690.4364

Uint32
arrayMultiply: 556.1732999999999
typedArrayMultiply: 800.1886

Int8
arrayMultiply: 520.1324
typedArrayMultiply: 692.1839

Int16
arrayMultiply: 528.5220999999999
typedArrayMultiply: 692.7147

Int32
arrayMultiply: 767.1220000000003
typedArrayMultiply: 1032.4789

Float32
arrayMultiply: 750.6199999999999
typedArrayMultiply: 1049.4456999999998

Float64
arrayMultiply: 767.4556
typedArrayMultiply: 882.1931

テスト回数を増やして(100→10000)実行してみるも同じ結果
Float64
arrayMultiply: 58632.182299999986
typedArrayMultiply: 64950.384900000005