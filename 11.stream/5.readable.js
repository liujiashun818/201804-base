let fs = require('fs');
let ReadableStream = require('./ReadableStream');
let rs = fs.createReadStream('./1.txt',{
    autoClose:true,
    start:0,
    flags:'r',
    encoding:'utf8',
    highWaterMark:3
});
rs.on('readable',()=>{
    let r = rs.read(8);
    console.log(r);
});;