
const {Worker} = require("worker_threads")

const computeWithWorker = (array) => {
    return new Promise((res, rej) => {
        const worker = new Worker("./worker.js", {
            workerData: {
                array,
            }
        });
        worker.on("message", (msg) => {
            console.log(worker.threadId);
            res(msg)
        })
        worker.on("error", (msg) => {
            rej(err)
        })
        worker.on("exit", () => {
            console.log("");
        })
    })
}

function main(){
    performance.mark("start");

    const result = [
        compute([25, 20, 19, 48, 30, 50]),
        compute([25, 20, 19, 48, 30, 50]),
        compute([25, 20, 19, 48, 30, 50]),
        compute([25, 20, 19, 48, 30, 50]),
    ];
    performance.mark("end");
    performance.measure("main", "start", "end");

    console.log(performance.getEntriesByName("main").pop());
}

main()