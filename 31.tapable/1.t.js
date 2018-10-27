let str = '[name=zfpx][age=9][home=beijing]';
let regexp = /\[.+\]/;
let ret = str.match(regexp);
console.log(ret);
const path = require('path');
console.log(path.resolve(__dirname, '/1.jpg'));
console.log(path.resolve(__dirname, '1.jpg'));