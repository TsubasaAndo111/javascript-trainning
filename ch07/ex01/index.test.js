import { addMat, multMat } from "./index.js";

describe("addMat", () => {
  test.each([
    [
      [
        [1, 2],
        [3, 4],
      ],
      [
        [5, 6],
        [7, 8],
      ],
      [
        [6, 8],
        [10, 12],
      ],
    ],
    [
      [
        [-1, -2],
        [3, 4],
      ],
      [
        [1, 2],
        [-3, -4],
      ],
      [
        [0, 0],
        [0, 0],
      ],
    ],
    [
      [
        [1, 2, 3],
        [3, 4, 5],
      ],
      [
        [5, 6, 7],
        [7, 8, 9],
      ],
      [
        [6, 8, 10],
        [10, 12, 14],
      ],
    ],
    [
      [
        [1, 2],
        [3, 4],
        [5, 6],
      ],
      [
        [5, 6],
        [7, 8],
        [9, 10],
      ],
      [
        [6, 8],
        [10, 12],
        [14, 16],
      ],
    ],
  ])("addMatrices(%o, %o) -> %o", (matA, matB, expected) => {
    expect(addMat(matA, matB)).toEqual(expected);
  });

  test("行列のサイズが一致しないとき）", () => {
    const matA = [
      [1, 2],
      [3, 4],
    ];
    const matB = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    expect(() => addMatrices(matA, matB)).toThrow();
  });
});

describe("multMat", () => {
  test.each([
    [
      [
        [1, 2],
        [3, 4],
      ],
      [
        [5, 6],
        [7, 8],
      ],
      [
        [19, 22],
        [43, 50],
      ],
    ],
    [
      [
        [1, 2, 3],
        [2, 2, 1],
      ],
      [
        [6, 4],
        [5, 5],
        [6, 4]
      ],
      [
        [34, 26],
        [28, 22],
      ],
    ],
    [[[1, 2, 3]], [[4], [5], [6]], [[32]]],
  ])("multiplyMatrices(%o, %o) -> %o", (matA, matB, expected) => {
    expect(multMat(matA, matB)).toEqual(expected);
  });

  test("行列1の列数と行列2の行数が一致しないとき）", () => {
    const matA = [
      [1, 2, 3],
      [3, 4, 5],
    ];
    const matB = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    expect(() => multMat(matA, matB)).toThrow();
  });
});
