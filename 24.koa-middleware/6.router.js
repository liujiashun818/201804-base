let Koa = require('koa');
let app = new Koa();
let Router = require('./koa-router');
let router = new Router();
// 路由的功能很强大 (compose的原理)
router.get('/zfpx',(ctx,next)=>{
    ctx.body = 'zfpx1';
    next()
});
router.get('/zfpx',(ctx,next)=>{
    ctx.body = 'zfpx2';
    next();
});
router.get('/jw',(ctx,next)=>{
    ctx.body = 'jw';
});
app.use((ctx,next)=>{
    ctx.body = 'old';
});
//app.use(router.allowedMethods()); // 405
app.use(router.routes()); // 挂载
app.listen(3000);
// 发送POST请求 postman curl -X POST