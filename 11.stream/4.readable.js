// 行读取器 没读完一行 就把这一行的内容 发射出来
let EventEmitter = require('events');
let fs = require('fs');
class LineReader extends EventEmitter {
    constructor(path) {
        super();
        this.path = path;
        let RETURN = 13;
        let LINE = 10;
        this.arr = []; // 存放内容的
        // \r 13  windows 怎么表示是新的一行 就用\r
        // \n 10  mac  没有\r 只有\n
        this._rs = fs.createReadStream(this.path); // 64k
        // 判断用户监听了newLine事件
        let r ;
        this.on('newListener', (type) => {
            if (type === 'newLine') {
                this._rs.on('readable', () => {
                    let current; // 当前读出来的内容
                    while (current = this._rs.read(1)) {
                        switch (current[0]) {
                            case RETURN:
                                r = Buffer.concat(this.arr).toString();
                                this.emit('newLine', r);
                                this.arr = [];
                                // 如果下一个是换行 我就抛弃掉如果不是换行 我就留到数组里
                                let next = this._rs.read(1);
                                if (next[0] !== LINE) {
                                    this.arr.push(current);
                                }
                                break;
                            case LINE:
                                r = Buffer.concat(this.arr).toString();
                                this.emit('newLine', r);
                                this.arr = [];
                            default:
                                this.arr.push(current);
                        }
                    }
                });
                this._rs.on('end', () => {
                    let r = Buffer.concat(this.arr).toString();
                    this.emit('newLine', r);
                })
            }
        })
    }
}
// 行读取器
let lineReader = new LineReader('./1.txt');
lineReader.on('newLine', (data) => {
    console.log(data, '-------------');// 123   // 456  // 789
});