let Koa = require('koa');

let Router = require('koa-router');
let app = new Koa();
let router = new Router();

app.keys = ['zfpx'];
router.get('/visit', (ctx, next) => {
   let visit =  ctx.cookies.get('visit',{signed:true});
   visit = visit ? Number(visit)+1 : 1;
   // 写的时候增加签名防止篡改cookie,还是不能放敏感信息
    ctx.cookies.set('visit',visit,{signed:true});
    ctx.body = `当前用户 第 ${visit}访问`
});
app.use(router.routes());
app.listen(4000);

// let crypto = require('crypto');
// let r = crypto.createHmac('sha1','zfpx').update(String('visit=1')).digest('base64');
// console.log(r);
// // 2 Sg24ugFmNE/uXHVD68mvd2ihvk0=