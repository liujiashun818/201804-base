let Koa = require('Koa');

let app = new Koa();
// 支持异步操作
// 在koa中会把异步的方法全部封装成promise
function log(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('log');
            resolve();
        },3000)
    })
}
// 先执行第一个中间件函数 此时在这个函数中调用next函数
// 就执行下一个函数(这个函数里面有异步操作)
// 第一个中间件函数应该等待着第二个中间件函数执行完
// 在内部会把这些中间件包装成promise
app.use(async (ctx,next)=>{
    console.log(1); 
    return next(); // 我们在这调用next方法
    console.log(2)
});
app.use(async (ctx,next)=>{
    console.log(3);
    await log();
    await next();
    console.log(4)
})
app.use((ctx,next)=>{
    console.log(5);
    next();
    console.log(6)
})
app.listen(3000);