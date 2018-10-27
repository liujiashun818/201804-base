class WebpackModulePlugin {
  constructor(options){
      this.options = options;
  }
  /**
   * type: 'javascript/auto', 模块的类型
   */
  apply(compiler){
    compiler.hooks.compilation.tap('WebpackModulePlugin',(compilation)=>{
       compilation.hooks.succeedModule.tap('WebpackModulePlugin',(module)=>{
           console.log(module._source._value);//module.source
       });
    });
  }
}
module.exports = WebpackModulePlugin;