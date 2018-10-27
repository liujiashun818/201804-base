let fs = require('fs');
let EventEmitter = require('events');

const MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
    return n;
}


class ReadableStream extends EventEmitter {
    constructor(path, options = {}) {
        super();
        this.path = path;
        this.flags = options.flags || 'r';
        this.encoding = options.encoding || null;
        this.autoClose = options.autoClose || true;
        this.highWaterMark = options.highWaterMark || 16 * 1024;
        this.start = options.start || 0;
        // 如果正在读取就不会再读取了
        this.reading = false;
        // 当缓存区的长度 等于0的时候 触发readable事件
        this.emitReadable = false;
        // 表示缓存区的长度
        this.len = 0;
        // 缓存区 
        this.arr = [];
        // 偏移量
        this.pos = this.start;
        this.open();//打开文件
        // 判断用户是否监听了readable事件
        this.on('newListener', (type) => {
            if (type === 'readable') {
                this.read(); // 监听readable就开始读取
            }
        })
    }
    read(n) { // 不传递参数 表示就读取highWaterMark这么多
        // 想读取四个  缓存区只有3个  highWaterMark是三个
        if(n>this.len){
            // 如果想读的内容超标了 重新获取最新的水位线
            this.highWaterMark = computeNewHighWaterMark(n);
            this.reading = true;
            this._read();
        }
        let buffer;
        if (n > 0 && n <= this.len) { // 缓存区中的内容是有这么多个的
            // 第一次 我们希望先放三个
            // 想读取一个
            // [<Buffer 2 3>,<Buffer 4 5 6 >]

            // [buffer,buffer,buffer]l
            buffer = Buffer.alloc(n);
            // 开始读取
            let current;
            let index = 0;
            let flag = true;
            while (flag && (current = this.arr.shift())) {
                for (let i = 0; i < current.length; i++) {
                    buffer[index++] = current[i];
                    if (index === n) {
                        flag = false; // 取出来当前buffer没有消耗的
                        let b = current.slice(i + 1);
                        this.len -= n;
                        // 如果确实当前buffer有剩下的，那就在放回数组中 方便下一次继续使用
                        if (b.length > 0) {
                            this.arr.unshift(b);
                        }
                        break;
                    }
                }
            }
        }
        if (this.len === 0) {
            this.emitReadable = true;
        }
        // 如果当前的缓存区大小小于水位线时 就要读取
        if (this.len < this.highWaterMark) {
            if (!this.reading) {
                this.reading = true;
                this._read(); // _read是真正读取的方法
            }
        }
        if (buffer) {
            buffer = this.encoding ? buffer.toString(this.encoding) : buffer;
        }
        return buffer;
    }
    _read() {
        if (typeof this.fd != 'number') {
            return this.once('open', () => this._read());
        }
        // 我们需要将读取的内容 放到缓存中(而且内存不能是同一块)
        let buffer = Buffer.alloc(this.highWaterMark);
        fs.read(this.fd, buffer, 0, this.highWaterMark, this.pos, (err, bytesRead) => {
            if (bytesRead > 0) {
                this.arr.push(buffer); // 缓存
                this.len += bytesRead; // 缓存区的长度
                this.pos += bytesRead
                this.reading = false; // 读取完毕
                if (this.emitReadable) {
                    this.emitReadable = false;
                    this.emit('readable');
                }
            } else {
                this.emit('end');
            }
        });
    }
    destroy() {
        if (typeof this.fd !== 'number') {
            this.emit('close');
            return;
        }
        fs.close(this.fd, () => {
            this.emit('close');
        });
    }
    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                this.emit('error');
                if (this.autoClose) {
                    this.destroy();
                }
                return
            }
            this.fd = fd;
            this.emit('open');
        })
    }
}
module.exports = ReadableStream