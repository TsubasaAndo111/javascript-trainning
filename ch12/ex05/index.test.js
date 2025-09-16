import fs from "fs";
import { readLines } from "./index.js";
import { jest } from "@jest/globals";

const testFilePath = "./testfile.txt";

describe("readLines", () => {
  const testContent = ["line1", "line2", "line3", "", "line5"].join("\n");

  beforeAll(() => {
    // テスト用ファイルを作成
    fs.writeFileSync(testFilePath, testContent, "utf8");
  });

  afterAll(() => {
    // テスト用ファイルを削除
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  test("正しく行を取得できる", () => {
    const lines = [];
    for (const line of readLines(testFilePath)) {
      lines.push(line);
    }
    expect(lines).toEqual(["line1", "line2", "line3", "", "line5"]);
  });

  test("途中で break してもファイルが閉じられる", () => {
    const spyClose = jest.spyOn(fs, "closeSync");
    const iterator = readLines(testFilePath);
    for (const line of iterator) {
      break; // 途中終了
    }
    expect(spyClose).toHaveBeenCalled(); // closeSyncが少なくとも1回呼ばれたことをテスト
    spyClose.mockRestore();
  });

  test("途中で throw してもファイルが閉じられる", () => {
    const spyClose = jest.spyOn(fs, "closeSync");
    const iterator = readLines(testFilePath);
    expect(() => {
      for (const line of iterator) {
        throw new Error();
      }
    }).toThrow();
    expect(spyClose).toHaveBeenCalled(); // closeSyncが少なくとも1回呼ばれたことをテスト
    spyClose.mockRestore();
  });
});
