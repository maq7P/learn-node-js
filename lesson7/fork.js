const { fork } = require("child_process");

const forkProcess = fork("process.js");

forkProcess.on("message", (msg) => {
    console.log(`Получено сообщение в fork: ${msg}`);
})

forkProcess.on("close", (code) => {
    console.log(`Код выхода: ${code}`);
})

forkProcess.send("ping")
forkProcess.send("disconnect")