const {parentPort, workerData} = require("worker_threads")

const compute = (arr) => {
    const arrPow = [];

    for(let i = 0; i < 1000000; i++){
        arrPow.push(i * i)
    }

    return arr.map(el => factorial(el))
}