let {Writable} = require('stream');


class MyWrite extends Writable{
    _write(chunk,encoding,callback){
        // callback => clearBuffer
        console.log(chunk,encoding,callback)
        callback(); // 不调用callback 就不会将缓存中的内容继续写入
    }
}
let myWrite = new MyWrite();
myWrite.write('hello','utf8',()=>{
    console.log('ok');
})
myWrite.write('hello','utf8',()=>{
    console.log('ok');
})