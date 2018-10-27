const ExternalModule = require("webpack/lib/ExternalModule");
class AutoExternalPlugin{
    constructor(options){
        this.options = options||{};
        //不同的模块有不同的创建模板的工厂
        //用来记录哪些模块需要从一个普通的模块变成一个外部模块
        this.externalModules = {};
    }
    apply(compiler){
        compiler.hooks.compilation.tap('WebpackInlinePlugin',(compilation)=>{
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('AutoExternalPlugin',(htmlData, callback)=>{
                let extraTags = Object.keys(this.externalModules).map(key=>({
                    tagName: 'script',
                    closeTag: true,
                    attributes:{
                        type:'text/javascript',
                        src:this.options[key].url
                    }
                }));
                htmlData.body = [...extraTags,...htmlData.body]
                callback(null,htmlData);
            });
        });

        //找出来了哪些模块需要变成外部依赖的模块
        compiler.hooks.normalModuleFactory.tap('AutoExternalPlugin',(normalModuleFactory)=>{
            normalModuleFactory.hooks.parser
            .for('javascript/auto')
            .tap('AutoExternalPlugin',(parser)=>{
                //分析AST语法树，找出哪些import的模块需要变成外部依赖模块
                parser.hooks.import.tap('AutoExternalPlugin',(statement, source)=>{
                    if(this.options[source]){
                        //就是把这个模块标识外部模块
                        this.externalModules[source] =true;
                    }
                });
            });
            //当通过工厂创建模块的时候
            //data就是用来创建模块的数据
            normalModuleFactory.hooks.factory.tap('AutoExternalPlugin',factory=>(data,callback)=>{
                //console.log('data',data);
                const dependency = data.dependencies[0];//dependency是个依赖
                let request = dependency.request;// 代表要加载的模块 jquery
                let target = this.externalModules[request];
                //如果是外部模块
                if(target){
                    callback(null,new ExternalModule(this.options[request].var,'window'));
                }else{
                    //factory是原始的工作，按照正常模块去加载
                    factory(data,callback);
                } 
            });
        });


        
    }
}
module.exports = AutoExternalPlugin;