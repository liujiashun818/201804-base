let fs = require('fs');
let EventEmitter = require('events');

class WriteStream extends EventEmitter{
  constructor(path,options ={}){
    super();
    this.path = path;
    this.flags = options.flags || 'w';
    this.mode = options.mode || 0o666;
    this.highWaterMark = options.highWaterMark || 16*1024;
    this.start = options.start || 0;
    this.autoClose = options.autoClose|| true;
    this.encoding = options.encoding || 'utf8';

    // 是否需要触发drain事件
    this.needDrain = false;
    // 是否正在写入
    this.writing = false;
    // 缓存 正在写入就放到缓存中
    this.buffer = [];
    // 算一个当前缓存的个数
    this.len = 0;
    // 写入的时候也有位置关系
    this.pos = this.start;
    this.open();
  }
  // 0 [1 2] 
  write(chunk, encoding = this.encoding,callback){
    chunk = Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk);
    this.len += chunk.length;// 每次调用write就统计一下长度
    this.needDrain = this.highWaterMark <= this.len; 
    // this.fd
    if(this.writing){
      this.buffer.push({chunk,encoding,callback});
    }else{
      // 当文件写入后 清空缓存区的内容
      this.writing = true;  // 走缓存
      this._write(chunk,encoding,()=>this.clearBuffer());
    }
    return !this.needDrain; // write 的返回值必须是true / false
  }
  _write(chunk,encoding,callback){
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this._write(chunk, encoding, callback));
    }
    // fd是文件描述符 chunk是数据 0 写入的位置和 长度 , this.pos偏移量
    fs.write(this.fd, chunk,0,chunk.length,this.pos,(err,bytesWritten)=>{
      this.pos += bytesWritten;
      this.len -= bytesWritten; // 写入的长度会减少
      callback();
    });
  }
  clearBuffer(){
    let buf = this.buffer.shift();
    if(buf){
      this._write(buf.chunk, buf.encoding, () => this.clearBuffer());
    }else{
      this.writing = false;
      this.needDrain = false; // 触发一次drain  再置回false 方便下次继续判断
      this.emit('drain');
    }
  }
  destroy(){
    if(typeof this.fd === 'number'){
      fs.close(this.fd,()=>{
        this.emit('close');
      });
      return 
    }
    this.emit('close');
  }
  open(){
    fs.open(this.path,this.flags,this.mode,(err,fd)=>{
      if(err){
        this.emit('error');
        this.destroy();
        return 
      }
      this.fd = fd;
      this.emit('open');
    });
  }
}
module.exports = WriteStream;