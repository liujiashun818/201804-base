// 服务端
// 头

let http = require('http');

http.createServer(function(req,res){
    console.log(req.method);
    console.log(req.headers);
    console.log('请求到来');
    res.end('hello');
}).listen(3000);