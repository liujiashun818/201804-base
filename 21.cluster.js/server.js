let http = require('http');
process.on('message',function(data,server){
    http.createServer(function(req,res){
        res.end('child'+process.pid)
    }).listen(server); // 子进程公用这个服务
});