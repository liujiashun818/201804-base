let zlib = require('zlib');

// gzip压缩   xxx.gz

let fs = require('fs');
let path = require('path');
function gzip(source){
   let createGzip = zlib.createGzip(); // 转化流
   let rs =  fs.createReadStream(path.join(__dirname,source));
   rs.pipe(createGzip).pipe(fs.createWriteStream(source+'.gz'));
}
// gzip('1.txt');
function unzip(source){
    let createUNGzip = zlib.createGunzip();
    let rs =  fs.createReadStream(source);
    rs.pipe(createUNGzip).pipe(fs.createWriteStream(path.basename(source,'.gz')))
}
unzip('readme.md.gz');