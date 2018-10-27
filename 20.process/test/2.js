let fs = require('fs');
process.stdout.on('data',function(data){
    let flag = false;
    if(data.toString().includes('end')){
        flag = true;
    }
    data = data.toString().replace(/end/,'');
    fs.appendFileSync('xxx.txt',data);
    if(flag){
        process.exit(); // 进程的退出
    }
});
