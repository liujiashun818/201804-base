/**
 * 判断模块的内容大小和配置文件中配置的limit
 * 如果说内容大小小于limit的话，把源文件内容变成base64字段串返回
*/
let loaderUtils = require('loader-utils');
let mime = require('mime');
function loader(source) {
    //this loaderContext https://webpack.js.org/api/loaders/
    let { limit, filenamme = "[hash].[ext]", fallback = "file-loader" } = loaderUtils.getOptions(this);
    let length = source.length;
    if (!limit || length < limit) {//如果这样的话需要把内容变成base64导出
        let contentType = mime.getType(this.resourcePath);
        let base64 = `data:${contentType};base64,${source.toString('base64')}`;
        return `module.exports = ${JSON.stringify(base64)}`;
    } else {
        let fileLoader = require(fallback);
        return fileLoader.call(this, source);
    }
}
//如果设置了raw=true,则source就是一个Buffer,否则source是一个utf8的字符串
loader.raw = true;
module.exports = loader;