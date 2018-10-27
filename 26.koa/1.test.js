// koa和express中间件的区别 (一样) koa里面第一个中间会等待着下一个中间件执行后才算执行完
// koa-router 
// koa两部分 ctx(req,res) 中间件 next compose
let Koa = require('koa');

let app = new Koa();

// 创建上下文
app.use((ctx,next)=>{
  console.log(ctx.request.req.path);
  console.log(ctx.req.path); // 去原生上取 req.url
  console.log(ctx.request.path); // 去koa自己封装的request上取
  console.log(ctx.path); // ctx.url == ctx.request.url
})

app.listen(3000);