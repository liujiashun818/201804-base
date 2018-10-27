let {Transform} = require('stream');


// duplex特殊的情况
class MyTransform extends Transform{
    _transform(chunk,encoding,callback){
        console.log(chunk.toString().toUpperCase());
        callback();
        this.push('123');
    }
}
// 可以当成可写流 也可以当成可读流
let myTransform = new MyTransform();
// 转化流
process.stdin.pipe(myTransform).pipe(process.stdout);
// 流的模式对象模式

// tcp 简易聊天室 