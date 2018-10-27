// 服务端接受客户端的响应


let http = require('http');

// req 是一个可读流 res是可写流 基于socket
// req 请求  res 响应

// GET / HTTP/1.1
// Host: www.baidu.com
// User-Agent: curl/7.57.0
// Accept: */*

// a=b&c=d
let server = http.createServer();
server.on('request',(req,res)=>{
    console.log(req.method); // 这个方法名是大写的
    console.log(req.url); // 路径
    console.log(req.httpVersion); 
    console.log(req.headers); // 请求头
    let arr = [];
    req.on('data',function(data){
        arr.push(data);
    });
    req.on('end',function(){
        console.log(Buffer.concat(arr));
    });
    // ------------------------------
    // 响应
    // res.writeHead(200,{'Content-Type':'text','a':'1'});
    
    res.setHeader('Content-Type','text');
    res.setHeader('a','1');
    res.sendDate = false;
    //res.write('hello');
    res.end('hello');
});
server.on('connection',function(socket){
    console.log('链接成功')
});
server.listen(3000);