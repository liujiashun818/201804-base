class WebpackDonePlugin {
  constructor(options){
      this.options = options;
  }
  apply(compiler){
    compiler.hooks.done.tapAsync('WebpackDonePlugin',(stats,callback)=>{
        setTimeout(()=>{
            console.log(this.options.name,new Date().toLocaleString());
            callback();
        },1000);
    });
  }
}
module.exports = WebpackDonePlugin;