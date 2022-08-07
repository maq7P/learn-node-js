const {compute} = require("./compute");
const {parentPort, workerData} = require("worker_threads");

parentPort.postMessage(compute(workerData));