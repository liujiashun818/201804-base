let fs = require('fs');
let ws = fs.createWriteStream('2.txt',{
  flags:'w',
  encoding:'utf8',
  autoClose:true,
  start:0,
  highWaterMark:3
});
// 写 (第一次会真的往文件里写) 后面会写到缓存中
let flag = ws.write('1');
console.log(flag);
flag = ws.write('1');
console.log(flag);
flag = ws.write('1');
console.log(flag);
// highWaterMark只是一个标识而已，一般配合着读取来用
// highWaterMark我预计 用这么多内存，假如有个文件 1g这么大
// 每次64k 读取后超出最高水位线应该暂停一下
ws.on('drain',function () {
  console.log('抽干')
});
// 抽干方法必须当前的写入的内容 已经大于等于了highWater，才会触发drain，当内容全部写入后 会执行drain方法

ws.end('我死了');//会将缓存区的内容 清空后再关闭文件
ws.write('ok');// write after end不能再结束后继续写入