const http = require('http');

const server = http.createServer((req,res)=>{
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview'){
        res.end('This is overview');
        }else if(pathName === '/product'){
        res.end("This is product")
    }else{
        res.writeHead(404,{
            'content-type': "text/html",
            'my-own-header': 'My header'
        });
        res.end('<h1>Your requested page is not found</h1>');
    }
});

server.listen(3000,'127.0.0.1'),()=>{
    console.log("Server is listening at port 8000 local host");
}