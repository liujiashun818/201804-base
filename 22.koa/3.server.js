function app() { }
app.middlewares = [];
app.use = function (fn) {
    app.middlewares.push(fn);
}
app.use(function (ctx, next) {
    console.log(1);
    next();
    console.log(2);
});
app.use(function (ctx, next) {
    console.log(3);
    console.log(4);
});
app.use(function (ctx, next) {
    console.log(5);
    next();
    console.log(6);
});
let index = 0;
// koa 中间件和express中间件的区别
// koa和express 完全一样 差在koa支持异步 express不支持
function dispatch(index){
    if(index>=app.middlewares.length) return;
    let route = app.middlewares[index]; // 取出第一个函数
    //  让函数执行，并且把第二个函数传进去
    route({},()=>dispatch(index+1)); // 深度
}
dispatch(index);
// 明天 文件上传 koa中间件用法 
// 周二 koa中间完成 koa源码
// 周四 cookie-session 
