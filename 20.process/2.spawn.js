// 在主进程中开启两个子进程，先运行第一个进程给她传递一些参数，将参数取出 返还给主进程,主进程再把结果传递给另一个进程写入到文件内
// node sub --port 3000 --dir d
let {spawn} = require('child_process');
let path = require('path');
let child1 = spawn('node',['1.js','a','b'],{
    cwd:path.join(__dirname,'test'),
    // stdio:['pipe']
    // stdio:[0,1,2] 不能通信 无法获得子进程的结果
});
let child2 = spawn('node',['2.js'],{
    cwd:path.join(__dirname,'test')
});
child1.stdout.on('data',function(data){
    // 结果拿到后 在写给另一个进程
    // 主进程往2里写
    child2.stdout.write(data.toString());
});