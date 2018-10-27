// 先获取计算机的cpu数

let os = require('os');
// 核数
let {fork} = require('child_process');
let path = require('path');
let http = require('http');
let server = http.createServer(function(req,res){
    res.end('xxxx');
});
server.listen(3000);
for(let i =0 ;i<os.cpus().length;i++){
    let child = fork('server.js',{
        cwd:path.join(__dirname)
    });
    // ipc通信 第一个参数放的是消息 第二个参数 只能放 http服务 或者tcp的服务
    child.send('server',server);
}

// cluster 


