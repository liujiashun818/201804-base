// Host: list.video.baidu.com:3000
// Referer: http://video.baidu.com

let http = require('http');


// 静态服务  localhost:3000/index.html
let url = require('url');
let path = require('path');
let {exists}  = require('mz/fs');
let fs = require('fs');
let whiteList = ['zf1.cn','zf2.cn'];
let static = path.resolve(__dirname,'public');
let server = http.createServer(async function (req, res) {
    let { pathname } = url.parse(req.url);
    let p = path.join(static,pathname); 
    let flag = await exists(p); // 如果路径存在也会返回true 

    // referer http://localhost:3000/index.html 引用地址
    // host: http://zf1.cn:3000
    if(flag){
        let refer = req.headers['referer'] || req.headers['referered'];
        if(refer){
            refer = url.parse(refer).hostname;
            let host = req.headers['host'].split(':')[0];
            if(refer != host ){
                if(whiteList.includes(refer)){
                    fs.createReadStream(path.join(static,'1.jpg')).pipe(res);
                }else{
                    fs.createReadStream(path.join(static,'2.jpg')).pipe(res);
                }
            }else{
                fs.createReadStream(path.join(static,'1.jpg')).pipe(res);
            }
        }else{
            fs.createReadStream(p).pipe(res);
        }
    }else{
        res.statusCode = 404;
        res.end();
    }
    
});

server.listen(3000);