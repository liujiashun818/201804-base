const babel = require('@babel/core');
const loaderUtils = require('loader-utils');
//source代表此资源的内容字符串
function loader(source) {
    let callback = this.async();
    let options = loaderUtils.getOptions(this);
    //console.log(options);
    babel.transform(source, options, function (err, result) {
        //console.log(err);
        let { code, map, ast } = result;
        //console.log(result);
        callback(err, code);
    });
}
module.exports = loader;