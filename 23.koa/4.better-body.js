let Koa = require('koa');
let app = new Koa();
const uuidv1 = require('uuid/v1');
console.log(uuidv1());
// 如果两个让人同时上传 a.png 
// let bodyParser = require('koa-bodyparser');
// app.use(bodyParser()); // 解析请求体的中间件 json格式 querystring

let betterBody = require('koa-better-body'); // v1插件 
let convert = require('koa-convert'); // 将1.0的中间件 转化成2.0中间件
app.use(convert(betterBody({
    uploadDir: __dirname
})))
app.use(async (ctx, next) => {
    if (ctx.path === '/' && ctx.method === 'GET') {
        ctx.set('Content-Type', 'text/html;charset=utf8');
        ctx.body = `
        <form action="/" method="post" enctype="multipart/form-data">
            <input type="text" name="username" autoComplete="off">
            <input type="text" name="password" autoComplete="off">
            <input type="file" name="avatar">
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
        ctx.body = ctx.request.fields;
    }
});


app.listen(3000);