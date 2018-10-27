let Koa = require('koa');
// 写一个表单 表单里有一个 用户名 密码

let app = new Koa();
// localhost:3000 返回一个表单
app.use(async (ctx, next)=>{
    if (ctx.path === '/' && ctx.method === 'GET') {
        ctx.set('Content-Type','text/html;charset=utf8');
        ctx.body = `
        <form action="/" method="post" >
            <input type="text" name="username" autoComplete="off">
            <input type="text" name="password" autoComplete="off">
            <input type="submit" >
        </form>
        `
    } else {
          next();
    }
});

function bodyParser(ctx){
    return new Promise((resolve,reject)=>{
        let arr = [];
        ctx.req.on('data',function(data){
            arr.push(data);
        });
        ctx.req.on('end',function(){
            let body = Buffer.concat(arr).toString();
            resolve(body)
        })
    })
}
app.use(async (ctx, next)=>{
    if(ctx.method === 'POST' && ctx.path === '/'){
        // 获取表单提交过来的数据
        ctx.body = await bodyParser(ctx);
    }
})

app.listen(3000);