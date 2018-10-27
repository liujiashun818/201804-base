// spawn 产卵 fork 叉子  execFile 执行文件 exec 执行命令

let {spawn} = require('child_process');
// 开启的进程 都是回调的方式
let path= require('path');
// stdin 0  stdout 1 stderror 2
// 如果stdio 写的是 0 1 2 表示主进程和子进程共用了 标准输入 输出 错误输出
let child = spawn('node',['sub_process1.js','--port','3000'],{
    cwd: path.join(__dirname,'test'),
    stdio:['pipe'] // 管道
    //stdio:[process.stdin,process.stdout,process.stderr]
});
child.stdout.on('data',function(data){
    console.log(data.toString());
});
child.stderr.on('data',function(data){
    console.log(data.toString());
});


// node 1.spawn.js
// node sub_process.js --port 3000
// child.on('error',function(err){
//     console.log(err);
// });
// child.on('exit',function(){
//     console.log('exit');
// });
// child.on('close',function(){
//     console.log('close')
// })