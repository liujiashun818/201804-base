let http = require('http');
// Cache-Control:max-age=10 相对时间
// Expires: GMTString() 绝对时间

// /index.html => index.html
let util = require('util');
let fs = require('fs');
let stat = util.promisify(fs.stat);
let url = require('url');
let path = require('path');
let p = path.resolve(__dirname)
http.createServer(async function(req,res){
    let {pathname} = url.parse(req.url);
    let realPath = path.join(p,pathname);
    console.log(realPath)
    try{
        await stat(realPath); // 通过后缀 告诉客户端当前返回的内容类型 
        res.setHeader('Content-Type',require('mime').getType(realPath)+';chaset=utf8');
        res.setHeader('Cache-Control','max-age=10');
        res.setHeader('Expires',new Date(Date.now()+10*1000).toGMTString())
        fs.createReadStream(realPath).pipe(res);
    }catch(e){
        res.statusCode = 404;
        res.end(`not found`);
    }
}).listen(3000);

// let mime = require('mime');
// console.log(mime.getType('c://a.css'))