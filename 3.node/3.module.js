let fs = require('fs');
// 这里的方法分为两类 有同步的和异步的

// 模块require方法是同步的
// let r = fs.readFileSync('xxx','编码');

// 这个方法可以判断文件是否存在 ，如果不存在 会返回一个error
// fs.accessSync('.gadasditignore')

// let vm = require('vm'); // 沙箱
// var a= 1000;
// 不会受外界的干扰
// vm.runInThisContext('function b(){return 1000}'); 
// console.log(b())


// 专门处理路径的
let path = require('path');
// join 和 resolve 用法基本上可以对调
console.log(path.join(__dirname,'a', 'b', 'c','..','/'));
console.log(path.resolve(__dirname, 'a', 'b', 'c', '..','/'));
// resolve方法遇到/ 时 会认为时根路径

console.log(path.basename('a.min.js','.js')); // 基本名字
console.log(path.extname('a.min.js')); // 扩展名
console.log(path.sep);
console.log(path.delimiter);

// node中怎么调试?
// 1) 命令行调试
// 2) 浏览器调试
// 3) 编辑器调试 √


