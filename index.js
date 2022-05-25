// Read file Non-blocking asynchronous way
const fs = require('fs');
// This will work non-blocking asynchronous way.
fs.readFile('./start.txt', 'utf-8',(err,data)=>{
    console.log(data);
});
console.log("Will read this!");