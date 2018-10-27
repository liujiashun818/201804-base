// 加载.txt文件，把里面的 [name] => options.name
let loaderUtils = require('loader-utils');
function loader(source) {
    let options = loaderUtils.getOptions(this);
    let name = options.name;
    source = source.replace(/\[name\]/, name);
    //console.log('source', source);
    return `module.exports = ${JSON.stringify(source)}`;
}
module.exports = loader;