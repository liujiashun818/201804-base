let {Duplex}  = require('stream');
class MyDuplex extends Duplex{
    _read(){
        this.push('123');
        this.push(null);
    }
    _write(chunk,encoding,callback){
        console.log(chunk);
        callback();
    }
}
let myDuplex = new MyDuplex();
// 选择一个 不能同时使用 流的特点是 读取消耗掉后 就没了
myDuplex.on('readable',()=>{
    console.log(myDuplex.read(1),'-----');
});
setTimeout(()=>{
    myDuplex.on('data',function(data){
        console.log(data,'xxxx');
    });
},3000);