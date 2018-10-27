const util = require('util');
class WebpackInlinePlugin{
    constructor(options){
        this.options = options;
    }
    apply(compiler){
        compiler.hooks.compilation.tap('WebpackInlinePlugin',(compilation)=>{
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('WebpackInlinePlugin',(htmlData, callback)=>{
                let newBody = htmlData.body.map(tag=>{
                    console.log('tag',util.inspect(tag));
                    let newTag = {
                        tagName: tag.tagName,
                        closeTag: true,
                        attributes:{
                            type: tag.attributes.type
                        }
                    };
                    newTag.innerHTML = compilation.assets[tag.attributes.src].source();
                    console.log('newTag',util.inspect(newTag));
                    return newTag;
                });
                htmlData.body = newBody;
                callback(null,htmlData);
            });
        });
    }
}
module.exports = WebpackInlinePlugin;
/**
 * [ { tagName: 'script',
    closeTag: true,
    attributes:
     { type: 'text/javascript',
       src: 'http://img.zhufengpeixun.cn/main_25c2dfd3.js' } } ]
 */