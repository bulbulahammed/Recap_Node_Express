const http = require('http');
const url = require('url');
const fs = require('fs');


const tempOverview = fs.readFileSync(`${__dirname}/template/overview.htm`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/template/card.html`,'utf-8');
// const templateProduct = fs.readFileSync(`${__dirname}/template/product.htm`,'utf-8')


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
    const dataObj = JSON.parse(data);

// Server

const replaceTemplate = (temp,product)=>{
 let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
 output = output.replace(/{%PRODUCTIMAGE%}/g,product.image);
 output = output.replace(/{%FROM%}/g,product.from);
 output = output.replace(/{%NU%}/g,product.nutrients);
 output = output.replace(/{%QUANTITY%}/g,product.quantity);
 output = output.replace(/{%PRICE%}/g,product.price);
 output = output.replace(/{%ID%}/g,product.id);
 if(! product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,"not-organic")
 return output;
}
const server = http.createServer((req,res)=>{
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview'){
        res.writeHead(200,{'content-type':'text/html'});
        const cardHtml = dataObj.map(el => replaceTemplate(tempCard,el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardHtml);
        res.end(output);
        }else if(pathName === '/product'){
             res.end("This is product")
        }else if(pathName === '/api'){
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

