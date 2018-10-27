let http = require('http');
let util = require('util');
let fs = require('fs');
let stat = util.promisify(fs.stat);
let url = require('url');
let path = require('path');
let p = path.resolve(__dirname);
// 第一次你访问我的时候 我要给你个头 Last-Modified 
// 你下次访问我的时候  会给我个头  if-modified-since
// 最后修改时间  
http.createServer(async function(req,res){
    let {pathname} = url.parse(req.url);
    let realPath = path.join(p,pathname);
    console.log(realPath)
    try{
        let statObj = await stat(realPath); 
        res.setHeader('Cache-Control','no-cache');
        // 第一次请求时没有头，之后可以拿到if-modified-since 并且比较一下，如果相同返回304即可
        let since = req.headers['if-modified-since'];
        if(since === statObj.ctime.toGMTString()){
            res.statusCode = 304;
            res.end();
        }else{
            res.setHeader('Last-Modified',statObj.ctime.toGMTString());
            fs.createReadStream(realPath).pipe(res);
        }
    }catch(e){
        res.statusCode = 404;
        res.end(`not found`);
    }
}).listen(3000);

// let mime = require('mime');
// console.log(mime.getType('c://a.css'))
