// 型定義
export type User = { id: number; name: string };

export type Task = {
  title: string;
  completed: boolean;
  user: User;
};

export type Priority = "low" | "middle" | "high";

export type PriorityTask = Task & {
  priority: Priority;
};

// Userオブジェクトであることを判定する
// obj is Userは"この関数が true を返すとき、TypeScript は obj を User 型とみなして安全に扱ってよい"
// これがないと、isUserObjectで判定したオブジェクトのx.idとかで引っ掛かる
function isUserObject(obj: any): obj is User {
  return (
    typeof obj === "object" &&
    typeof obj["id"] === "number" &&
    typeof obj["name"] === "string"
  );
}

// 引数をTまたはTを拡張した型に限定
// T extends Task は"T は Task 型か、その Task を拡張した型である"
export class TaskManager<T extends Task> {
  // _tasks 配列の型を T[] に限定
  private _tasks: T[] = [];

  // タスクを追加する
  // 引数の型をTに限定
  add(task: T): void {
    this._tasks.push(task);
  }

  // タスクを完了にする
  // target の型を User | string に限定
  completeTask(target: User | string): void {
    if (isUserObject(target)) {
      this._tasks
        .filter((t) => t.user === target)
        .forEach((t) => (t.completed = true));
    } else {
      this._tasks
        .filter((t) => t.title === target)
        .forEach((t) => (t.completed = true));
    }
  }

  // 引数の関数にマッチするタスクを返す
  // getTasks の引数 predicate を省略可能にし、戻り値型を T[] に指定
  // predicate?は省略可能という意味
  // (task: T) => boolean は「Task を受け取って true/false を返す関数」の型
  // TSでは関数の型を書くときは上記のように書くらしい
  getTasks(predicate?: (task: T) => boolean): T[] {
    if (predicate === undefined) {
      return this._tasks;
    } else {
      return this._tasks.filter(predicate);
    }
  }
}

// priority="low"または完了済のタスクを判定する
// 引数の型を PriorityTask に明示
export function isLowOrCompletedTask(priorityTask: PriorityTask): boolean {
  return priorityTask.priority === "low" || priorityTask.completed;
}

// 判定関数の否定結果を返す関数を生成する
// 引数も戻り値も関数という意味
export function not<T>(f: (arg: T) => boolean): (arg: T) => boolean {
  return (arg) => !f(arg);
}
