let Koa = require('koa');
let app = new Koa();
let Router = require('koa-router');
let router = new Router();
// 模糊匹配 /zfpx/1/2
// /article?id=1  查询方式  req.query
// /acticle/2 路径参数
// 可以支持正则
// 一级路由 二级路由  /user /user/add /user/list
router.get('/acticle/:id/:name',(ctx,next)=>{
    ctx.body = ctx.params.id;
});
router.get(/\/zfpx/,(ctx,next)=>{
    ctx.body = 'hello'
});
app.use(router.routes()); 
app.listen(3000);