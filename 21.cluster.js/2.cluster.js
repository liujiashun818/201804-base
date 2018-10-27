let cluster = require('cluster');
let http = require('http');
// 在主进程中 开启多个子进程 共享服务
// 进程只能在主进程中开启
let len = require('os').cpus().length;
if(cluster.isMaster){ // 主进程
    // 在这里开启子进程
    for(let i = 0 ;i<len;i++){
        cluster.fork();
    }
}else{ // 子进程
    http.createServer(function(req,res){
        res.end('child'+process.pid);
    }).listen(3000);
}