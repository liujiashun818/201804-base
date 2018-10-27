let cluster = require('cluster');
let http = require('http');
// 在主进程中 开启多个子进程 共享服务
// 进程只能在主进程中开启
let len = require('os').cpus().length;
console.log(require('path').resolve(__dirname))
cluster.setupMaster({
    exec:require('path').resolve(__dirname,'cluster-server.js')
})
// 在这里开启子进程
for(let i = 0 ;i<len;i++){
    cluster.fork();
}
// 集群 目前就是简化 process通信server，自动去实现多进程