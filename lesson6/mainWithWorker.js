
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
        worker.on("error", (err) => {
            rej(err)
        })
        worker.on("exit", () => {
            console.log("");
        })
    })
}

function main(){
    try{
        performance.mark("start");

        const result = await Promise.all([
            computeWithWorker([25, 20, 19, 48, 30, 50]),
            computeWithWorker([25, 20, 19, 48, 30, 50]),
            computeWithWorker([25, 20, 19, 48, 30, 50]),
            computeWithWorker([25, 20, 19, 48, 30, 50]),
        ]);
        console.log(result);
    
        performance.mark("end");
        performance.measure("main", "start", "end");
    
        console.log(performance.getEntriesByName("main").pop());
    } catch(e){
        console.log(e.message);
    }

    setTimeout(() => {
        console.log('Timeout working...');
    }, 2000)

}

main()