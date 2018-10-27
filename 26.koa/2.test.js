let Koa = require('./koa/application');
let fs = require('fs');
let app = new Koa();
// 第一个中间件会等待着第二个中间件执行完
app.use((ctx,next) =>{
  ctx.body = {name:'zpfx'};
  // ctx.body = fs.createReadStream('./package-lock.json');
});

app.listen(5000);