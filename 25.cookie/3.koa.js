let Koa = require('koa');

let Router = require('koa-router');
let app = new Koa();
let router = new Router();

router.get('/read', (ctx, next) => {
    let name = ctx.cookies.get("name") || '没有name';
    let age = ctx.cookies.get("age") || '没有age';
    ctx.body = `${name}-${age}`;
})
router.get('/write', (ctx, next) => {
    ctx.cookies.set('name', 'zfpx');
    ctx.cookies.set('age', '9',{maxAge:10*1000});
    ctx.body = 'write Ok';
});
app.use(router.routes());
app.listen(4000);