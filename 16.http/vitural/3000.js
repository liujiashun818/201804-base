// http-proxy  http-proxy-middleware
// 服务器代理功能
// 3000 服务器
let http = require('http');

http.createServer(function(req,res){
    res.end('zf1')
}).listen(3000);

