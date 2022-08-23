import http from "http";

const host = "127.0.0.1";
const port = 8000;

const server = http.createServer((req,res) => {
    req.url;

    switch(req.method){
        case "GET":
            switch(req.url){
                case "/hello":
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "text/plain");
                    res.end("Answer");
                    break;
            }
            break;
    }

});

server.listen(port, host, () => {
    console.log(`liistening on ${port}:${host}`);
})
