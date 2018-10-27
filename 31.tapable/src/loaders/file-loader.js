/**
 * 1. 生成一个文件名并且把原始文件生成到目标目录
 * 2. 返回一个在目标目录下面的文件名
 */
let loaderUtils = require('loader-utils');
function loader(source) {
    let options = loaderUtils.getOptions(this);
    //  xxhashxxx.png
    let filePath = loaderUtils.interpolateName(this, options.filename || '[hash]', { content: source });
    //向目录目录输出一个文件
    this.emitFile(filePath, source);
    return `module.exports = ${JSON.stringify(filePath)}`;
}
loader.raw = true;
module.exports = loader;