// 事件的“发布”“订阅"
// 观察者
let EventEmitter = require('./events');
let util = require('util');
function My() {}
util.inherits(My,EventEmitter);
let e = new My();
// 订阅
e.on('水开了',function (who) { // {水开了:[fn,fn]}
  console.log('吃泡面' + who)
});
e.on('水开了',function (who) {
  console.log('洗脸' + who);
});
// 发布
e.emit('水开了','我') 
