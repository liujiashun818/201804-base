let Koa = require('koa');
// app 是监听函数
let app = new Koa();
// koa里面 就两个常用的方法 listen use
app.use(function(ctx,next){
    ctx.body = {'name':'zfpx'}
    throw new Error('出错了');
    next();
});
app.use(function(ctx,next){
    ctx.body = {'name':'jw'}
});
// 监听错误捕获
app.on('error',function(err){
    console.log(err);
});
// 调用next就会执行下一个中间件，ctx.body 可以设置多次，以最后的为主,等待中间件全部执行完 会将ctx.body结果响应给客户端
app.listen(3000);
