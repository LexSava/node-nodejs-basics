const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

import { parentPort, workerData } from "worker_threads";

const sendResult = () => {
  const result = nthFibonacci(workerData);
  parentPort.postMessage(result);
};

sendResult();
