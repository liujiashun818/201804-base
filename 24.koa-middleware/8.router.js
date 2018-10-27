let Koa = require('koa');
let app = new Koa();
let Router = require('koa-router');
// let router = new Router({ //  前缀的用法 但是默认不会使用
//     prefix:'/user'
// });
let router1 = new Router();
let router2 = new Router();
// /user显示用户    /user/add 添加用户  /user/list 用户列表
router1.get('/user',(ctx,next)=>{
    ctx.body = 'show user';
});
router2.get('/add',(ctx,next)=>{
    ctx.body = 'user add';
});
router2.get('/list',(ctx,next)=>{
    ctx.body = 'user list';
});
router1.use('/user',router2.routes());
app.use(router1.routes());

app.use(router1.routes()); 
app.listen(3000);

// cookie session jwt koa源码 express
// 本周作业 写一篇关于koa的文章