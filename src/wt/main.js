import { Worker } from "worker_threads";
import os from "os";

const performCalculations = async () => {
  const numWorkers = os.cpus().length;

  const workers = Array.from({ length: numWorkers }, (_, index) => {
    const worker = new Worker("./src/wt/worker.js", { workerData: 10 + index });
    return worker;
  });

  const results = [];

  await Promise.allSettled(
    workers.map((worker) => {
      return new Promise((resolve) => {
        worker.on("message", (message) => {
          results.push({ status: "resolved", data: message });
          resolve();
        });

        worker.on("error", (error) => {
          results.push({ status: "error", data: null, error: error.message });
          resolve();
        });
      });
    })
  );

  console.log(results);
};

await performCalculations();
