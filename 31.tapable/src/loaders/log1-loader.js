const { resolve } = require('path');
//source代表此资源的内容字符串
//let a = 1;//3//2
// let a = 1;//3//2//1
let loaderUtils = require('loader-utils');
let validateOptions = require('schema-utils');
let fs = require('fs');
function loader(source) {
    console.log('loader1');
    return source;
}
loader.pitch = function (request) {
    console.log('p1-pitch');
}
module.exports = loader;
//module.exports.raw = true;//原生的