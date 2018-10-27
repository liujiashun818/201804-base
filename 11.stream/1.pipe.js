// pipe管道 
let fs = require('fs');
let rs = fs.createReadStream('./1.txt',{highWaterMark:3});

let ws = fs.createWriteStream('./2.txt',{highWaterMark:3});

// on('data')会触发多次
rs.on('data',function(data){
    let flag = ws.write(data);
    if(!flag){
        rs.pause();
    }
});
ws.on('drain',function(){
    console.log('干了')
    rs.resume();
})



// 帮我们实现 读取一点 写一点
//rs.pipe(ws);