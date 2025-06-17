// 行列の加算
export function addMat(matA, matB) {
    const rows = matA.length;
    const cols = matA[0].length;

    // サイズのチェック
    if (rows !== matB.length || cols !== matB[0].length) {
        throw new Error("行列のサイズが一致しません。");
    }

    const result = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(matA[i][j] + matB[i][j]);
        }
        result.push(row);
    }

    return result;
}

// 行列の乗算
export function multMat(matA, matB) {
    const rowsA = matA.length;
    const colsA = matA[0].length;
    const rowsB = matB.length;
    const colsB = matB[0].length;

    // 乗算可能かチェック(行列1の列数と行列2の行数が等しくないと計算できない)
    if (colsA !== rowsB) {
        throw new Error("行列のサイズが乗算に適していません。");
    }

    const result = [];
    for (let i = 0; i < rowsA; i++) {
        const row = [];
        for (let j = 0; j < colsB; j++) {
            let sum = 0;
            for (let k = 0; k < colsA; k++) {
                sum += matA[i][k] * matB[k][j];
            }
            row.push(sum);
        }
        result.push(row);
    }

    return result;
}

