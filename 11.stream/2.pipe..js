let ReadStream = require('./ReadStream');
// let WriteStream= require('./WriteStream');

let rs = new ReadStream('./1.txt');

let ws = new WriteStream('./2.txt');

rs.pipe(ws);

// 不需要担心 淹没可用内存