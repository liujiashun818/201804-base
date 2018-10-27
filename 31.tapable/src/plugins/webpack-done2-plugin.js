class WebpackDone2Plugin {
    constructor(options){
        this.options = options;
    }
  apply(compiler){
    compiler.hooks.done.tapAsync('WebpackDone2Plugin',(stats,callback)=>{
        setTimeout(()=>{
            console.log(this.options.name,new Date().toLocaleString());
            callback();
        },1000);
    });
  }
}
module.exports = WebpackDone2Plugin;