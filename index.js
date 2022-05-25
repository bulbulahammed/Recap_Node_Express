const fs = require('fs');

const text = fs.readFileSync('./read.txt','utf-8');

console.log(text);