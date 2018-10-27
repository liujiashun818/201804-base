let Koa = require('koa');
// let static = require('koa-static');
let app = new Koa();

// 中间件的好处 先帮我们处理好数据 挂载ctx上
// 增加一些新的方法 ctx.render() 
// 处理一些公共逻辑
// 权限校验
function static(dir) {
    return async (ctx, next) => {
        let path = require('path');
        let fs = require('fs');
        let {promisify} = require('util');
        let stat = promisify(fs.stat);
        let realPath = path.join(dir,ctx.path);
        try{
            let statObj = await stat(realPath);
            let mime = require('mime');
            if(statObj.isFile()){
                // 在koa返回文件可以采用流的形式
                ctx.set('Content-Type',mime.getType(realPath)+";charset=utf8");
                ctx.body = fs.createReadStream(realPath);
            }else{
                let filename = path.join(realPath,'index.html');
                await stat(filename); // 判断有没有index.html
                ctx.set('Content-Type',"text/html;charset=utf8");
                ctx.body = fs.createReadStream(filename);
            }
        }catch(e){
            await next();
        }
    }
}

app.use(static(__dirname));

app.use((ctx, next) => {
    ctx.body = 'zfpx';
});
app.listen(3000);