// http-proxy  http-proxy-middleware
// 服务器代理功能

// www.zf1.cn:80 ->  3000   zf1
// www.zf2.cn:80 ->  3001  zf2
//正向代理  把请求代理到其他网址上

let http = require('http');
let httpProxy = require('http-proxy');
let proxy = httpProxy.createProxyServer();
http.createServer(function(req,res){
    proxy.web(req,res,{
        target:'http://localhost:3000'
    });
    proxy.on('error',(err)=>{
        console.log(err);
    })
}).listen(80);

