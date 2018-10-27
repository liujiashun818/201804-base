let EventEmitter = require('events');
let util = require('util');
function My() {}
util.inherits(My,EventEmitter);
let e = new My();
e.on('newListener',function (type) {
  if(type === 'ok'){
    process.nextTick(()=>{
      e.emit('ok');
    });
  }
})
e.on('水开了',function (who) {
  console.log('吃泡面' + who)
});
e.on('水开了',function (who) {
  console.log('洗脸' + who);
});
e.on('ok',function () {
  console.log('ok')
})
