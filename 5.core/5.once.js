let EventEmitter = require('./events');
let util = require('util');
function My() {}
util.inherits(My,EventEmitter);
let e = new My();
let fn = function () {
  console.log('吃泡面')
}
e.once('水开了', fn);
// e.removeListener('水开了',fn);
e.prependOnceListener('水开了', ()=>{console.log('吃饭')})
e.emit('水开了');//触发后将fn从数组中移除掉即可
e.emit('水开了');

