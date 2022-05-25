const http = require('http');

const server = http.createServer((req,res)=>{
    console.log(req);
    res.end("Hello from server");
});

server.listen(8000,'127.0.0.1'),()=>{
    console.log("Server is listening at port 8000 local host");
}