let http = require('http');
let util = require('util');
let fs = require('fs');
let stat = util.promisify(fs.stat);
let url = require('url');
let path = require('path');
let p = path.resolve(__dirname);
// 比较内容 stat.size (不靠谱)
// 第一次请求Etag:内容的标识  'aaa'
// 第二次在请求我的时候 if-none-match 'bb'
http.createServer(async function(req,res){
    let {pathname} = url.parse(req.url);
    let realPath = path.join(p,pathname);
    try{
        let statObj = await stat(realPath); 
        res.setHeader('Cache-Control','no-cache');
        let match = req.headers['if-none-match'];
        if(match){
            if(match === statObj.size.toString()){
                res.statusCode = 304;
                res.end();
            }else{
                res.setHeader('Etag',statObj.size.toString());
                fs.createReadStream(realPath).pipe(res);
            }
        }else{
            res.setHeader('Etag',statObj.size.toString());
            fs.createReadStream(realPath).pipe(res);
        }
       
    }catch(e){
        res.statusCode = 404;
        res.end(`not found`);
    }
}).listen(3000);

// let mime = require('mime');
// console.log(mime.getType('c://a.css'))
