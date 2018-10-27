let fs = require('fs');
// 写入时只占用三个字节的内存
let WriteStream= require('./WriteStream')
let ws = new WriteStream('./1.txt',{
  flags:'w',
  mode:0o666,
  highWaterMark:3,
  start:0,
  autoClose:true,
  encoding:'utf8'
});
// 0往文件中写 12 放到内存中 3写到文件里 45
// 0 1 2 3 4 5
let i = 0
function write(){
  let flag = true
  while (i < 9 && flag){
    // 0
    i++;
    flag = ws.write('我' +'','utf8',()=>{});
  }
}
ws.on('drain',function () {
  console.log('写入成功')
  write()
})
write();
// for(let i = 0;i<9;i++){
//   let flag = ws.write(i+'','utf8',()=>{});
//   console.log(flag);
// }

