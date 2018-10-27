let {spawn} = require('child_process');
let path = require('path');
// fork就是基于spwan的 默认采用ipc的方式进行，silent
function fork(modulePath,args,options){
    let stdio = options.silent?['ignore','ignore','ignore','ipc']:[0,1,2,'ipc']
    return spawn('node',[modulePath,...args],{
        ...options,
        stdio:stdio
    });
}
let child = fork('fork.js',['a','b'],{
    cwd:path.join(__dirname,'test'),
    silent:true
});
child.send('hello');

