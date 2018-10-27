let Koa = require('koa');
let app = new Koa();
app.use(function(ctx,next){
    // ------------
    console.log(ctx.req.url); // 原生req的请求路径
    console.log(ctx.request.req.url);

    // ------------
    console.log(ctx.request.url); // 自己封装的request
    console.log(ctx.url); // 这个是自己封装的url
    //  response也会挂着req
    console.log(ctx.response.req.url);
    ctx.response.body = {'name':'zfpx'}
});

app.listen(3000);
