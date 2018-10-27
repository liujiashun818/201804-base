let Koa = require('koa');
let Router = require('koa-router');
let app = new Koa();
let router = new Router();
let session = require('koa-session');
app.keys = ['zfpx']; 
app.use(session({
    key:'zfpx',
    maxAge:10*1000
},app))
router.get('/towash',(ctx,next)=>{
    if(ctx.session.user){ // 不是第一次来
        ctx.session.user.count -- ;
        ctx.body = `当前办卡了 次数${ctx.session.user.count}`
    }else{
        ctx.session.user = {count:5};
        ctx.body = `当前办卡了 次数5`
    }
});
app.use(router.routes());
app.listen(3000);

// koa-bodyparser    body-parser
// koa-better-body   multer
// koa-static        内置的
// koa-views         内置的
// koa-session       express-session
// koa-router        内置的
// cookie            cookie-parser

// koa源码 session的实现
// localStorage sessionStorage cookie session的区别

// 这周六 叶老师 讲tcp 原理 
// 周六晚上 8-10 jwt 公开课