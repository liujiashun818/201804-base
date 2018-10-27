
let {exec,execFile} = require('child_process');

// execFile是基于 spawn的
// 执行命令 可以通过数组的方式传递参数
execFile('ls',['-ll'],function(err,stdout,stderr){
    console.log(stdout)
});
// exec是基于 execFile的 直接执行命令
exec('ls -ll',function(err,stdout,stderr){
    console.log(stdout);
});
// 集群 cluster (进程不越多越好) 
// 进程的开启个数 根据 cpu核数来开启的