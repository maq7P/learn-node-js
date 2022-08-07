const { compute } = require("./compute");

process.on("message", (msg) => {
    process.send(compute(msg));
    process.disconnect()
})