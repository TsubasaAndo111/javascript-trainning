const threads = require("worker_threads");

if (threads.isMainThread) {
  let sharedBuffer = new SharedArrayBuffer(4);
  let sharedArray = new Int32Array(sharedBuffer);
  let worker = new threads.Worker(__filename, { workerData: sharedArray });

  worker.on("online", () => {
    for (let i = 0; i < 10_000_000; i++) {
      Atomics.add(sharedArray, 0, 1);
    }
    worker.on("message", (message) => {
      console.log(Atomics.load(sharedArray, 0));
    });
  });
} else {
  let sharedArray = threads.workerData;
  for (let i = 0; i < 10_000_000; i++) {
    Atomics.add(sharedArray, 0, 1);
  }
  threads.parentPort.postMessage("done");
}
