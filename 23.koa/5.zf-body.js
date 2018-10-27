let Koa = require('koa');
let app = new Koa();
Buffer.prototype.split = function (sep) {
    let index = 0;
    let arr = [];
    let pos = 0;
    let len = Buffer.from(sep).length;
    while (-1 != (pos = this.indexOf(sep, index))) {
        arr.push(this.slice(index, pos));
        index = pos + len;
    }
    arr.push(this.slice(index));
    return arr;
}

function zfBody({ uploadDir }) {
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            let buffer = [];
            ctx.req.on('data', function (data) {
                buffer.push(data);
            });
            ctx.req.on('end', function (data) {
                let bondery = ctx.get('Content-Type').split('=')[1];
                bondery = "--" + bondery;
                let buf = Buffer.concat(buffer); // 总共的请求,按照分隔符进行分割
                let arr = buf.split(bondery);
                arr = arr.slice(1, -1);
                let body = {};
                arr.forEach(lines => {
                    let [head, tail] = lines.split('\r\n\r\n');
                    head = head.toString();
                    // 是文件
                    if (head.includes('filename')) {
                        // 是文件的话就要把tail的部分写到文件里
                        // lines代表文件部分
                        console.log(lines.toString());
                        let tail = lines.slice(head.length + 4, -2);
                        // 把文件内容写到文件中
                        let ws = require('fs').createWriteStream(Date.now() + Math.random() + "");
                        ws.end(tail);
                    } else {
                        // 普通文本
                        let key = head.match(/name="(\w+)"/)[1];
                        body[key] = tail.toString().slice(0, -2);
                    }
                });
                ctx.request.fields = body;
                resolve();
            });
        })
        await next();
    }
}
app.use(zfBody({
    uploadDir: __dirname
}))
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


app.listen(4000);

// koa的路由中间件  
// koa静态服务中间件
// 自己实现一个模板引擎ejs模板 (拼字符串);
// cookie session

// koa源码