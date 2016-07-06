document.write(`the current version of io.js is ${process.version}`);

const fs = require('fs');

let contents = fs.readFileSync('./package.json', 'utf8');

alert(contents); 
