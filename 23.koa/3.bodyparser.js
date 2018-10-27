let Koa = require('koa');
let app = new Koa();
function bodyParser() {
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            let arr = []
            ctx.req.on('data', function (data) {
                arr.push(data);
            });
            ctx.req.on('end', function () {
                let body = Buffer.concat(arr).toString();
                ctx.request.body = body;
                resolve();
            })
        });
        await next();
    }
}
app.use(bodyParser()); // 解析请求体的中间件
app.use(async (ctx, next) => {
    if (ctx.path === '/' && ctx.method === 'GET') {
        ctx.set('Content-Type', 'text/html;charset=utf8');
        ctx.body = `
        <form action="/" method="post">
            <input type="text" name="username" autoComplete="off">
            <input type="text" name="password" autoComplete="off">
            <input type="submit" >
        </form>
        `
    } else {
        return next();
    }
});

app.use(async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.path === '/') {
        // 获取表单提交过来的数据
        ctx.body = ctx.request.body;
    }
});


app.listen(3000);