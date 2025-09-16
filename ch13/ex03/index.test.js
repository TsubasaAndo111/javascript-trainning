import {
  readdirPromise,
  readdirPromisify,
  statPromise,
  statPromisify,
} from "./index.js";
import { fileURLToPath } from "url";
import path from "path";

describe("readdirPromise", () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const testDir = path.join(__dirname, "testDir");

  test("Promiseチェーンで実行でき、出力も正しい", () => {
    readdirPromise(testDir).then((files) => {
      expect(files.sort()).toEqual(["file1.txt", "file2.txt"]);
    });
  });
});

describe("readdirPromisify", () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const testDir = path.join(__dirname, "testDir");

  test("Promiseチェーンで実行でき、出力も正しい", () => {
    readdirPromisify(testDir).then((files) => {
      expect(files.sort()).toEqual(["file1.txt", "file2.txt"]);
    });
  });
});

describe("statPromise", () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const testDir = path.join(__dirname, "testDir");
  const testFile = path.join(testDir, "file1.txt");

  test("Promiseチェーンで stat が取得できる", () => {
    return statPromise(testFile).then((stats) => {
      expect(stats.isFile()).toBe(true);
    });
  });
});

describe("statPromisify", () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const testDir = path.join(__dirname, "testDir");
  const testFile = path.join(testDir, "file1.txt");

  test("Promiseチェーンで stat が取得できる", () => {
    return statPromisify(testFile).then((stats) => {
      expect(stats.isFile()).toBe(true);
    });
  });
});
