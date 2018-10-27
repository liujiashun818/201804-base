// buffer

// 怎么声明buffer

// 定长 (拼接)
// 1)可以根据长度来声明
// let buffer = Buffer.alloc(6);
// allocUnsafe
// 默认清空下通过alloc声明的默认都是00,稍微慢一些
// console.log(buffer)

// 2)通过字符串声明
// let buffer = Buffer.from('珠峰培训');
// console.log(buffer);

// 3)数组声明
// let buffer = Buffer.from([0xe7,0x8f,0xa0]);
// console.log(buffer.toString());

// 编码的问题 文件读取的问题
// let fs = require('fs');
// let iconv = require('iconv-lite');
// let result = fs.readFileSync('./1.txt');
// console.log(iconv.decode(result,'gbk'));

// 编码的问题
// let fs = require('fs');
// function BOMstrip(result) {
//   if(Buffer.isBuffer(result)){
//     if(result[0]===0xef && result[1]===0xbb && result[2] === 0xbf)
//     return result.slice(3);
//   }else{
//     if (result.charCodeAt(0) === 0xfeff) {
//       return result.slice(1);
//     }
//   }
// }
// let result = fs.readFileSync('./1.txt');
// result = BOMstrip(result);
// // BOM头
// console.log(result);


// Buffer是内存 内存地址 引用的
// let buffer = Buffer.from([17,18,2]);
// let newBuffer = buffer.slice(0,1);
// newBuffer[0] = 1;
// console.log(buffer);


// 数组的slice方法
// let newArr = [3]
// let arr = [1, 2, newArr];
// let n = arr.slice(2);
// console.log(n);
// n[0][0] = 5;
// console.log(arr);


// copy 拷贝
Buffer.prototype.mycopy = function (target, targetStart, soruceStart, sourceEnd) {
  for (let i = 0; i < sourceEnd - soruceStart; i++) {
    target[targetStart + i] = this[soruceStart + i];
  }
}
// let buffer = Buffer.alloc(6);
// let str = '珠峰培训';
// let b = new Buffer(str); //  buffer长度是安装字节算的
// b.mycopy(buffer,0,3,9);
// console.log(buffer.toString());


// concat 拼接
let buffer1 = Buffer.from('珠');
let buffer2 = Buffer.from('峰');
let buffer3 = Buffer.from('培训');
Buffer.myconcat = function (bufferList, len = bufferList.reduce((prev, next) => prev + next.length, 0)) {
  let newBuffer = Buffer.alloc(len);
  let index = 0
  bufferList.forEach(buf => {
    buf.mycopy(newBuffer, index, 0, buf.length);
    index += buf.length;
  });
  return newBuffer;
}
let str = Buffer.myconcat([buffer1, buffer2, buffer3]).toString();
console.log(str);

// indexOf 取索引
let buffer = Buffer.from('珠峰爱培训爱jw');
// console.log(buffer.indexOf('*',7));
Buffer.prototype.split = function (sep) {
  let offset = 0;
  let len = Buffer.from(sep).length;
  let arr = [];
  let start = 0;
  while (-1 != (offset = (this.indexOf(sep, start)))) {
    arr.push(this.slice(start, offset));
    start = offset + len;
  };
  arr.push(this.slice(start));
  return arr;
}
// spilt()方法 分割buffer
// [buffer1,buffer2,buffer3]
console.log(buffer.split('爱'));

