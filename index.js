const http = require('http');
const url = require('url');
const fs = require('fs');
const replaceTemplate = require('./modules/replaceTemplate');


const tempOverview = fs.readFileSync(`${__dirname}/template/overview.htm`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/template/card.html`,'utf-8');
const temProduct = fs.readFileSync(`${__dirname}/template/product.html`,'utf-8');
// const templateProduct = fs.readFileSync(`${__dirname}/template/product.htm`,'utf-8')


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
    const dataObj = JSON.parse(data);

// Creating server
const server = http.createServer((req,res)=>{
    const {query,pathname}=(url.parse(req.url,true));
    // Declaring route with Request condition.
    if (pathname === '/' || pathname === '/overview'){
        res.writeHead(200,{'content-type':'text/html'});
        const cardHtml = dataObj.map(el => replaceTemplate(tempCard,el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardHtml);
        res.end(output);
        }else if(pathname === '/product'){
            res.writeHead(200,{'content-type':'text/html'});
            const product = dataObj[query.id];
            const output = replaceTemplate(temProduct,product);
             res.end(output);
        }else if(pathname === '/api'){
            res.writeHead(200,{'content-type':'application/json'});
            res.end(data);
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

