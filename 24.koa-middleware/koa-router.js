class Layer {
    constructor(path,fn){
        this.path = path;
        this.fn = fn;
    }
    match(p){
        return this.path === p
    }
}
class Router{
    constructor(){
        this.layers = [];
    }
    get(path,fn){
        this.layers.push(new Layer(path,fn))
    }
    compose(ctx,next,handlers){ // [fn,fn]
        function dispatch(index){
            if(index >= handlers.length) return next();
            let route = handlers[index];
            route(ctx,()=>dispatch(index+1));
        }
        dispatch(0);
    }
    routes(){
       return async (ctx,next)=>{
        // 筛选出路径想同的路由 /zfpx
        // 顾虑出匹配的路由
        let handlers = this.layers.filter(layer=>layer.match(ctx.path));
        handlers = handlers.map(handle=>handle.fn);
        // 把函数组合在一起
        // next方法是koa自己的next方法
        this.compose(ctx,next,handlers);
       } 
    }
}

module.exports =Router