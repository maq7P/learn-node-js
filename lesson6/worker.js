const {parentPort, workerData} = require("worker_threads")
const factorial = require("./facrotial");

const compute = ({array}) => {
    const arrPow = [];

    for(let i = 0; i < 1000000; i++){
        arrPow.push(i * i);
    }

    return array.map(el => factorial(el));
}

parentPort.postMessage(compute(workerData))