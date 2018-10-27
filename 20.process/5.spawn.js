let {spawn} = require('child_process');
let path = require('path');

let child = spawn('node',['detach.js'],{
    cwd:path.join(__dirname,'test'),
    detached:true,
    stdio: 'ignore' // 要求必须不共用 父亲才能断开
});
child.unref(); // 断绝关系，子进程独立运行

