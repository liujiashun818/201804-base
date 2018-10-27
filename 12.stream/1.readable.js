// 流 tcp 实现可读流


let {Readable} =  require('stream');
// Readable 可读流的基类

// 内部会提供一个read方法，我们要实现一个_read方法
class MyRead extends Readable{
    constructor(){
        super();
        this.index = 0;
    }
    _read(){ // 重写了读取的方法,内部会自动调 子类的_read方法，如果没有就调用父类的
        this.index++;
        this.push(this.index+'');
        if(this.index == 5){
            this.push(null); // 表示读完了 也就是不会再触发_read了
        }
    }
}
let myRead = new MyRead();
// 没有push null表示内容没有读取完成，会继续调用_read
myRead.on('data',function(data){
    console.log(data)
});
myRead.on('end',function(){
    console.log('读取完毕')
})