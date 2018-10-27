let Koa = require('koa');

let Router = require('koa-router');
let app = new Koa();
let router = new Router();
app.use(async (ctx, next) => {
    ctx.getCookie = function (key) {
        let r = ctx.get('Cookie') || '';
        let cookieObj = require('querystring').parse(r,'; ');
        return cookieObj[key];
    }
    let allCookies = [];
    ctx.setCookie = function (key, value, options={}) {
        let arr = []; // [name="zfpx",domain="zf1.cn"]
        let line = `${key}=${encodeURIComponent(value)}`
        arr.push(line);
        if (options.domain) {
            arr.push(`Domain=${options.domain}`)
        }
        if (options.maxAge) {
            arr.push(`Max-Age=${options.maxAge}`)
        }
        if (options.httpOnly) {
            arr.push(`HttpOnly=true`);
        }
        if (options.path) {
            arr.push(`Path=${options.path}`);
        }
        line = arr.join('; ');
        allCookies.push(line);
        ctx.set('Set-Cookie',allCookies);
    }
    await next();
})
router.get('/read', (ctx, next) => {
    let name = ctx.getCookie("name") || '没有name';
    let age = ctx.getCookie("age") || '没有name';
    ctx.body = `${name}-${age}`;
})
router.get('/write', (ctx, next) => {
    ctx.setCookie('name', 'zfpx', { domain: 'zf1.cn' });
    ctx.setCookie('age', '9', { maxAge: 10 });
    ctx.body = 'write Ok'
});
app.use(router.routes());
app.listen(4000);