// 可读流 
// 读文件 fs.read

// 可写流
// 写文件 fs.write

let fs = require('fs');

let rs = fs.createReadStream('./1test.js',{
  flags:'r', // 读取的方式
 // encoding:null,// 编码 buffer
  autoClose:true,
  start:0,
  end:9, // 包后
  highWaterMark:2 // 最高水位线
});
// 默认什么都不干 结果默认是不会读取的内
// 流的两种模式 一种叫暂停模式  流动模式
let arr = []
rs.on('data',function (data) {
  rs.pause(); // 暂停 暂停触发data事件
  arr.push(data);
  console.log('停')
  setTimeout(() => {
    rs.resume();
  }, 1000);
});
rs.on('error',function (err) {
 console.log(err);
});
rs.on('end',function () {
  console.log(Buffer.concat(arr).toString());
});
