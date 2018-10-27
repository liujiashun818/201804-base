// 范围请求  206  

//  客户端需要发送一个头 Range:bytes=0-5
//  服务端    Accept-Ranges: bytes 
//           Content-Range: bytes 0-5/705
//           206
let http = require('http');
let path= require('path');
let p = path.resolve(__dirname,'1.txt');
let fs = require('mz/fs');
// mz
async function listener(req,res){
    let range = req.headers['range'];
    if(range){
        let [,start,end] = range.match(/(\d*)-(\d*)/);
        let statObj = await fs.stat(p);
        let total = statObj.size;
        start = start?Number(start):0;
        end = end?Number(end):total-1;
        res.statusCode = 206;
        res.setHeader('Accept-Ranges','bytes')
        res.setHeader('Content-Range',`bytes ${start}-${end}/${total}`);
        fs.createReadStream(p,{start,end}).pipe(res);
    }else{
        // 读取文件 把它响应给客户端
        fs.createReadStream(p).pipe(res);
    }
}
let server = http.createServer(listener);
server.listen(3000,()=>{
    console.log('server start' + 3000)
});