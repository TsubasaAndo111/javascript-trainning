"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = void 0;
exports.isLowOrCompletedTask = isLowOrCompletedTask;
exports.not = not;
// Userオブジェクトであることを判定する
// ※ 指定によりここだけ any 使用可
function isUserObject(obj) {
    return (typeof obj === "object" &&
        typeof obj["id"] === "number" &&
        typeof obj["name"] === "string");
}
class TaskManager {
    constructor() {
        this._tasks = [];
    }
    // タスクを追加する
    add(task) {
        this._tasks.push(task);
    }
    // タスクを完了にする
    completeTask(target) {
        if (isUserObject(target)) {
            this._tasks
                .filter((t) => t.user === target)
                .forEach((t) => (t.completed = true));
        }
        else {
            this._tasks
                .filter((t) => t.title === target)
                .forEach((t) => (t.completed = true));
        }
    }
    // 引数の関数にマッチするタスクを返す
    getTasks(predicate) {
        if (predicate === undefined) {
            return this._tasks;
        }
        else {
            return this._tasks.filter(predicate);
        }
    }
}
exports.TaskManager = TaskManager;
// priority="low"または完了済のタスクを判定する
function isLowOrCompletedTask(priorityTask) {
    return priorityTask.priority === "low" || priorityTask.completed;
}
// 判定関数の否定結果を返す関数を生成する
function not(f) {
    return (arg) => !f(arg);
}
