const {spawn} = require("child_process");

const childProcess = spawn("dir")

childProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
})

childProcess.stderr.on("data", (err) => {
    console.log(`stderr: ${err}`);
})

childProcess.on("exit", (code) => {
    console.log(`Код выхода: ${code}`);
})