let Koa = require('koa');

let app = new Koa();
function render(result){
    let head = "let templ; \r\n";
    head += "with (renderObj) { \r\n templ =`";
    let content = result.replace(/<%=([\s\S]*?)%>/g,function(){
        return '${'+arguments[1]+"}";
    })
    content = content.replace(/<%([\s\S]*?)%>/g,function(){
        return "` \r\n " + arguments[1] + "\r\n templ+=`" ;
    });
    let tail = '`} \r\n return templ'
    return head + content + tail;
}
function views(dir,{extension}){
    return async (ctx,next)=>{
        let path = require('path');
        let ejs = require(extension);
        let fs = require('fs');
        let {promisify} = require('util')
        let readFile = promisify(fs.readFile);
        ctx.render =async function(filename,obj){
            let realPath = path.join(dir,filename+'.'+extension);
            let tmpl = await readFile(realPath,'utf8');
            let fn = new Function('renderObj',render(tmpl)); // 渲染出函数
            ctx.set('Content-Type','text/html;charset=utf8');
            ctx.body = fn(obj); // 调用函数返回结果
        }
        await next();
    }
}

app.use(views(__dirname,{
    extension:'ejs'
}));

app.use(async (ctx,next)=>{
    await ctx.render('index',{name:'zfpx',age:9,arr:[1,2,3]});
});
app.listen(3000);