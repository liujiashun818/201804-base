/**
 * options 
 *   1. layout模板在哪？
 *   2. placeholder 我要替换模板里的哪些内容
 */
const loaderUtils = require('loader-utils');
const fs = require('fs');
function loader(source) {//source= <h1>page1</h1>
    let callback = this.async();
    let { layout, placeholder } = loaderUtils.getOptions(this);
    fs.readFile(layout, 'utf8', (err, html) => {
        html = html.replace(placeholder, source);
        console.log('html', html);
        callback(err, `module.exports = ${JSON.stringify(html)}`);
    });
}
module.exports = loader;