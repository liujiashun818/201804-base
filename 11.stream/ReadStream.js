let EventEmitter = require('events');
let fs = require('fs');
class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.autoClose = options.autoClose || true;
    this.flags = options.flags || 'r';
    this.encoding = options.encoding || null;
    this.start = options.start || 0;
    this.end = options.end || null;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    // 应该有一个读取文件的位置 可变的(可变的位置)
    this.pos = this.start;
    // 控制当前是否是流动模式
    this.flowing = null;
    // 构建读取到的内容的buffer
    this.buffer = Buffer.alloc(this.highWaterMark);
    // 当创建可读流 要将文件打开
    this.open(); // 异步执行
    // 源认 没有监听 data时就会读取了
    this.on('newListener', (type) => {
      if(type === 'data'){ // 用户监听了data事件，就开始读取吧
        this.flowing = true;
        this.read();// 开始读取文件
      }
    });
  }
  read(){
    // 这时候文件还没有打开呢，等待着文件打开后再去读取
    if(typeof this.fd !== 'number'){
      // 等待着文件打开，再次调用read方法
      return this.once('open',()=>this.read());
    }
    // 开始读取了
    // 文件可能有10个字符串
    // start 0 end 4
    // 每次读三个 3
    // 0-2
    // 34
    let howMuchToRead = this.end ? Math.min(this.highWaterMark,this.end - this.pos+1) :this.highWaterMark
    // 文件描述符 读到哪个buffer里 读取到buffer的哪个位置
    // 往buffer里读取几个,读取的位置
    // 想读三个 文件只有2个 
    fs.read(this.fd, this.buffer,0,howMuchToRead,this.pos,(err,bytesRead)=>{
      if (bytesRead>0){ // 读到内容了
        this.pos += bytesRead;
        // 保留有用的
        let r = this.buffer.slice(0, bytesRead);
        r = this.encoding ? r.toString(this.encoding) : r;
        // 第一次读取
        this.emit('data', r);
        if (this.flowing) {
          this.read();
        }
      }else{
        this.end = true;
        this.emit('end');
        this.destroy();
      }
    });
  }
  pipe(dest){
    this.on('data',(data)=>{
      let flag = dest.write(data);
      if(!flag){
        this.pause();
      }
    });
    dest.on('drain',()=>{
      this.resume();
    });
    this.on('end',()=>{
      this.destroy();
    });
  }





  destroy() { // 判断文件是否打开 (将文件关闭掉)
    if (typeof this.fd === 'number') {
      fs.close(this.fd, () => {
        this.emit('close');
      });
      return;
    }
    this.emit('close');
  }
  open() { // 打开文件的逻辑
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        this.emit('error', err);
        if (this.autoClose) {
          this.destroy(); // 销毁 关闭文件（触发close事件）
        } return;
      }
      this.fd = fd;
      this.emit('open'); // 触发文件开启事件
    });
  }
  pause(){
    this.flowing = false;
  }
  resume(){
    this.flowing = true;
    this.read(); // 继续读取
  }
}
module.exports = ReadStream;