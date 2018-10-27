let http = require('http');
let httpProxy = require('http-proxy');
let proxy = httpProxy.createProxyServer();
let opts = {
    'zf1.cn':'http://localhost:3000',
    'zf2.cn':'http://localhost:3001',
}
// 根据host 请求不同的网站，起到虚拟主机配置多项目的目的
http.createServer(function(req,res){
    let host = req.headers['host']
    proxy.web(req,res,{
        target:opts[host]
    });
    proxy.on('error',(err)=>{
        console.log(err);
    })
}).listen(80);

