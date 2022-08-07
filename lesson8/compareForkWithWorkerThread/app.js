const { performance, PerformanceObserver } = require("perf_hooks");

const performanceObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach(entry => {
        console.log(`name: ${entry.name} - duration: ${entry.duration}`);
    })
});

performanceObserver.observe({
    entryTypes: ["measure"]
});

const workerFunction = (array) => {
    const {Worker} = require("worker_threads");

    return new Promise((res, rej) => {
        performance.mark("worker start");

        const worker = new Worker("./worker.js", {
            workerData: {
                array,
            }
        });

        worker.on("message", (msg) => {
            performance.mark("worker end");
            performance.measure("worker", "worker start", "worker end");
            res(msg);
        });

        worker.on("error", (err) => {
            rej(err);
        });
    })
} 

const forkFunction = (array) => {
    const { fork } = require("child_process");

    return new Promise((res, rej) => {
        performance.mark("fork start");

        const forkProcess = fork("fork.js");

        forkProcess.send({ array })
        forkProcess.on("message", (msg) => {
            performance.mark("fork end");
            performance.measure("fork", "fork start", "fork end");
            res(msg);
        })

        forkProcess.on("error", (err) => {
            res(err);
        })
    })
} 


const commonData = [11, 22, 33, 44, 555, 666];
const main = async () => {
    try {

        await workerFunction(commonData);
        await forkFunction(commonData);

    } catch(err) {
        console.log(err);
    }
}

main();