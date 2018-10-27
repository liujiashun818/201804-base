/**
 * options 
 *   1. layout模板在哪？
 *   2. placeholder 我要替换模板里的哪些内容
 */
const loaderUtils = require('loader-utils');
const fs = require('fs');
const path = require('path');
function loader(source) {//source= <h1>page1</h1>
    let callback = this.async();
    let options = loaderUtils.getOptions(this);
    let layout = options.layout;//默认的布局模板
    let placeholder = options.placeholder;//默认的占位符
    let regexp = new RegExp('@layout\\((.+?)\\)');
    let result = source.match(regexp);
    if (result) {
        source = source.replace(regexp, '');
        layout = path.resolve(this.context, result[1]);//布局模板路径 ./layout1.html
    }
    render(layout, placeholder, source, callback);
}
function render(layout, placeholder, source, callback) {
    fs.readFile(layout, 'utf8', (err, html) => {
        html = html.replace(placeholder, source);
        callback(err, `module.exports = ${JSON.stringify(html)}`);
    });
}
module.exports = loader;