let EventEmitter = require('./events');
let util = require('util');
function My() {}
util.inherits(My,EventEmitter);
let e = new My();
let fn = function () {
  console.log('吃泡面')
}
e.setMaxListeners(1);
e.on('水开了', fn);
e.on('水开了',function () {
  console.log('洗脸');
});
e.on('水开了', function () {
  console.log('洗脸');
});
// console.log(e.getMaxListeners())
// e.removeListener('水开了',fn);
// e.emit('水开了');
// console.log(e.eventNames())

