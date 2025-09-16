import * as fs from "node:fs";
import { promisify } from "node:util";

// Promiseを使った方法
export function readdirPromise(path, options) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, options, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

// util.promisifyを使った方法
export const readdirPromisify = promisify(fs.readdir);

// Promiseを使った方法
export function statPromise(path, options) {
  return new Promise((resolve, reject) => {
    fs.stat(path, options, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stats);
    });
  });
}

// util.promisifyを使った方法
export const statPromisify = promisify(fs.stat);
