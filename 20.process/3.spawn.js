let {spawn} = require('child_process');
let path = require('path');

// ipc表示进程间的通信 send message
let child = spawn('node',['sub_process3.js'],{
    cwd:path.join(__dirname,'test'),
    stdio:[0,'pipe',2,'ipc']
});
// 父进程可以杀死子进程，子进程可以自己退出 ipc方式
child.on('message',function(data){
    console.log(data);
    child.send('world');
    process.kill(child.pid);
});
// ipc pipe ignore 0 1 2 