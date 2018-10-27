let fs = require('fs');
let ReadStream = require('./ReadStream')
let rs = new ReadStream('./2.txt',{
  highWaterMark:2,
  autoClose:true,
  flags:'r',
  start:0,
  end:5,
  encoding:'utf8'
});
rs.on('open',function () {
  console.log('open')
});
rs.on('error',function (err) {
  console.log(err);
});
rs.on('data',function (data) {
  console.log(data);
  rs.pause();
});
rs.on('end',function () {
  console.log('完毕')
})
rs.on('close',function () {
  console.log('close');
})
setInterval(() => {
  rs.resume();
}, 1000);