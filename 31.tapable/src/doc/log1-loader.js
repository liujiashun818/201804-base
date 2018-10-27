const { resolve } = require('path');
//source代表此资源的内容字符串
//let a = 1;//3//2
// let a = 1;//3//2//1
let loaderUtils = require('loader-utils');
let validateOptions = require('schema-utils');
let fs = require('fs');
function loader(source) {
    console.log('source默认都是utf8字符串', source);
    this.cacheable();
    var callback = this.async();
    let options = loaderUtils.getOptions(this);
    let schema = {
        type: 'object',
        properties: {
            //options.replacement should be boolean
            replacement: {
                "type": "string"
            }
        }
    }
    validateOptions(schema, options);
    console.log('~~~~~~log1~~~~~~');
    let tmplPath = resolve(__dirname, 'template.js');
    this.addDependency(tmplPath);
    fs.readFile(tmplPath, 'utf8', (err, data) => {
        callback(err, data);
    });
    //return template;
    //return source + '//1';
    //return options.replacement;
    //this.callback(null, source);
}
module.exports = loader;
//module.exports.raw = true;//原生的