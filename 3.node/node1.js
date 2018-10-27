// 在文件中写代码 最外层是有个闭包的

//console.log(this); // 是空对象 在文件中this不是global

// 我们才浏览器不能直接访问global属性 通过window代理的
// 在服务端可以直接访问global属性

// console 输出
console.log('hello');
console.info('信息');
// 标准输出 1  错误输出 2 流  进程通信
// console.warn('warn');
// console.error('error');  

// process.stdout.write('hello');
// process.stderr.write('world');

// 0 标准输入 
// process.stdin.on('data',function (data) {
//   console.log(data.toString())
// });
// node中有一个专门做断言的库 assert 测试用
// console.assert(1===1===1,'错误');

// console.time('tag1'); //测试时间
// console.timeEnd('tag1');
// console.dir(); // util.inspect(); 解析打印的相信信息

// yargs 可以解析用户执行命令时传递的参数
console.log(process.argv);
let args = {}
process.argv.slice(2).forEach((arg,index) => {
  if(arg.includes('--')){
    args[arg.slice(2)] = process.argv.slice(2)[index+1];
  }
});
// console.log(args);
// 环境变量 set my=dev&&node xxx.js (关掉创就就消失了);
// 用来区分代码中的环境
let url = '';
if(process.env.my === 'dev'){
  url = 'http://localhost:3000'
}else{
  url = 'http://fullstackjavascript'
}
console.log(url);

//process.kill(20352); // 杀死进程
// process.exit(2); // 退出进程，退出自己




// node事件环
// cwd当前工作目录 
//process.chdir('3.node'); // 后面读取文件时 会拼一个绝对路径出来
// console.log(process.cwd());
// let fs = require('fs');
// fs.readFile('./1.log','utf8',function (err,data) {
//   console.log(err);
// });
// process进程
//   argv 执行参数
//   env 环境变量
//   pid 当前进程id
//   chdir/cwd chdir可以改变执行的工作目录 cwd代表的时当前目录
//   nextTick 下一队列
//   stdout
//   stderr
//   stdin
//   kill
//   exit 

// Buffer

//clearImmediate
//setImmediate

// console.dir(global,{showHidden:true});
// global上的属性都可以直接访问

// 全局变量 在文件执行中可以不声明直接获取的 闭包会自带一些参数 

// global.a = 100;
// console.log(a);


