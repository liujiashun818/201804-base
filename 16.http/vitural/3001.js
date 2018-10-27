// http-proxy  http-proxy-middleware
// 服务器代理功能
// 3001服务器
let http = require('http');
http.createServer(function(req,res){
    res.end('zf2');
}).listen(3001);

